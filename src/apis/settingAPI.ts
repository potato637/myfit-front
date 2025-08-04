import apiClient from "./apiClient";

interface BaseResponse {
  isSuccess: boolean;
  code: number;
  message: string;
}

export interface PostLogoutResponse extends BaseResponse {
  result: null;
}
export const postLogout = async (): Promise<PostLogoutResponse> => {
  try {
    const { data } = await apiClient.post("/api/users/logout");
    return data;
  } catch (error) {
    console.error("postLogout error:", error);
    throw error;
  }
};

export interface PatchResetPasswordResponse extends BaseResponse {
  result: null;
}
type ResetPasswordProps = {
  email: string;
  authCode: string;
  newPassword: string;
};
export const patchResetPassword = async (
  props: ResetPasswordProps
): Promise<PatchResetPasswordResponse> => {
  try {
    const { data } = await apiClient.patch("/api/users/password-reset", {
      ...props,
    });
    return data;
  } catch (error) {
    console.error("patchResetPassword error:", error);
    throw error;
  }
};
