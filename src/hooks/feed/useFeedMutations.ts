import { useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  addFeedLike, 
  removeFeedLike, 
  createComment, 
  deleteComment 
} from "../../apis/feed";

interface UseFeedMutationsProps {
  activePostId?: string | null;
  invalidateQueryKey?: string | string[];
}

export const useFeedMutations = ({ 
  activePostId, 
  invalidateQueryKey = ["feeds"] 
}: UseFeedMutationsProps = {}) => {
  const queryClient = useQueryClient();

  const addLikeMutation = useMutation({
    mutationFn: addFeedLike,
    onSuccess: () => {
      // 모든 피드 관련 쿼리를 무효화하여 좋아요 상태 동기화
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      queryClient.invalidateQueries({ queryKey: ["searchFeedsByKeyword"] });
      queryClient.invalidateQueries({ queryKey: ["searchFeedsByHashtag"] });
      queryClient.invalidateQueries({ queryKey: ["analyzeHashtags"] });
    },
    onError: (error) => {
      console.error("좋아요 추가 실패:", error);
    },
  });

  const removeLikeMutation = useMutation({
    mutationFn: removeFeedLike,
    onSuccess: () => {
      // 모든 피드 관련 쿼리를 무효화하여 좋아요 상태 동기화
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      queryClient.invalidateQueries({ queryKey: ["searchFeedsByKeyword"] });
      queryClient.invalidateQueries({ queryKey: ["searchFeedsByHashtag"] });
      queryClient.invalidateQueries({ queryKey: ["analyzeHashtags"] });
    },
    onError: (error) => {
      console.error("좋아요 취소 실패:", error);
    },
  });

  const createCommentMutation = useMutation({
    mutationFn: ({
      feedId,
      commentText,
    }: {
      feedId: number;
      commentText: string;
    }) =>
      createComment(feedId, {
        comment_text: commentText,
        high_comment_id: null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", activePostId] });
      // 댓글 수 업데이트를 위해 모든 피드 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      queryClient.invalidateQueries({ queryKey: ["searchFeedsByKeyword"] });
      queryClient.invalidateQueries({ queryKey: ["searchFeedsByHashtag"] });
      queryClient.invalidateQueries({ queryKey: ["analyzeHashtags"] });
    },
    onError: (error) => {
      console.error("댓글 작성 실패:", error);
    },
  });

  const createReplyMutation = useMutation({
    mutationFn: ({
      feedId,
      commentText,
      parentCommentId,
    }: {
      feedId: number;
      commentText: string;
      parentCommentId: number;
    }) =>
      createComment(feedId, {
        comment_text: commentText,
        high_comment_id: parentCommentId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", activePostId] });
      // 댓글 수 업데이트를 위해 모든 피드 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      queryClient.invalidateQueries({ queryKey: ["searchFeedsByKeyword"] });
      queryClient.invalidateQueries({ queryKey: ["searchFeedsByHashtag"] });
      queryClient.invalidateQueries({ queryKey: ["analyzeHashtags"] });
    },
    onError: (error) => {
      console.error("대댓글 작성 실패:", error);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: ({ commentId }: { commentId: number }) =>
      deleteComment(Number(activePostId), commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", activePostId] });
      // 댓글 수 업데이트를 위해 모든 피드 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      queryClient.invalidateQueries({ queryKey: ["searchFeedsByKeyword"] });
      queryClient.invalidateQueries({ queryKey: ["searchFeedsByHashtag"] });
      queryClient.invalidateQueries({ queryKey: ["analyzeHashtags"] });
    },
    onError: (error) => {
      console.error("댓글 삭제 실패:", error);
    },
  });

  const handleLikeToggle = (feedId: number, isLiked: boolean) => {
    if (isLiked) {
      removeLikeMutation.mutate(feedId);
    } else {
      addLikeMutation.mutate(feedId);
    }
  };

  const handleCommentCreate = (commentText: string) => {
    if (activePostId && commentText.trim()) {
      createCommentMutation.mutate({
        feedId: Number(activePostId),
        commentText: commentText.trim(),
      });
    }
  };

  const handleReplyCreate = (commentText: string, parentCommentId: number) => {
    if (activePostId && commentText.trim()) {
      createReplyMutation.mutate({
        feedId: Number(activePostId),
        commentText: commentText.trim(),
        parentCommentId,
      });
    }
  };

  const handleCommentDelete = (commentId: number) => {
    deleteCommentMutation.mutate({ commentId });
  };

  return {
    addLikeMutation,
    removeLikeMutation,
    createCommentMutation,
    createReplyMutation,
    deleteCommentMutation,
    handleLikeToggle,
    handleCommentCreate,
    handleReplyCreate,
    handleCommentDelete,
  };
};