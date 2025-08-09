import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { KeywordFeed, HashtagFeed } from "../../types/feed/search";
import FeedCard from "../../components/feed/FeedCard";
import FeedCardSkeleton from "../../components/skeletons/feed/FeedCardSkeleton";
import CommentModal from "../../components/feed/CommentModal";
import { motion, AnimatePresence } from "framer-motion";
import getTimeAgo from "../../utils/timeAgo";
import { useAuth } from "../../contexts/AuthContext";
import { useFeedSearchQuery } from "../../hooks/feed/useFeedSearchQuery";
import { useFeedHashtagQuery } from "../../hooks/feed/useFeedHashtagQuery";
import { useFeedMutations } from "../../hooks/feed/useFeedMutations";
import { useFeedComments } from "../../hooks/feed/useFeedComments";
import { useInfiniteScroll } from "../../hooks/common/useInfiniteScroll";

const FeedSearchResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activePostId, setActivePostId] = useState<string | null>(null);
  
  const keyword = searchParams.get('keyword') || '';
  const hashtag = searchParams.get('hashtag') || '';
  const startFeedId = searchParams.get('startFeedId');
  const [currentFeedIndex, setCurrentFeedIndex] = useState(0);
  
  // 검색 타입 결정: keyword 또는 hashtag
  const searchType = keyword ? 'keyword' : hashtag ? 'hashtag' : null;
  const searchQuery = keyword || hashtag;

  // 키워드 검색과 해시태그 검색 분리
  const keywordQuery = useFeedSearchQuery({ 
    keyword: searchType === 'keyword' ? keyword : ''
  });
  
  const hashtagQuery = useFeedHashtagQuery({ 
    hashtag: searchType === 'hashtag' ? hashtag : ''
  });
  
  // 현재 사용할 쿼리 결과 선택
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = searchType === 'hashtag' ? hashtagQuery : keywordQuery;

  const {
    handleLikeToggle,
    handleCommentCreate,
    handleReplyCreate,
    handleCommentDelete,
  } = useFeedMutations({ 
    activePostId, 
    invalidateQueryKey: searchType === 'hashtag' 
      ? ["searchFeedsByHashtag", hashtag]
      : ["searchFeedsByKeyword", keyword]
  });

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

  const allFeeds = useMemo(() => 
    data?.pages.flatMap(page => page.result.feeds) || [], 
    [data]
  );

  // 시작할 피드의 인덱스 찾기
  useEffect(() => {
    if (startFeedId && allFeeds.length > 0) {
      const startIndex = allFeeds.findIndex(feed => feed.feed_id === parseInt(startFeedId));
      if (startIndex !== -1) {
        setCurrentFeedIndex(startIndex);
      }
    }
  }, [startFeedId, allFeeds]);

  if (!searchQuery) {
    return (
      <div className="w-full h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            ← 뒤로
          </button>
          <h1 className="text-lg font-medium">검색 결과</h1>
          <div className="w-6" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">검색어가 없습니다.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            ← 뒤로
          </button>
          <h1 className="text-lg font-medium">
            {searchType === 'hashtag' ? `#${hashtag}` : `'${keyword}'`} 검색 결과
          </h1>
          <div className="w-6" />
        </div>
        <div className="pt-4 px-[10px] bg-ct-white min-h-screen flex flex-col gap-6">
          {Array(3).fill(0).map((_, idx) => (
            <FeedCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            ← 뒤로
          </button>
          <h1 className="text-lg font-medium">검색 결과</h1>
          <div className="w-6" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500">검색 중 오류가 발생했습니다.</p>
        </div>
      </div>
    );
  }

  if (allFeeds.length === 0) {
    return (
      <div className="w-full h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            ← 뒤로
          </button>
          <h1 className="text-lg font-medium">
            {searchType === 'hashtag' ? `#${hashtag}` : `'${keyword}'`} 검색 결과
          </h1>
          <div className="w-6" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">
            {searchType === 'hashtag' ? `#${hashtag}` : `'${keyword}'`}에 대한 검색 결과가 없습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          ← 뒤로
        </button>
        <h1 className="text-lg font-medium">
            {searchType === 'hashtag' ? `#${hashtag}` : `'${keyword}'`} 검색 결과
          </h1>
        <div className="w-6" />
      </div>
      
      <div className="pt-4 px-[10px] bg-ct-white min-h-screen flex flex-col gap-6">
        {allFeeds.slice(currentFeedIndex).map((feed: KeywordFeed | HashtagFeed) => (
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
            onLikeClick={() => handleLikeToggle(feed.feed_id, feed.is_liked)}
            onProfileClick={() => {
              if (feed.user?.id) {
                // 내가 작성한 피드라면 마이페이지로, 다른 사람 피드라면 해당 사용자 프로필로 이동
                const isMyFeed = feed.user.id === user?.id;
                const targetPath = isMyFeed ? "/mypage" : `/feed/profile/${feed.user.id}`;
                navigate(targetPath);
              }
            }}
          />
        ))}
        
        {/* 무한스크롤 트리거 */}
        <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
          {isFetchingNextPage && (
            <div className="text-ct-gray-300 text-body2">
              더 많은 피드를 불러오는 중...
            </div>
          )}
        </div>
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
              comments={commentsData?.pages.flatMap(page => page.result.feeds) || []}
              onClose={() => setActivePostId(null)}
              onCommentCreate={handleCommentCreate}
              onReplyCreate={handleReplyCreate}
              onCommentDelete={handleCommentDelete}
              currentUserId={user?.id}
              postOwnerId={allFeeds.find(feed => feed.feed_id === Number(activePostId))?.user?.id}
              fetchNextPage={fetchCommentsNextPage}
              hasNextPage={hasCommentsNextPage}
              isFetchingNextPage={isFetchingCommentsNextPage}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedSearchResult;