import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CoffeeChatRequest,
  CoffeeChatResponse,
  GetCoffeeChatDetail,
  GetCoffeeChatPreview,
  PatchAcceptCoffeeChat,
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

export const usePatchAcceptCoffeeChatMutation = (chattingRoomId: number) => {
  return useMutation({
    mutationFn: (body: { coffeechat_id: number }) =>
      PatchAcceptCoffeeChat(chattingRoomId, body),
  });
};

export const useGetCoffeeChatDetailQuery = (
  chatting_room_id: number,
  coffeechat_id: number
) => {
  return useQuery({
    queryKey: ["coffeeChatDetail", chatting_room_id, coffeechat_id],
    queryFn: () => GetCoffeeChatDetail(chatting_room_id, coffeechat_id),
    enabled: !!chatting_room_id && !!coffeechat_id,
  });
};
