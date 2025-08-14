import apiClient from "./apiClient";
import {
  ActivityCardRequest,
  ActivityCardSuccessResponse,
  ActivityCardDetailResponse,
} from "../types/common/activityCard";

interface BaseResponse {
  isSuccess: boolean;
  code: number;
  message: string;
}

export interface GetProfileResponse extends BaseResponse {
  result: {
    service: {
      id: number;
      recruiting_status: string;
      profile_img: string;
      high_sector: string;
      low_sector: string;
      userArea: {
        high_area: string;
        low_area: string;
      };
    };
    user: {
      id: number;
      name: string;
      one_line_profile: string;
      Highest_grade: string | null;
      link: string | null;
      inc_AuthN_file: string | null;
      division: "personal" | "team";
      grade_status: string;
      industry: string | null;
      team_division: string | null;
      birth_date: string;
    };
    interest_count: number;
    network_count: number;
  };
}
export const getProfile = async ({
  service_id,
}: {
  service_id: string;
}): Promise<GetProfileResponse> => {
  try {
    const { data } = await apiClient.get<GetProfileResponse>(
      `/api/mypage/${service_id}/profile_info`
    );
    return data;
  } catch (error) {
    console.error("getProfile error:", error);
    throw error;
  }
};

export interface UpdateProfileImageResponse extends BaseResponse {
  result: {
    user_id: string;
    profile_img: string;
  };
}
export const updateProfileImage = async ({
  profile_img,
}: {
  profile_img: string;
}): Promise<UpdateProfileImageResponse> => {
  try {
    const { data } = await apiClient.patch<UpdateProfileImageResponse>(
      `/api/mypage/profile_pic`,
      { profile_img }
    );
    return data;
  } catch (error) {
    console.error("updateProfileImage error:", error);
    throw error;
  }
};

export interface UpdateProfileStatusResponse extends BaseResponse {
  result: {
    user_id: string;
    service_id: string;
    recruiting_status: string;
  };
}
export const updateProfileStatus = async ({
  service_id,
  recruiting_status,
}: {
  service_id: string;
  recruiting_status: string;
}): Promise<UpdateProfileStatusResponse> => {
  try {
    const { data } = await apiClient.patch<UpdateProfileStatusResponse>(
      `/api/mypage/recruiting_status/update`,
      { recruiting_status, params: { service_id } }
    );
    return data;
  } catch (error) {
    console.error("updateProfileStatus error:", error);
    throw error;
  }
};

// 스웨거와 실제 응답값이 다름
export interface FeedItem {
  feed_id: string;
  user: {
    id: string;
    name: string;
    profile_img: string;
  };
  created_at: string;
  images: string[];
  feed_text: string;
  hashtags: string;
  heart: number;
  is_liked: boolean;
  comment_count: number;
}
export interface GetFeedsResponse extends BaseResponse {
  result: {
    feeds: FeedItem[];
    pagination: {
      has_next: boolean;
      next_cursor: string;
    };
  };
}
export const getFeeds = async ({
  service_id,
  cursor,
}: {
  service_id: string;
  cursor: string;
}): Promise<GetFeedsResponse> => {
  try {
    const { data } = await apiClient.get<GetFeedsResponse>(
      `/api/mypage/${service_id}/feeds`,
      {
        params: {
          limit: "10",
          cursor,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("getFeeds error:", error);
    throw error;
  }
};

export interface CardItem {
  id: string;
  card_img: string;
  one_line_profile: string;
  detailed_profile: string;
  link: string;
  created_at: string;
  updated_at: string;
  keywords: string[];
}
export interface GetCardsResponse extends BaseResponse {
  result: {
    cards: CardItem[];
    pagination: {
      has_next: boolean;
      next_cursor: string;
    };
  };
}
export const getCards = async ({
  service_id,
  cursor,
}: {
  service_id: string;
  cursor: string;
}): Promise<GetCardsResponse> => {
  try {
    const { data } = await apiClient.get<GetCardsResponse>(
      `/api/mypage/${service_id}/cards`,
      {
        params: {
          cursor,
          limit: "10",
        },
      }
    );
    return data;
  } catch (error) {
    console.error("getCards error:", error);
    throw error;
  }
};

export interface DeleteFeedResponse {
  isSuccess: boolean;
  code: number;
  message: {
    message: string;
  };
  result: {
    errorCode: string;
    data: string;
  };
}
export const deleteFeed = async ({
  feed_id,
}: {
  feed_id: string;
}): Promise<DeleteFeedResponse> => {
  try {
    const { data } = await apiClient.delete<DeleteFeedResponse>(
      `/api/feeds/${feed_id}`
    );
    return data;
  } catch (error) {
    console.error("deleteFeed error:", error);
    throw error;
  }
};

export interface PatchProfileProps {
  name: string;
  one_line_profile: string;
  birth_date: string;
  Highest_grade: string;
  grade_status: string;
  high_area: string;
  low_area: string;
  recruiting_status: string;
  low_sector: string;
}
export interface PatchProfileResponse extends BaseResponse {
  result: null;
}
export const patchProfile = async (
  props: PatchProfileProps
): Promise<PatchProfileResponse> => {
  try {
    const { data } = await apiClient.patch<PatchProfileResponse>(
      "/api/settings/profile",
      {
        ...props,
      }
    );
    return data;
  } catch (error) {
    console.error("patchProfile error:", error);
    throw error;
  }
};

export interface DeleteCardResponse extends BaseResponse {
  result: {
    deleted_card_id: number;
  };
}
export const deleteCard = async ({
  card_id,
}: {
  card_id: string;
}): Promise<DeleteCardResponse> => {
  try {
    const { data } = await apiClient.delete<DeleteCardResponse>(
      `/api/cards/${card_id}`
    );
    return data;
  } catch (error) {
    console.error("deleteCard error:", error);
    throw error;
  }
};

export interface DeleteUserResponse extends BaseResponse {
  result: null;
}
export const deleteUser = async (): Promise<DeleteUserResponse> => {
  try {
    const { data } = await apiClient.delete<DeleteUserResponse>(`/api/users`);
    return data;
  } catch (error) {
    console.error("deleteUser error:", error);
    throw error;
  }
};

// 이력/활동 카드 상세 조회
export const getActivityCard = async (cardId: number): Promise<ActivityCardDetailResponse> => {
  try {
    const { data } = await apiClient.get<ActivityCardDetailResponse>(`/api/cards/${cardId}`);
    return data;
  } catch (error) {
    console.error("getActivityCard error:", error);
    throw error;
  }
};

// 이력/활동 카드 수정
export const updateActivityCard = async (
  cardId: number,
  request: ActivityCardRequest
): Promise<ActivityCardSuccessResponse> => {
  try {
    const { data } = await apiClient.patch<ActivityCardSuccessResponse>(`/api/cards/${cardId}`, request);
    return data;
  } catch (error) {
    console.error("updateActivityCard error:", error);
    throw error;
  }
};
