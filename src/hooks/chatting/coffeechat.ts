import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  CoffeeChatListResponse,
  CoffeeChatRequest,
  CoffeeChatResponse,
  GetCoffeeChatDetail,
  GetCoffeeChatList,
  GetCoffeeChatPreview,
  PatchAcceptCoffeeChat,
  PatchRejectCoffeeChat,
  PatchUpdateCoffeeChat,
  PostRequestCoffeeChat,
} from "../../apis/chatting/coffeechat";

export const useRequestCoffeeChatMutation = (chatting_room_id: number) => {
  return useMutation<CoffeeChatResponse, Error, CoffeeChatRequest>({
    mutationKey: ["coffeeChat", chatting_room_id],
    mutationFn: (data) => PostRequestCoffeeChat(chatting_room_id, data),
  });
};

export const useGetCoffeeChatPreviewQuery = (chatting_room_id: number) => {
  return useQuery({
    queryKey: ["coffeeChatPreview", chatting_room_id],
    queryFn: () => GetCoffeeChatPreview(chatting_room_id),
    enabled: !!chatting_room_id,
  });
};

export const useGetCoffeeChatDetailQuery = (
  chatting_room_id: number,
  coffeechat_id: number,
  options?: Partial<UseQueryOptions<any, Error>>
) => {
  return useQuery({
    queryKey: ["coffeeChatDetail", chatting_room_id, coffeechat_id],
    queryFn: () => GetCoffeeChatDetail(chatting_room_id, coffeechat_id),
    ...options,
  });
};

export const useUpdateCoffeeChatMutation = (chattingRoomId: number) => {
  return useMutation<CoffeeChatResponse, Error, CoffeeChatRequest>({
    mutationKey: ["updateCoffeeChat", chattingRoomId],
    mutationFn: (data: CoffeeChatRequest) =>
      PatchUpdateCoffeeChat(chattingRoomId, data),
  });
};

export const useRejectCoffeeChatMutation = (chattingRoomId: number) => {
  return useMutation<CoffeeChatResponse, Error, number>({
    mutationKey: ["rejectCoffeeChat", chattingRoomId],
    mutationFn: (coffeechat_id: number) =>
      PatchRejectCoffeeChat(chattingRoomId, coffeechat_id),
  });
};

export const useAcceptCoffeeChatMutation = (chattingRoomId: number) => {
  return useMutation<CoffeeChatResponse, Error, number>({
    mutationKey: ["acceptCoffeeChat", chattingRoomId],
    mutationFn: (coffeechat_id: number) =>
      PatchAcceptCoffeeChat(chattingRoomId, coffeechat_id),
  });
};

export const useCancelCoffeeChatMutation = (chattingRoomId: number) => {
  return useMutation<CoffeeChatResponse, Error, number>({
    mutationKey: ["cancelCoffeeChat", chattingRoomId],
    mutationFn: (coffeechat_id: number) =>
      PatchAcceptCoffeeChat(chattingRoomId, coffeechat_id),
  });
};

export const useCoffeeChatListInfiniteQuery = () =>
  useInfiniteQuery<CoffeeChatListResponse, Error>({
    queryKey: ["coffeeChatList"],
    queryFn: ({ pageParam = 0 }) => GetCoffeeChatList(pageParam as number, 10),
    getNextPageParam: (lastPage) => {
      const nextCursor = lastPage.result.next_cursor;
      return nextCursor !== null ? nextCursor : undefined;
    },
    initialPageParam: 0,
  });
