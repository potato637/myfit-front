import apiInstance from "../apiClient";

export interface RegisterRecruitRequest {
  title: string;
  high_sector: string[];
  low_sector: string[];
  area: string;
  require: string;
  salary: string;
  work_type: string;
  dead_line: string;
  recruiting_img: string;
}
export interface RegisterRecruitResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    recruiting_id: number;
    title: string;
    service_id: number;
  };
}
export interface RecruitmentItem {
  recruitment_id: number;
  title: string;
  require: string;
  low_sector: string[];
  work_type: string;
  dead_line: string;
  writer: {
    id: number;
    name: string;
    profile_img: string;
  };
}

export interface RecruitmentResponse {
  result: {
    recruitments: RecruitmentItem[];
    pagination: {
      total_page: number;
    };
  };
}
export interface UserInfo {
  id: number;
  name: string;
  profile_img: string;
}
export interface recruitmentDetailResponse {
  result: {
    recruitment: {
      recruitment_id: number;
      title: string;
      low_sector: string[];
      is_subscribed: boolean;
      area: string;
      require: string;
      salary: string;
      work_type: string;
      dead_line: string;
      recruiting_img: string;
      writer: UserInfo;
    };
  };
}
export interface SubscribedRecruitment {
  recruitment_id: number;
  title: string;
  low_sector: string[];
  work_type: string;
  dead_line: string;
  writer: UserInfo;
}
export interface SubscribeRecruitmentResponse {
  result: {
    subscribedRecruitments: SubscribedRecruitment[];
    pagination: {
      total_page: number;
    };
  };
}
export interface SubScribedResponse {
  message: string;
  result: {
    is_subscribed: boolean;
  };
}

export interface CreateChattingRoomResponse {
  result: { chatting_room_id: number; is_new: boolean };
}

export const RegisterRecruitPost = async (
  data: RegisterRecruitRequest
): Promise<RegisterRecruitResponse> => {
  const response = await apiInstance.post("/api/recruitments", data);
  return response.data;
};

export const getRecruitments = async (
  highSector: string,
  lowSector?: string,
  page?: number
): Promise<RecruitmentResponse> => {
  const params = {
    highSector,
    ...(lowSector !== undefined ? { lowSector } : {}),
    ...(page !== undefined ? { page } : {}),
  };
  const response = await apiInstance.get<RecruitmentResponse>(
    "/api/recruitments",
    { params }
  );
  return response.data;
};

export const getRecruitmentDetail = async (
  recruitment_id: string
): Promise<recruitmentDetailResponse> => {
  const response = await apiInstance.get(`/api/recruitments/${recruitment_id}`);
  return response.data;
};

export const subscribeRecruitment = async (
  recruitment_id: string
): Promise<SubScribedResponse> => {
  const response = await apiInstance.post(
    `/api/recruitments/${recruitment_id}/subscribe`
  );
  return response.data;
};

export const unsubscribeRecruitment = async (
  recruitment_id: string
): Promise<SubScribedResponse> => {
  const response = await apiInstance.delete(
    `/api/recruitments/${recruitment_id}/subscribe`
  );
  return response.data;
};
export const getSubscribedRecruitment = async (
  total_page: number
): Promise<SubscribeRecruitmentResponse> => {
  const response = await apiInstance.get("/api/recruitments/subscribe", {
    params: { total_page },
  });
  return response.data;
};

export const createChattingRoom = async (
  service_id: number
): Promise<CreateChattingRoomResponse> => {
  const response = await apiInstance.post(
    "/api/chatting-rooms/check-or-create",
    {
      service_id,
    }
  );
  return response.data;
};
