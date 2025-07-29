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
