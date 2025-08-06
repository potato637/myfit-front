import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import PostResultSkeleton from "../skeletons/feed/PostResultSkeleton";
import { searchFeedsByKeyword } from "../../apis/feed";
import { KeywordFeed } from "../../types/feed/search";

interface Props {
  keyword: string;
}

// 디바운스 훅
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const PostResult = ({ keyword }: Props) => {
  const debouncedKeyword = useDebounce(keyword, 300);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 키워드로 피드 검색 무한 쿼리
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteQuery({
    queryKey: ['searchFeedsByKeyword', debouncedKeyword],
    queryFn: ({ pageParam }: { pageParam?: number }) => 
      searchFeedsByKeyword({ keyword: debouncedKeyword, last_feed_id: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      // pagination 정보가 있으면 사용, 없으면 fallback
      if (lastPage.result.pagination) {
        return lastPage.result.pagination.has_next 
          ? lastPage.result.pagination.next_cursor 
          : undefined;
      }
      // pagination 정보가 없는 경우 fallback (임시)
      const feeds = lastPage.result.feeds;
      return feeds.length > 0 ? feeds[feeds.length - 1].feed_id : undefined;
    },
    enabled: !!debouncedKeyword.trim(), // 검색어가 있을 때만 실행
  });

  const allFeeds = data?.pages.flatMap(page => page.result.feeds) || [];

  // 무한스크롤 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log('🔄 피드 검색 무한스크롤: 다음 페이지 로드');
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
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

  // 검색어가 없을 때
  if (!debouncedKeyword.trim()) {
    return (
      <div className="-mx-[22px] text-center py-8 text-gray-400 text-sm">
        키워드를 입력해주세요.
      </div>
    );
  }

  // 로딩 중
  if (isLoading) {
    return <PostResultSkeleton />;
  }

  // 에러 발생
  if (error) {
    return (
      <div className="-mx-[22px] text-center py-8 text-red-500 text-sm">
        검색 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div className="-mx-[22px]">
      {allFeeds.length > 0 ? (
        <>
          <div className="grid grid-cols-3 gap-2">
            {allFeeds.map((feed: KeywordFeed) => (
              <div 
                key={feed.feed_id} 
                className="aspect-square relative cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => {
                  console.log('피드 검색 결과 클릭:', feed);
                  navigate(`/feed/search-result?keyword=${encodeURIComponent(debouncedKeyword)}&startFeedId=${feed.feed_id}`);
                }}
              >
                {feed.images.length > 0 ? (
                  <img
                    src={feed.images[0]} // 첫 번째 이미지만 표시
                    alt={`피드 ${feed.feed_id}`}
                    className="w-full h-full object-cover rounded-sm"
                  />
                ) : (
                  // 이미지가 없는 경우 기본 배경
                  <div className="w-full h-full bg-gray-100 rounded-sm flex items-center justify-center">
                    <div className="text-gray-400 text-xs">
                      이미지 없음
                    </div>
                  </div>
                )}
                {/* 다중 이미지 표시 */}
                {feed.images.length > 1 && (
                  <div className="absolute top-1 right-1 bg-black/50 text-white text-xs px-1 rounded">
                    +{feed.images.length - 1}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 무한스크롤 트리거 */}
          <div ref={loadMoreRef} className="h-10 flex items-center justify-center mt-4">
            {isFetchingNextPage && (
              <div className="text-gray-400 text-sm">
                더 많은 피드를 불러오는 중...
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-400 text-sm">
          '{debouncedKeyword}'에 대한 검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export default PostResult;
