import { StringValidation } from "zod/v3";
import apiInstance from "../apiClient";
import socket from "../../libs/socket";
import { Status } from "./coffeechat";

export interface SendChatMessageRequest {
  sender_id: number;
  detail_message: string;
  type: string;
  tempId?: number;
}
export type ChatMessageType = "TEXT" | "COFFEECHAT" | "SYSTEM";
export type divisionType = "personal" | "team";

export interface ChatMessageResponse {
  chatting_room_id: number;
  message_id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  type: ChatMessageType;
  created_at: string;
}

export interface ChatMessage {
  id: number;
  sender_id: number;
  sender_name?: string;
  detail_message: string;
  created_at: string;
  type: ChatMessageType;
  status: Status;
  isTemp?: boolean;
  coffeechat_id?: number;
}

export interface FetchChatMessageResponse {
  result: {
    chatting_room_id: number;
    created_at: string;
    messages: ChatMessage[];
    next_cursor: number;
    has_next: boolean;
  };
}

export interface PartnerProfileResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    service_id: number;
    name: string;
    profile_img: string;
  };
}
export interface chattingRoomInformation {
  chatting_room_id: number;
  partner: {
    service_id: number;
    division: divisionType;
    name: string;
    age: number;
    low_sector: string;
    profile_image: string;
  };
  last_message: {
    message: string;
    created_at: string;
    type: ChatMessageType;
    sender_name: string;
  };
}
export interface ChattingListResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    chatting_rooms: chattingRoomInformation[];
    next_cursor: number;
  };
}

export const sendChatMessage = async (
  chattingRoomId: number | null,
  data: SendChatMessageRequest
): Promise<ChatMessage> => {
  const response = await apiInstance.post(
    `/api/chatting-rooms/${chattingRoomId}/messages`,
    data
  );

  const res = response.data.result; // ✅ 실제 메시지 객체

  return {
    id: res.id,
    sender_name: res.sender_name,
    sender_id: res.sender_id,
    detail_message: res.detail_message,
    created_at: res.created_at,
    type: res.type,
    status: res.status,
  };
};

export const sendSocketMessage = (
  chattingRoomId: number,
  message: Omit<SendChatMessageRequest, "tempId">,
  tempId: number
) => {
  socket.emit("sendMessage", {
    roomId: `chat:${chattingRoomId}`,
    message,
    tempId,
  });
};

export const getChatMessage = async (
  chatting_room_id: number | null,
  cursor?: number
): Promise<FetchChatMessageResponse> => {
  const params = cursor !== undefined ? { cursor } : {};
  const response = await apiInstance.get(
    `/api/chatting-rooms/${chatting_room_id}/messages`,
    { params }
  );
  return response.data;
};

export const getPartnerProfile = async (
  chattingRoomId: number
): Promise<PartnerProfileResponse> => {
  const response = await apiInstance.get(
    `/api/chatting-rooms/${chattingRoomId}/partner`
  );
  return response.data;
};

export const getChattingRooms = async (
  cursor?: number,
  limit?: number
): Promise<ChattingListResponse> => {
  const response = await apiInstance.get("/api/chatting-rooms", {
    params: { cursor, limit },
  });
  return response.data;
};
