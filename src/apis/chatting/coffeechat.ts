import apiInstance from "../apiClient";
import { divisionType } from "./chatting";

export interface CoffeeChatRequest {
  coffeechat_id?: number;
  title: string;
  scheduled_at: string;
  place: string;
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
export interface UpdateCoffeeChatResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    coffeechat_id: number;
    title: string;
    scheduled_at: string;
    place: string;
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

export interface CoffeeChatListResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    coffeechats: [
      {
        coffeechat_id: number;
        chatting_room_id: number;
        opponent: {
          name: string;
          age: number;
          job: string;
          profile_img: string;
          division: divisionType;
        };
        scheduled_at: string;
        place: string;
      }
    ];
    next_cursor: number;
    has_next: boolean;
  };
}

export interface CoffeeChatStorageResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    chats: [
      {
        coffeechat_id: number;
        chatting_room_id: number;
        opponent: {
          name: string;
          age: number;
          job: string;
          profile_img: string;
        };
        scheduled_at: string;
        place: string;
      }
    ];
    currentPage: number;
    totalpages: number;
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
  coffeechat_id: number
) => {
  const resposne = await apiInstance.patch(
    `/api/chatting-rooms/${chattingRoomId}/coffeechats/accept`,
    { coffeechat_id }
  );
  return resposne.data;
};

export const GetCoffeeChatDetail = async (
  chatting_room_id: number,
  coffeechat_id: number
): Promise<CoffeeChatDetailResponse> => {
  const response = await apiInstance.get(
    `/api/chatting-rooms/${chatting_room_id}/coffeechats/${coffeechat_id}`
  );
  return response.data;
};

export const PatchUpdateCoffeeChat = async (
  chattingRoomId: number,
  body: CoffeeChatRequest
): Promise<CoffeeChatResponse> => {
  const response = await apiInstance.patch(
    `/api/chatting-rooms/${chattingRoomId}/coffeechats/update`,
    body
  );
  return response.data;
};
export const PatchRejectCoffeeChat = async (
  chattingRoomId: number,
  coffeechat_id: number
) => {
  const resposne = await apiInstance.patch(
    `/api/chatting-rooms/${chattingRoomId}/coffeechats/reject`,
    { coffeechat_id }
  );
  return resposne.data;
};
export const PatchCancelCoffeeChat = async (
  chattingRoomId: number,
  coffeechat_id: number
) => {
  const resposne = await apiInstance.patch(
    `/api/chatting-rooms/${chattingRoomId}/coffeechats/cancel`,
    { coffeechat_id }
  );
  return resposne.data;
};
export const GetCoffeeChatList = async (cursor?: number, limit?: number) => {
  const response = await apiInstance.get("/api/chatting-rooms/coffeechats", {
    params: { cursor, limit },
  });
  return response.data;
};

export const GetCoffeeChatStorage = async (
  page?: number
): Promise<CoffeeChatStorageResponse> => {
  const response = await apiInstance.get(
    "/api/chatting-rooms/coffeechats/archive",
    {
      params: { page },
    }
  );
  return response.data;
};
