import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addFeedLike,
  removeFeedLike,
  createComment,
  deleteComment,
} from "../../apis/feed";
import { toast } from "react-toastify";

interface UseFeedMutationsProps {
  activePostId?: string | null;
  invalidateQueryKey?: string | string[];
}

export const useFeedMutations = ({
  activePostId,
}: UseFeedMutationsProps = {}) => {
  const queryClient = useQueryClient();

  const addLikeMutation = useMutation({
    mutationFn: addFeedLike,
    onMutate: async (feedId) => {
      // 낙관적 업데이트를 위해 관련 쿼리들 취소
      await queryClient.cancelQueries({ queryKey: ["feeds"] });
      await queryClient.cancelQueries({ queryKey: ["searchFeedsByKeyword"] });
      await queryClient.cancelQueries({ queryKey: ["searchFeedsByHashtag"] });
      
      // 이전 데이터들 저장
      const previousFeeds = queryClient.getQueryData(["feeds"]);
      const previousSearchKeyword = queryClient.getQueriesData({ queryKey: ["searchFeedsByKeyword"] });
      const previousSearchHashtag = queryClient.getQueriesData({ queryKey: ["searchFeedsByHashtag"] });
      
      // 낙관적 업데이트 적용 함수
      const updateFeedData = (data: any) => {
        if (!data?.pages) return data;
        return {
          ...data,
          pages: data.pages.map((page: any) => ({
            ...page,
            result: {
              ...page.result,
              feeds: page.result.feeds.map((feed: any) => 
                feed.feed_id === feedId 
                  ? { ...feed, is_liked: true, heart: feed.heart + 1 }
                  : feed
              )
            }
          }))
        };
      };
      
      // 각 쿼리에 낙관적 업데이트 적용
      queryClient.setQueryData(["feeds"], updateFeedData);
      
      // 프로필별 피드 쿼리들도 업데이트 (DetailFeedItem용)
      const feedQueries = queryClient.getQueriesData({ queryKey: ["feeds"] });
      feedQueries.forEach(([queryKey, data]) => {
        if (Array.isArray(queryKey) && queryKey[0] === "feeds" && queryKey.length > 1) {
          queryClient.setQueryData(queryKey, updateFeedData(data));
        }
      });
      
      // 검색 쿼리들에도 적용
      previousSearchKeyword.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, updateFeedData(data));
      });
      
      previousSearchHashtag.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, updateFeedData(data));
      });
      
      return { previousFeeds, previousSearchKeyword, previousSearchHashtag };
    },
    onError: (_error, _variables, context) => {
      toast.error("좋아요 처리 중 오류가 발생했습니다.");
      
      // 에러 시 이전 데이터로 롤백
      if (context) {
        if (context.previousFeeds) {
          queryClient.setQueryData(["feeds"], context.previousFeeds);
        }
        context.previousSearchKeyword.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
        context.previousSearchHashtag.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: () => {
      // 성공/실패와 관계없이 최종적으로 서버 데이터와 동기화
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      queryClient.invalidateQueries({ queryKey: ["searchFeedsByKeyword"] });
      queryClient.invalidateQueries({ queryKey: ["searchFeedsByHashtag"] });
      queryClient.invalidateQueries({ queryKey: ["analyzeHashtags"] });
    },
  });

  const removeLikeMutation = useMutation({
    mutationFn: removeFeedLike,
    onMutate: async (feedId) => {
      // 낙관적 업데이트를 위해 관련 쿼리들 취소
      await queryClient.cancelQueries({ queryKey: ["feeds"] });
      await queryClient.cancelQueries({ queryKey: ["searchFeedsByKeyword"] });
      await queryClient.cancelQueries({ queryKey: ["searchFeedsByHashtag"] });
      
      // 이전 데이터들 저장
      const previousFeeds = queryClient.getQueryData(["feeds"]);
      const previousSearchKeyword = queryClient.getQueriesData({ queryKey: ["searchFeedsByKeyword"] });
      const previousSearchHashtag = queryClient.getQueriesData({ queryKey: ["searchFeedsByHashtag"] });
      
      // 낙관적 업데이트 적용 함수
      const updateFeedData = (data: any) => {
        if (!data?.pages) return data;
        return {
          ...data,
          pages: data.pages.map((page: any) => ({
            ...page,
            result: {
              ...page.result,
              feeds: page.result.feeds.map((feed: any) => 
                feed.feed_id === feedId 
                  ? { ...feed, is_liked: false, heart: Math.max(0, feed.heart - 1) }
                  : feed
              )
            }
          }))
        };
      };
      
      // 각 쿼리에 낙관적 업데이트 적용
      queryClient.setQueryData(["feeds"], updateFeedData);
      
      // 프로필별 피드 쿼리들도 업데이트 (DetailFeedItem용)
      const feedQueries = queryClient.getQueriesData({ queryKey: ["feeds"] });
      feedQueries.forEach(([queryKey, data]) => {
        if (Array.isArray(queryKey) && queryKey[0] === "feeds" && queryKey.length > 1) {
          queryClient.setQueryData(queryKey, updateFeedData(data));
        }
      });
      
      // 검색 쿼리들에도 적용
      previousSearchKeyword.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, updateFeedData(data));
      });
      
      previousSearchHashtag.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, updateFeedData(data));
      });
      
      return { previousFeeds, previousSearchKeyword, previousSearchHashtag };
    },
    onError: (_error, _variables, context) => {
      toast.error("좋아요 처리 중 오류가 발생했습니다.");
      
      // 에러 시 이전 데이터로 롤백
      if (context) {
        if (context.previousFeeds) {
          queryClient.setQueryData(["feeds"], context.previousFeeds);
        }
        context.previousSearchKeyword.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
        context.previousSearchHashtag.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: () => {
      // 성공/실패와 관계없이 최종적으로 서버 데이터와 동기화
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      queryClient.invalidateQueries({ queryKey: ["searchFeedsByKeyword"] });
      queryClient.invalidateQueries({ queryKey: ["searchFeedsByHashtag"] });
      queryClient.invalidateQueries({ queryKey: ["analyzeHashtags"] });
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
      toast.error("댓글 작성에 실패했습니다.");
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
      toast.error("답글 작성에 실패했습니다.");
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
    onError: () => {
      toast.error("댓글 삭제에 실패했습니다.");
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
    if (activePostId && commentText.trim() && !createCommentMutation.isPending) {
      createCommentMutation.mutate({
        feedId: Number(activePostId),
        commentText: commentText.trim(),
      });
    }
  };

  const handleReplyCreate = (commentText: string, parentCommentId: number) => {
    if (activePostId && commentText.trim() && !createReplyMutation.isPending) {
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
