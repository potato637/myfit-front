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

export interface PatchBusinessProfileResponse extends BaseResponse {
  result: {
    userUpdateResult: {
      id: number;
      name: string;
      one_line_profile: string;
      birth_date: string;
      Highest_grade: string | null;
      link: string;
      email: string;
      platform: string;
      is_email_AuthN: boolean;
      inc_AuthN_file: string;
      password?: string; // Or string if it's always there
      division: string;
      team_division: string;
      industry: string;
      grade_status: string;
      created_at: string;
      updated_at: string;
      is_profile_completed: boolean;
    };
    userAreaResult: {
      id: number;
      created_at: string;
      updated_at: string;
      service_id: number;
      high_area: string;
      low_area: string;
    };
    serviceResult: {
      id: number;
      name: string;
      high_sector: string;
      low_sector: string;
      is_inc_AuthN: boolean;
      recruiting_status: string;
      profile_img: string;
      created_at: string;
      updated_at: string;
    };
  };
}
export type PatchBusinessProfileProps = {
  name: string;
  one_line_profile: string;
  team_division: string;
  industry: string;
  high_area: string;
  low_area: string;
  recruiting_status: string;
  link: string;
};
export const patchBusinessProfile = async (
  props: PatchBusinessProfileProps
): Promise<PatchBusinessProfileResponse> => {
  try {
    const { data } = await apiClient.patch("/api/settings/team-profile", {
      ...props,
    });
    return data;
  } catch (error) {
    console.error("patchBusinessProfile error:", error);
    throw error;
  }
};
