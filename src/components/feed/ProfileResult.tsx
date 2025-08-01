import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProfileResultSkeleton from "../skeletons/common/ProfileResultSkeleton";
import { searchUsers } from "../../apis/feed";
import { SearchUser } from "../../types/feed/search";

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

const ProfileResult = ({ keyword }: Props) => {
  const debouncedKeyword = useDebounce(keyword, 300);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 유저 검색 무한 쿼리
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteQuery({
    queryKey: ['searchUsers', debouncedKeyword],
    queryFn: ({ pageParam }: { pageParam?: number }) => 
      searchUsers({ name: debouncedKeyword, last_profile_id: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => 
      lastPage.result.pagination.has_next ? lastPage.result.pagination.next_cursor : undefined,
    enabled: !!debouncedKeyword.trim(), // 검색어가 있을 때만 실행
  });

  const allUsers = data?.pages.flatMap(page => page.result.users) || [];

  // 무한스크롤 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log('🔄 프로필 검색 무한스크롤: 다음 페이지 로드');
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
      <ul className="mt-[6px] flex flex-col gap-[20px]">
        <li className="text-gray-400 text-sm ml-2">검색어를 입력해주세요.</li>
      </ul>
    );
  }

  // 로딩 중
  if (isLoading) {
    return (
      <ul className="mt-[6px] flex flex-col gap-[20px]">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProfileResultSkeleton key={i} />
        ))}
      </ul>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <ul className="mt-[6px] flex flex-col gap-[20px]">
        <li className="text-red-500 text-sm ml-2">검색 중 오류가 발생했습니다.</li>
      </ul>
    );
  }

  return (
    <ul className="mt-[6px] flex flex-col gap-[20px]">
      {allUsers.length > 0 ? (
        <>
          {allUsers.map((user: SearchUser) => (
            <li key={user.user_id} className="ml-2 flex items-center gap-4">
              <img
                src={user.profile_img}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-medium text-base text-black">
                  {user.name}
                </span>
                <span className="text-sm text-gray-500">{user.sector}</span>
              </div>
            </li>
          ))}
          
          {/* 무한스크롤 트리거 */}
          <div ref={loadMoreRef} className="h-4 flex items-center justify-center">
            {isFetchingNextPage && (
              <div className="text-gray-400 text-sm">
                더 많은 사용자를 불러오는 중...
              </div>
            )}
          </div>
        </>
      ) : (
        <li className="text-gray-400 text-sm ml-2">검색 결과가 없습니다.</li>
      )}
    </ul>
  );
};

export default ProfileResult;
