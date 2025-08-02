import { useState, useEffect, useRef } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import FeedCard from "../../components/feed/FeedCard";
import FixedHeader from "../../components/feed/FixedHeader";
import BottomNavContainer from "../../components/layouts/BottomNavContainer";
import FeedCardSkeleton from "../../components/skeletons/feed/FeedCardSkeleton";
import {
  getFeedsWithCursor,
  addFeedLike,
  removeFeedLike,
  getFeedComments,
  createComment,
  deleteComment,
} from "../../apis/feed";
import { FeedResponse } from "../../types/feed/feed";
import CommentModal from "../../components/feed/CommentModal";
import { motion, AnimatePresence } from "framer-motion";
import getTimeAgo from "../../utils/timeAgo";
import { useAuth } from "../../contexts/AuthContext";

export default function FeedPage() {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth(); // 현재 사용자 정보
  const navigate = useNavigate();

  // 좋아요 추가 mutation
  const addLikeMutation = useMutation({
    mutationFn: addFeedLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
    },
    onError: (error) => {
      console.error("좋아요 추가 실패:", error);
    },
  });

  // 좋아요 취소 mutation
  const removeLikeMutation = useMutation({
    mutationFn: removeFeedLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
    },
    onError: (error) => {
      console.error("좋아요 취소 실패:", error);
    },
  });

  // 좋아요 토글 핸들러
  const handleLikeToggle = (feedId: number, isLiked: boolean) => {
    if (isLiked) {
      removeLikeMutation.mutate(feedId);
    } else {
      addLikeMutation.mutate(feedId);
    }
  };

  // 댓글 작성 mutation
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
      // 댓글 작성 성공 시 댓글 목록과 피드 목록 모두 새로고침
      queryClient.invalidateQueries({ queryKey: ["comments", activePostId] });
      queryClient.invalidateQueries({ queryKey: ["feeds"] }); // 댓글 개수 업데이트
    },
    onError: (error) => {
      console.error("댓글 작성 실패:", error);
    },
  });

  // 대댓글 작성 mutation
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
      // 대댓글 작성 성공 시 댓글 목록과 피드 목록 모두 새로고침
      queryClient.invalidateQueries({ queryKey: ["comments", activePostId] });
      queryClient.invalidateQueries({ queryKey: ["feeds"] }); // 댓글 개수 업데이트
    },
    onError: (error) => {
      console.error("대댓글 작성 실패:", error);
    },
  });

  // 댓글 작성 핸들러
  const handleCommentCreate = (commentText: string) => {
    if (activePostId && commentText.trim()) {
      createCommentMutation.mutate({
        feedId: Number(activePostId),
        commentText: commentText.trim(),
      });
    }
  };

  // 대댓글 작성 핸들러
  const handleReplyCreate = (commentText: string, parentCommentId: number) => {
    if (activePostId && commentText.trim()) {
      createReplyMutation.mutate({
        feedId: Number(activePostId),
        commentText: commentText.trim(),
        parentCommentId,
      });
    }
  };

  // 댓글 삭제 mutation
  const deleteCommentMutation = useMutation({
    mutationFn: ({ commentId }: { commentId: number }) =>
      deleteComment(Number(activePostId), commentId),
    onSuccess: () => {
      // 댓글 삭제 성공 시 댓글 목록과 피드 목록 모두 새로고침
      queryClient.invalidateQueries({ queryKey: ["comments", activePostId] });
      queryClient.invalidateQueries({ queryKey: ["feeds"] }); // 댓글 개수 업데이트
    },
    onError: (error) => {
      console.error("댓글 삭제 실패:", error);
    },
  });

  // 댓글 삭제 핸들러
  const handleCommentDelete = (commentId: number) => {
    deleteCommentMutation.mutate({ commentId });
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["feeds"],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      getFeedsWithCursor(pageParam),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage: FeedResponse) =>
      lastPage.result.pagination.has_next
        ? lastPage.result.pagination.next_cursor
        : undefined,
  });

  const allFeeds =
    data?.pages.flatMap((page: FeedResponse) => page.result.feeds) || [];

  // 무한스크롤 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log("🔄 무한스크롤: 다음 페이지 로드");
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "100px", // 하단 100px 전에 미리 로드
        threshold: 0.1,
      }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 활성화된 댓글 모달의 댓글 데이터
  const { data: commentsData } = useQuery({
    queryKey: ["comments", activePostId],
    queryFn: () => getFeedComments({ feedId: Number(activePostId) }),
    enabled: !!activePostId, // activePostId가 있을 때만 실행
  });

  return (
    <BottomNavContainer showBottomNav={!activePostId}>
      <FixedHeader />
      <div className="pt-[66px] pb-[89px] px-[10px] bg-ct-white min-h-screen flex flex-col gap-6">
        {isLoading
          ? Array(5)
              .fill(0)
              .map((_, idx) => <FeedCardSkeleton key={idx} />)
          : allFeeds.map((feed) => (
              <FeedCard
                key={feed.feed_id}
                user={{
                  name: feed.user?.name || "알 수 없음",
                  job: feed.user?.sector || "알 수 없음",
                  profileImage: feed.user?.profile_img || "",
                  serviceId: feed.user?.id,
                }}
                post={{
                  images: feed.images || [],
                  timeAgo: getTimeAgo(feed.created_at),
                  likes: feed.heart || 0,
                  comments: feed.comment_count || 0,
                  content: feed.feed_text || "",
                  tags: Array.isArray(feed.hashtags)
                    ? feed.hashtags.map((tag: string) => tag.replace("#", ""))
                    : [],
                  isLiked: feed.is_liked || false,
                }}
                onCommentClick={() => setActivePostId(feed.feed_id.toString())}
                onLikeClick={() =>
                  handleLikeToggle(feed.feed_id, feed.is_liked)
                }
                onProfileClick={() => {
                  console.log("프로필 클릭됨:", feed.user);
                  if (feed.user?.id) {
                    console.log(
                      "프로필 페이지로 이동:",
                      `/feed/profile/${feed.user.id}`
                    );
                    navigate(`/feed/profile/${feed.user.id}`);
                  }
                }}
              />
            ))}

        {/* 무한스크롤 트리거 */}
        <div
          ref={loadMoreRef}
          className="h-10 flex items-center justify-center"
        >
          {isFetchingNextPage && (
            <div className="text-ct-gray-300 text-body2">
              더 많은 피드를 불러오는 중...
            </div>
          )}
        </div>

        {error && (
          <div className="text-center py-4 text-red-500">
            피드를 불러오는데 실패했습니다.
          </div>
        )}
      </div>

      <AnimatePresence>
        {activePostId && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePostId(null)}
            />
            <CommentModal
              postId={activePostId}
              comments={commentsData?.result?.feeds || []}
              onClose={() => setActivePostId(null)}
              onCommentCreate={handleCommentCreate}
              onReplyCreate={handleReplyCreate}
              onCommentDelete={handleCommentDelete}
              currentUserId={user?.id}
            />
          </>
        )}
      </AnimatePresence>
    </BottomNavContainer>
  );
}
