import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FeedCard from "../../components/feed/FeedCard";
import FixedHeader from "../../components/feed/FixedHeader";
import BottomNavContainer from "../../components/layouts/BottomNavContainer";
import FeedCardSkeleton from "../../components/skeletons/feed/FeedCardSkeleton";
import CommentModal from "../../components/feed/CommentModal";
import getTimeAgo from "../../utils/timeAgo";
import { useAuth } from "../../contexts/AuthContext";
import { useFeedInfiniteQuery } from "../../hooks/feed/useFeedInfiniteQuery";
import { useFeedMutations } from "../../hooks/feed/useFeedMutations";
import { useFeedComments } from "../../hooks/feed/useFeedComments";
import { useInfiniteScroll } from "../../hooks/common/useInfiniteScroll";
import { FeedResponse } from "../../types/feed/feed";
import useFix100vh from "../../hooks/useFix100vh";

export default function FeedPage() {
  useFix100vh();
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const feedRootRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useFeedInfiniteQuery();

  const {
    handleLikeToggle,
    handleCommentCreate,
    handleReplyCreate,
    handleCommentDelete,
  } = useFeedMutations({ activePostId });

  const {
    data: commentsData,
    fetchNextPage: fetchCommentsNextPage,
    hasNextPage: hasCommentsNextPage,
    isFetchingNextPage: isFetchingCommentsNextPage,
  } = useFeedComments({ activePostId });

  const { loadMoreRef } = useInfiniteScroll({
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const allFeeds = useMemo(
    () => data?.pages.flatMap((page: FeedResponse) => page.result.feeds) || [],
    [data?.pages]
  );

  useEffect(() => {
    if (activePostId) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [activePostId]);

  return (
    <div
      id="feed-scroll-root"
      ref={feedRootRef}
      className="feed-scroll-root"
    >
      <BottomNavContainer showBottomNav={!activePostId}>
        <FixedHeader />
        <div 
          className="px-[10px] bg-ct-white flex flex-col gap-6"
          style={{
            paddingTop: "calc(82px + env(safe-area-inset-top, 0px))",
            paddingBottom: "calc(89px + env(safe-area-inset-bottom, 0px))",
            minHeight: "calc(var(--vh, 1vh) * 100)",
          }}
        >
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
                  if (feed.user?.id) {
                    // 내가 작성한 피드라면 마이페이지로, 다른 사람 피드라면 해당 사용자 프로필로 이동
                    const isMyFeed = feed.user.id === user?.id;
                    const targetPath = isMyFeed
                      ? "/mypage"
                      : `/feed/profile/${feed.user.id}`;
                    navigate(targetPath);
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

        {activePostId && (
          <CommentModal
            postId={activePostId}
            comments={
              commentsData?.pages.flatMap((page) => page.result.feeds) || []
            }
            onClose={() => setActivePostId(null)}
            onCommentCreate={handleCommentCreate}
            onReplyCreate={handleReplyCreate}
            onCommentDelete={handleCommentDelete}
            currentUserId={user?.id}
            postOwnerId={
              allFeeds.find((feed) => feed.feed_id === Number(activePostId))?.user
                ?.id
            }
            fetchNextPage={fetchCommentsNextPage}
            hasNextPage={hasCommentsNextPage}
            isFetchingNextPage={isFetchingCommentsNextPage}
            freezeRootRef={feedRootRef}
          />
        )}
      </BottomNavContainer>
    </div>
  );
}
