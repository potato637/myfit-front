import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getProfile,
  getFeeds,
  getCards,
  updateProfileImage,
  updateProfileStatus,
  deleteFeed,
  patchProfile,
  PatchProfileProps,
  deleteCard,
  deleteUser,
  getActivityCard,
  updateActivityCard,
} from "../apis/mypageAPI";
import { ActivityCardRequest } from "../types/common/activityCard";

export const useGetProfile = ({ service_id }: { service_id: string }) => {
  return useQuery({
    queryKey: ["profile", service_id],
    queryFn: () => getProfile({ service_id }),
  });
};

export const useGetFeeds = ({ service_id }: { service_id: string }) => {
  return useInfiniteQuery({
    queryKey: ["feeds", service_id],
    queryFn: ({ pageParam = "0" }) =>
      getFeeds({ service_id, cursor: pageParam }),
    staleTime: 1000 * 60,
    initialPageParam: "0",
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.pagination.has_next) return undefined;
      return lastPage.result.pagination.next_cursor;
    },
    enabled: !!service_id,
  });
};

export const useGetCards = ({ service_id }: { service_id: string }) => {
  return useInfiniteQuery({
    queryKey: ["cards", service_id],
    queryFn: ({ pageParam = "0" }) =>
      getCards({ service_id, cursor: pageParam }),
    staleTime: 1000 * 60,
    initialPageParam: "0",
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.pagination.has_next) return undefined;
      return lastPage.result.pagination.next_cursor;
    },
    enabled: !!service_id,
  });
};

export const useUpdateProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ profile_img }: { profile_img: string }) =>
      updateProfileImage({ profile_img }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      console.error("Failed to update profile image:", error);
    },
  });
};

export const useUpdateProfileStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      service_id,
      recruiting_status,
    }: {
      service_id: string;
      recruiting_status: string;
    }) => updateProfileStatus({ service_id, recruiting_status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      console.error("Failed to update profile status:", error);
    },
  });
};

export const useDeleteFeed = ({ service_id }: { service_id: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ feed_id }: { feed_id: string }) => deleteFeed({ feed_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds", service_id] });
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
    },
    onError: (error) => {
      console.error("Failed to delete feed:", error);
    },
  });
};

export const usePatchProfile = ({ service_id }: { service_id: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: PatchProfileProps) => patchProfile(props),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", service_id] });
    },
    onError: (error) => {
      console.error("Failed to update profile status:", error);
    },
  });
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ card_id }: { card_id: string }) => deleteCard({ card_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    onError: (error) => {
      console.error("Failed to delete card:", error);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      console.error("Failed to delete user:", error);
    },
  });
};

// 이력/활동 카드 상세 조회
export const useGetActivityCard = (cardId: number) => {
  return useQuery({
    queryKey: ["activityCard", cardId],
    queryFn: () => getActivityCard(cardId),
    enabled: !!cardId,
    staleTime: 1000 * 60 * 5, // 5분
  });
};

// 이력/활동 카드 수정
export const useUpdateActivityCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cardId, request }: { cardId: number; request: Omit<ActivityCardRequest, 'service_id'> }) =>
      updateActivityCard(cardId, request as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      queryClient.invalidateQueries({ queryKey: ["activityCard"] });
    },
    onError: (error) => {
      console.error("Failed to update activity card:", error);
    },
  });
};
