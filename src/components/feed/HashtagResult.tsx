import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HashtagResultSkeleton from "../skeletons/feed/HashtagResultSkeleton";
import { useFeedHashtagQuery } from "../../hooks/feed/useFeedHashtagQuery";
import { useHashtagAnalyze } from "../../hooks/useHashtagAnalyze";
import { HashtagFeed, HashtagItem } from "../../types/feed/search";

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

const HashtagResult = ({ keyword }: Props) => {
  const navigate = useNavigate();
  const debouncedKeyword = useDebounce(keyword, 300);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);

  // 1단계: 키워드로 해시태그 분석
  const {
    data: hashtagsData,
    fetchNextPage: fetchNextHashtags,
    hasNextPage: hasNextHashtags,
    isFetchingNextPage: isFetchingNextHashtags,
    isLoading: isLoadingHashtags,
    error: hashtagsError
  } = useHashtagAnalyze({
    keyword: debouncedKeyword,
    enabled: !!debouncedKeyword.trim() && !selectedHashtag
  });

  // 2단계: 선택된 해시태그로 피드 검색
  const {
    data: feedsData,
    fetchNextPage: fetchNextFeeds,
    hasNextPage: hasNextFeeds,
    isFetchingNextPage: isFetchingNextFeeds,
    isLoading: isLoadingFeeds,
    error: feedsError
  } = useFeedHashtagQuery({
    hashtag: selectedHashtag || ''
  });

  const allHashtags = hashtagsData?.pages.flatMap(page => page.result.hashtags) || [];
  const allFeeds = feedsData?.pages.flatMap(page => page.result.feeds) || [];

  // 해시태그 선택 핸들러
  const handleHashtagSelect = (hashtag: string) => {
    setSelectedHashtag(hashtag);
  };

  // 피드 클릭 핸들러 - FeedSearchResult로 이동
  const handleFeedClick = (feed: HashtagFeed) => {
    navigate(`/feed/search-result?hashtag=${selectedHashtag}&startFeedId=${feed.feed_id}`);
  };

  // 뒤로가기 (해시태그 목록으로)
  const handleBackToHashtags = () => {
    setSelectedHashtag(null);
  };

  // 키워드가 변경되면 선택된 해시태그 초기화
  useEffect(() => {
    setSelectedHashtag(null);
  }, [debouncedKeyword]);

  // 무한스크롤 Intersection Observer (해시태그 목록 또는 피드 목록)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          if (selectedHashtag && hasNextFeeds && !isFetchingNextFeeds) {
            console.log('🔄 피드 검색 무한스크롤: 다음 페이지 로드');
            fetchNextFeeds();
          } else if (!selectedHashtag && hasNextHashtags && !isFetchingNextHashtags) {
            console.log('🔄 해시태그 분석 무한스크롤: 다음 페이지 로드');
            fetchNextHashtags();
          }
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
  }, [selectedHashtag, hasNextHashtags, isFetchingNextHashtags, fetchNextHashtags, hasNextFeeds, isFetchingNextFeeds, fetchNextFeeds]);

  // 검색어가 없을 때
  if (!debouncedKeyword.trim()) {
    return (
      <div className="-mx-[22px] text-center py-8 text-gray-400 text-sm">
        해시태그를 입력해주세요.
      </div>
    );
  }

  // 선택된 해시태그가 있을 때 - 피드 검색 결과 표시
  if (selectedHashtag) {
    // 로딩 중
    if (isLoadingFeeds) {
      return <HashtagResultSkeleton />;
    }

    // 에러 발생
    if (feedsError) {
      return (
        <div className="-mx-[22px]">
          <div className="flex items-center gap-2 mb-4 px-[22px]">
            <button 
              onClick={handleBackToHashtags}
              className="text-ct-main-blue text-sm"
            >
              ← 해시태그 목록으로
            </button>
            <span className="text-gray-400 text-sm">#{selectedHashtag}</span>
          </div>
          <div className="text-center py-8 text-red-500 text-sm">
            피드 검색 중 오류가 발생했습니다.
          </div>
        </div>
      );
    }

    return (
      <div className="-mx-[22px]">
        {/* 뒤로가기 버튼 */}
        <div className="flex items-center gap-2 mb-4 px-[22px]">
          <button 
            onClick={handleBackToHashtags}
            className="text-ct-main-blue text-sm"
          >
            ← 해시태그 목록으로
          </button>
          <span className="text-gray-400 text-sm">#{selectedHashtag}</span>
        </div>

        {allFeeds.length > 0 ? (
          <>
            <div className="grid grid-cols-3 gap-2">
              {allFeeds.map((feed: HashtagFeed) => (
                <button
                  key={feed.feed_id}
                  onClick={() => handleFeedClick(feed)}
                  className="aspect-square relative hover:opacity-80 transition-opacity"
                >
                  {feed.images.length > 0 ? (
                    <img
                      src={feed.images[0]}
                      alt={`피드 ${feed.feed_id}`}
                      className="w-full h-full object-cover rounded-sm"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 rounded-sm flex items-center justify-center">
                      <p className="text-xs text-gray-500">이미지 없음</p>
                    </div>
                  )}
                  {feed.images.length > 1 && (
                    <div className="absolute top-1 right-1 bg-black/50 text-white text-xs px-1 rounded">
                      +{feed.images.length - 1}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* 무한스크롤 트리거 */}
            <div ref={loadMoreRef} className="h-10 flex items-center justify-center mt-4">
              {isFetchingNextFeeds && (
                <div className="text-gray-400 text-sm">
                  더 많은 피드를 불러오는 중...
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-400 text-sm">
            '#{selectedHashtag}'에 대한 피드가 없습니다.
          </div>
        )}
      </div>
    );
  }

  // 선택된 해시태그가 없을 때 - 해시태그 목록 표시
  // 로딩 중
  if (isLoadingHashtags) {
    return <HashtagResultSkeleton />;
  }

  // 에러 발생
  if (hashtagsError) {
    return (
      <div className="-mx-[22px] text-center py-8 text-red-500 text-sm">
        해시태그 검색 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div className="-mx-[22px]">
      {allHashtags.length > 0 ? (
        <>
          <ul className="space-y-3 px-[22px]">
            {allHashtags.map((hashtag: HashtagItem) => (
              <li key={hashtag.hashtag_id}>
                <button
                  onClick={() => handleHashtagSelect(hashtag.hashtag)}
                  className="text-ct-main-blue-100 text-body2 hover:underline"
                >
                  #{hashtag.hashtag}
                </button>
              </li>
            ))}
          </ul>

          {/* 무한스크롤 트리거 */}
          <div ref={loadMoreRef} className="h-10 flex items-center justify-center mt-4">
            {isFetchingNextHashtags && (
              <div className="text-gray-400 text-sm">
                더 많은 해시태그를 불러오는 중...
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-400 text-sm">
          '{debouncedKeyword}'와 관련된 해시태그가 없습니다.
        </div>
      )}
    </div>
  );
};

export default HashtagResult;
