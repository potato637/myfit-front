import {
  QueryFunctionContext,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useChatting } from "../../contexts/ChattingContext";
import { useAuth } from "../../contexts/AuthContext";
import {
  ChatMessage,
  ChatMessageType,
  ChattingListResponse,
  getChatMessage,
  getChattingRooms,
  getPartnerProfile,
  PartnerProfileResponse,
  sendChatMessage,
  SendChatMessageRequest,
} from "../../apis/chatting/chatting";

export const useSendChatMessageMutation = (chattingRoomId: number | null) => {
  const { addMessage, replaceMessage, removeMessage } = useChatting();
  const { user } = useAuth();

  return useMutation({
    mutationKey: ["sendMessage", chattingRoomId],
    mutationFn: (data: SendChatMessageRequest) =>
      sendChatMessage(chattingRoomId, data),
    onMutate: async (newMessage: any) => {
      if (!user) return;
      const tempId = newMessage.tempId ?? Date.now();
      const optimistic: ChatMessage = {
        id: tempId,
        isTemp: true,
        sender_id: user.id,
        sender_name: user.username ?? user.username,
        detail_message: newMessage.detail_message,
        type: newMessage.type,
        created_at: new Date().toISOString(),
      } as any;
      addMessage(optimistic);
      return { tempId };
    },
    onSuccess: (real: ChatMessage, _vars: any, ctx: any) => {
      if (!ctx) return;
      replaceMessage(ctx.tempId, { ...real, isTemp: false } as any);
    },
    onError: (_e, _v, ctx: any) => {
      if (!ctx) return;
      removeMessage(ctx.tempId);
    },
  });
};

export const useChatMessageInfiniteQuery = (
  chatting_room_id: number | null
) => {
  return useInfiniteQuery({
    queryKey: ["chatMessages", chatting_room_id],
    queryFn: ({
      pageParam,
    }: QueryFunctionContext<(string | number | null)[], number | undefined>) =>
      getChatMessage(chatting_room_id!, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.result.has_next ? lastPage.result.next_cursor : undefined;
    },
    enabled: !!chatting_room_id,
  });
};

export const usePartnerProfileQuery = (chattingRoomId: number) => {
  return useQuery<PartnerProfileResponse>({
    queryKey: ["partnerProfile", chattingRoomId],
    queryFn: () => getPartnerProfile(chattingRoomId),
    enabled: !!chattingRoomId,
  });
};

export const useChattingListInfiniteQuery = () =>
  useInfiniteQuery<ChattingListResponse, Error>({
    queryKey: ["chattingRooms"],
    queryFn: ({ pageParam = 0 }) => getChattingRooms(pageParam as number, 10),
    getNextPageParam: (lastPage) => {
      const nextCursor = lastPage.result.next_cursor;
      return nextCursor !== null ? nextCursor : undefined;
    },
    initialPageParam: 0,
  });
