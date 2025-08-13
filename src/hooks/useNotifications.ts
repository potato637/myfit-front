import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getNotifications, getUnreadNotifications } from "../apis/notification";

/**
 * 알림 목록 조회 (단일 페이지)
 */
export const useNotifications = (cursor?: number) => {
  return useQuery({
    queryKey: ["notifications", cursor],
    queryFn: () => getNotifications(cursor),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
};

/**
 * 알림 목록 조회 (무한 스크롤)
 */
export const useInfiniteNotifications = () => {
  return useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: ({ pageParam }) => getNotifications(pageParam),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.isSuccess || !lastPage.result.has_next) {
        return undefined;
      }
      return lastPage.result.next_cursor;
    },
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
};

/**
 * 미확인 알림 개수 조회
 */
export const useUnreadNotifications = () => {
  return useQuery({
    queryKey: ["notifications", "unread"],
    queryFn: getUnreadNotifications,
    staleTime: 1000 * 30, // 30초 (자주 업데이트되어야 함)
    gcTime: 1000 * 60 * 5, // 5분
    refetchInterval: 1000 * 60, // 1분마다 자동 리페치
  });
};