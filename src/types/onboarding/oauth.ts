export type OAuthPlatform = "kakao" | "naver" | "google";

export interface OAuthRequest {
  platform: OAuthPlatform;
}

export interface OAuthSuccessResponse {
  redirect_url: string;
}

export interface OAuthErrorResponse {
  error: string;
}

export type OAuthResponse = OAuthSuccessResponse | OAuthErrorResponse;

export interface OAuthCallbackRequest {
  platform: OAuthPlatform;
  code: string;
}

export interface OAuthNewUserResponse {
  email: string;
  division: "personal";
  name: string;
}

export interface OAuthExistingUserResponse {
  message: "로그인 완료";
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export interface OAuthCallbackErrorResponse {
  error: string;
}

export type OAuthCallbackResponse = OAuthNewUserResponse | OAuthExistingUserResponse | OAuthCallbackErrorResponse;
