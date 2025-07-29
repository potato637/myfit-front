import { useMutation, useQuery } from "@tanstack/react-query";
import apiInstance from "../apiClient";
import { useChatting } from "../../contexts/ChattingContext";
export interface SendChatMessageRequest {
  detail_message: string;
  type: "TEXT" | "COFFEECHAT" | "SYSTEM";
}
export interface ChatMessageResponse {
  chatting_room_id: number;
  message_id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  type: "TEXT" | "COFFEECHAT" | "SYSTEM";
  created_at: string;
}

export interface ChatMessage {
  id: number;
  sender_id: number;
  detail_message: string;
  created_at: string;
  type: "TEXT" | "COFFEECHAT" | "SYSTEM";
}

export interface FetchChatMessageResponse {
  chatting_room_id: number;
  created_at: string;
  messages: ChatMessage[];
  next_cursor: number;
  has_next: boolean;
}

export const sendChatMessage = async (
  chattingRoomId: number,
  data: SendChatMessageRequest
): Promise<ChatMessage> => {
  const response = await apiInstance.post(
    `/api/chatting-rooms/${chattingRoomId}/messages`,
    data
  );
  const res = response.data;
  return {
    id: res.message_id,
    sender_id: res.sender_id,
    detail_message: res.message,
    created_at: res.created_at,
    type: res.type,
  };
};
export const useSendChatMessageMutation = (chattingRoomId: number) => {
  const { addMessage } = useChatting();

  return useMutation({
    mutationFn: (text: string) =>
      sendChatMessage(chattingRoomId, {
        detail_message: text,
        type: "TEXT",
      }),
    onSuccess: (response) => {
      addMessage(response);
    },
  });
};

export const getChatMessage = async (
  chatting_room_id: number | null,
  cursor?: number
): Promise<FetchChatMessageResponse> => {
  const params = { ...(cursor !== undefined ? { cursor } : {}) };
  const response = await apiInstance.get(
    `/api/chatting-rooms/${chatting_room_id}/messages`,
    { params }
  );
  return response.data;
};

export const useChatMessageQuery = (roomId: number | null, cursor?: number) => {
  return useQuery({
    queryKey: ["chatMessages", roomId, cursor],
    queryFn: () => getChatMessage(roomId, cursor),
    enabled: !!roomId,
  });
};
