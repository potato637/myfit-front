import {
  QueryFunctionContext,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";
import { useChatting } from "../../contexts/ChattingContext";
import { useAuth } from "../../contexts/AuthContext";
import {
  FetchChatMessageResponse,
  getChatMessage,
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
    onMutate: async (newMessage) => {
      if (!user) return;
      const tempId = Date.now();
      const optimisticMessage = {
        id: tempId,
        name: user.username,
        sender_id: user.id,
        detail_message: newMessage.detail_message,
        created_at: new Date().toISOString(),
        type: newMessage.type,
        isTemp: true,
      };
      addMessage(optimisticMessage);

      return { tempId };
    },
    onSuccess: (_ack, _vars, context) => {},
    onError: (_err, _vars, context) => {
      if (context?.tempId) removeMessage(context.tempId);
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
