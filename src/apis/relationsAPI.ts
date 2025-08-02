import apiClient from "./apiClient";

interface CommonResultType {
  errorCode: string;
  data: {
    message: string;
  } | null;
}
interface NetworkType {
  id: string;
  other_service_id: string;
  other_service_name: string;
  other_service_profile_img: string;
}
interface BaseResponse {
  isSuccess: boolean;
  code: number;
  message: string;
}

// interest
// interest
// interest

export interface PostInterestResponse extends BaseResponse {
  result: CommonResultType;
}
export const postInterest = async ({
  service_id,
}: {
  service_id: string;
}): Promise<PostInterestResponse> => {
  try {
    const { data } = await apiClient.post(
      `/api/relationships/${service_id}/interests`
    );
    return data;
  } catch (error) {
    console.error("postInterest error:", error);
    throw error;
  }
};

export interface DeleteInterestResponse extends BaseResponse {
  result: CommonResultType;
}
export const deleteInterest = async ({
  service_id,
}: {
  service_id: string;
}): Promise<DeleteInterestResponse> => {
  try {
    const { data } = await apiClient.delete(
      `/api/relationships/${service_id}/interests`
    );
    return data;
  } catch (error) {
    console.error("deleteInterest error:", error);
    throw error;
  }
};

export interface GetMyInterestResponse extends BaseResponse {
  result: CommonResultType;
}
export const getMyInterest = async ({
  page,
}: {
  page: number;
}): Promise<GetMyInterestResponse> => {
  try {
    const { data } = await apiClient.get(`/api/relationships/interests`, {
      params: {
        page,
        limit: 10,
      },
    });
    return data;
  } catch (error) {
    console.error("getMyInterest error:", error);
    throw error;
  }
};

// 이건 InfiniteQuery 적용 안 하나?
export interface GetPeopleWhoInterestMeResponse extends BaseResponse {
  result: CommonResultType;
}
export const getPeopleWhoInterestMe =
  async (): Promise<GetPeopleWhoInterestMeResponse> => {
    try {
      const { data } = await apiClient.get(
        `/api/relationships/interests/received`
      );
      return data;
    } catch (error) {
      console.error("getPeopleWhoInterestMe error:", error);
      throw error;
    }
  };

export interface GetAmIInterestHimResponse extends BaseResponse {
  result: {
    id_interested: boolean;
  };
}
export const getAmIInterestHim = async ({
  service_id,
}: {
  service_id: string;
}): Promise<GetAmIInterestHimResponse> => {
  try {
    const { data } = await apiClient.get(
      `/api/relationships/interests/status/${service_id}`
    );
    return data;
  } catch (error) {
    console.error("getAmIInterestHim error:", error);
    throw error;
  }
};

export interface GetSentInterestCountResponse extends BaseResponse {
  result: {
    count: number;
  };
}
export const getSentInterestCount = async ({
  service_id,
}: {
  service_id: string;
}): Promise<GetSentInterestCountResponse> => {
  try {
    const { data } = await apiClient.get(
      `/api/relationships/interests/sent/count/${service_id}`
    );
    return data;
  } catch (error) {
    console.error("getSentInterestCount error:", error);
    throw error;
  }
};

export interface GetReceivedInterestCountResponse extends BaseResponse {
  result: {
    count: number;
  };
}
export const getReceivedInterestCount = async ({
  service_id,
}: {
  service_id: string;
}): Promise<GetReceivedInterestCountResponse> => {
  try {
    const { data } = await apiClient.get(
      `/api/relationships/interests/received/count/${service_id}`
    );
    return data;
  } catch (error) {
    console.error("getReceivedInterestCount error:", error);
    throw error;
  }
};

// network
// network
// network

export interface PostNetworkResponse extends BaseResponse {
  result: CommonResultType;
}
export const PostNetwork = async ({
  service_id,
}: {
  service_id: string;
}): Promise<PostNetworkResponse> => {
  try {
    const { data } = await apiClient.post(
      `/api/relationships/networks/request/${service_id}`
    );
    return data;
  } catch (error) {
    console.error("PostNetwork error:", error);
    throw error;
  }
};

export interface PatchAcceptNetworkResponse extends BaseResponse {
  result: CommonResultType;
}
export const patchAcceptNetwork = async ({
  service_id,
}: {
  service_id: string;
}): Promise<PatchAcceptNetworkResponse> => {
  try {
    const { data } = await apiClient.patch(
      `/api/relationships/networks/request/${service_id}/accept`
    );
    return data;
  } catch (error) {
    console.error("patchAcceptNetwork error:", error);
    throw error;
  }
};

export interface PatchRejectNetworkResponse extends BaseResponse {
  result: CommonResultType;
}
export const patchRejectNetwork = async ({
  service_id,
}: {
  service_id: string;
}): Promise<PatchRejectNetworkResponse> => {
  try {
    const { data } = await apiClient.patch(
      `/api/relationships/networks/request/${service_id}/reject`
    );
    return data;
  } catch (error) {
    console.error("patchRejectNetwork error:", error);
    throw error;
  }
};

export interface DeleteNetworkResponse extends BaseResponse {
  result: CommonResultType;
}
export const deleteNetwork = async ({
  network_id,
}: {
  network_id: string;
}): Promise<DeleteNetworkResponse> => {
  try {
    const { data } = await apiClient.delete(
      `/api/relationships/networks/disconnect/${network_id}`
    );
    return data;
  } catch (error) {
    console.error("deleteNetwork error:", error);
    throw error;
  }
};

export interface GetMyNetworkResponse extends BaseResponse {
  result: NetworkType[] | null;
}
export const getMyNetwork = async (): Promise<GetMyNetworkResponse> => {
  try {
    const { data } = await apiClient.get(
      `/api/relationships/networks/connections`
    );
    return data;
  } catch (error) {
    console.error("getMyNetwork error:", error);
    throw error;
  }
};

export interface GetMyNetworkRequestResponse extends BaseResponse {
  result: NetworkType[] | null;
}
export const getMyNetworkRequest =
  async (): Promise<GetMyNetworkRequestResponse> => {
    try {
      const { data } = await apiClient.get(`/api/relationships/networks/sent`);
      return data;
    } catch (error) {
      console.error("getMyNetworkRequest error:", error);
      throw error;
    }
  };

export interface ReceivedNetworkType {
  id: string;
  sender_service_id: string;
  sender_service_name: string;
  sender_service_profile_img: string;
  status: string;
  requested_at: string;
}
export interface GetReceivedNetworkResponse extends BaseResponse {
  result: ReceivedNetworkType[] | null;
}
export const getReceivedNetwork =
  async (): Promise<GetReceivedNetworkResponse> => {
    try {
      const { data } = await apiClient.get(
        `/api/relationships/networks/received`
      );
      return data;
    } catch (error) {
      console.error("getReceivedNetwork error:", error);
      throw error;
    }
  };

export interface GetIsNetworkingResponse extends BaseResponse {
  result: {
    status: string;
  };
}
export const getIsNetworking = async ({
  service_id,
}: {
  service_id: string;
}): Promise<GetIsNetworkingResponse> => {
  try {
    const { data } = await apiClient.get(
      `/api/relationships/networks/status/${service_id}`
    );
    return data;
  } catch (error) {
    console.error("getIsNetworking error:", error);
    throw error;
  }
};

export interface GetSomeoneNetworkCountResponse extends BaseResponse {
  result: {
    count: number;
  };
}
export const getSomeoneNetworkCount = async ({
  service_id,
}: {
  service_id: string;
}): Promise<GetSomeoneNetworkCountResponse> => {
  try {
    const { data } = await apiClient.get(
      `/api/relationships/networks/count/${service_id}`
    );
    return data;
  } catch (error) {
    console.error("getSomeoneNetworkCount error:", error);
    throw error;
  }
};

export interface PostBlockUserResponse extends BaseResponse {
  result: CommonResultType | null;
}
export const postBlockUser = async ({
  service_id,
}: {
  service_id: string;
}): Promise<PostBlockUserResponse> => {
  try {
    const { data } = await apiClient.post(
      `/api/relationships/blocks/${service_id}`
    );
    return data;
  } catch (error) {
    console.error("postBlockUser error:", error);
    throw error;
  }
};

export interface DeleteBlockUserResponse extends BaseResponse {
  result: CommonResultType | null;
}
export const deleteBlockUser = async ({
  service_id,
}: {
  service_id: string;
}): Promise<DeleteBlockUserResponse> => {
  try {
    const { data } = await apiClient.delete(
      `/api/relationships/blocks/${service_id}`
    );
    return data;
  } catch (error) {
    console.error("deleteBlockUser error:", error);
    throw error;
  }
};

interface BlockedUserType {
  id: string;
  blocked_service_id: string;
  blocked_service_name: string;
  blocked_service_profile_img: string;
}
export interface GetBlockedUserResponse extends BaseResponse {
  result: BlockedUserType[] | null;
}
export const getBlockedUser = async (): Promise<GetBlockedUserResponse> => {
  try {
    const { data } = await apiClient.get(`/api/relationships/blocked_users`);
    return data;
  } catch (error) {
    console.error("getBlockedUser error:", error);
    throw error;
  }
};

interface BlockStatusType {
  is_blocked_by_me: boolean;
  is_blocked_by_them: boolean;
}
export interface GetBlockStatusResponse extends BaseResponse {
  result: BlockStatusType;
}
export const getBlockStatus = async ({
  service_id,
}: {
  service_id: string;
}): Promise<GetBlockStatusResponse> => {
  try {
    const { data } = await apiClient.get(
      `/api/relationships/block_status/${service_id}`
    );
    return data;
  } catch (error) {
    console.error("getBlockStatus error:", error);
    throw error;
  }
};
