import apiClient from "./apiClient";

export interface BaseResponse {
  isSuccess: boolean;
  code: number;
  message: string;
}

export interface GetProfileResponse extends BaseResponse {
  result: {
    id: string;
    name: string;
    one_line_profile: string;
    birth_data: string;
    Highest_grade: string;
    link: string;
    division: string;
    grade_status: string;
    created_at: string;
    updated_at: string;
    is_profile_completed: boolean;
  } | null;
}
export const getProfile = async (): Promise<GetProfileResponse> => {
  try {
    const { data } = await apiClient.get<GetProfileResponse>(
      `mypage/profile_info`
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
  } | null;
}
export const updateProfileImage = async ({
  profile_img,
}: {
  profile_img: string;
}): Promise<UpdateProfileImageResponse> => {
  try {
    const { data } = await apiClient.patch<UpdateProfileImageResponse>(
      `api/mypage/profile_pic`,
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
  } | null;
}
export const updateProfileStatus = async ({
  recruiting_status,
}: {
  recruiting_status: string;
}): Promise<UpdateProfileStatusResponse> => {
  try {
    const { data } = await apiClient.patch<UpdateProfileStatusResponse>(
      `api/mypage/recruiting_status`,
      { recruiting_status }
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
  image: string[];
  feed_text: string;
  hashtags: string;
  heart: number;
  comment_count: number;
}
export interface GetFeedsResponse extends BaseResponse {
  result: {
    feeds: FeedItem[];
    pagination: {
      hasMore: boolean;
      nextCursorId: string;
    };
  };
}
export const getFeeds = async ({
  service_id,
  cursor,
  limit = "10",
}: {
  service_id: string;
  cursor: string;
  limit: string;
}): Promise<GetFeedsResponse> => {
  try {
    const { data } = await apiClient.get<GetFeedsResponse>(
      `api/mypage/${service_id}/feeds`,
      {
        params: {
          cursor,
          limit,
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
  };
}
export const getCards = async ({
  service_id,
  cursor,
  limit = "10",
}: {
  service_id: string;
  cursor: string;
  limit: string;
}): Promise<GetCardsResponse> => {
  try {
    const { data } = await apiClient.get<GetCardsResponse>(
      `api/mypage/${service_id}/cards`,
      {
        params: {
          cursor,
          limit,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("getCards error:", error);
    throw error;
  }
};
