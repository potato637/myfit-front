import apiInstance from "../apiClient";

export interface CoffeeChatRequest {
  receiver_id: number;
  title: string;
  scheduled_at: string;
  place: string;
}

export interface AcceptCoffeeChatRequest {
  coffeechat_id: number;
}

export interface CoffeeChatResponse {
  message: string;
  result: {
    chattingRoomId: number;
    coffeechat_id: number;
    sender_id: number;
    receiver_id: number;
    created_at: string;
    name: string;
  };
}

export interface Participants {
  service_id: number;
  name: string;
  profile_img: string;
}

export interface CoffeeChatPreviewResponse {
  result: {
    participants: Participants[];
  };
}

export type Status = "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELED";

export interface CoffeeChatDetailResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    coffeechat_id: number;
    chatting_room_id: number;
    sender: Participants;
    receiver: Participants;
    title: string;
    place: string;
    scheduled_at: string;
    status: Status;
    created_at: string;
  };
}

export const PostRequestCoffeeChat = async (
  chattingRoomId: number,
  data: CoffeeChatRequest
): Promise<CoffeeChatResponse> => {
  const response = await apiInstance.post(
    `/api/chatting-rooms/${chattingRoomId}/coffeechats`,
    data
  );
  return response.data;
};

export const GetCoffeeChatPreview = async (
  chattingRoomId: number
): Promise<CoffeeChatPreviewResponse> => {
  const response = await apiInstance.get(
    `/api/chatting-rooms/${chattingRoomId}/coffeechats/preview`
  );
  return response.data;
};

export const PatchAcceptCoffeeChat = async (
  chattingRoomId: number,
  body: AcceptCoffeeChatRequest
) => {
  const resposne = await apiInstance.patch(
    `/api/${chattingRoomId}/coffeechats/accept`,
    body
  );
  return resposne.data;
};

export const GetCoffeeChatDetail = async (
  chatting_room_id: number,
  coffeechat_id: number
): Promise<CoffeeChatDetailResponse> => {
  const response = await apiInstance.get(
    `api/chatting-rooms/${chatting_room_id}/coffeechats/${coffeechat_id}`
  );
  return response.data;
};
