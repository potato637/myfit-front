import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotifications, getUnreadNotifications, markAllAsRead } from "../apis/notification";
import type { NotificationApiResponse } from "../types/notification";

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(),
  });
};

export const useNotificationsInfinite = () => {
  return useInfiniteQuery({
    queryKey: ["notifications", "infinite"],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      getNotifications(pageParam),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage: NotificationApiResponse) =>
      lastPage.result.has_next ? lastPage.result.next_cursor : undefined,
  });
};

export const useUnreadNotifications = () => {
  return useQuery({
    queryKey: ["notifications", "unread"],
    queryFn: () => getUnreadNotifications(),
  });
};

export const useMarkAllAsReadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => {
      // 알림 목록과 읽지 않은 알림 상태 모두 업데이트
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};