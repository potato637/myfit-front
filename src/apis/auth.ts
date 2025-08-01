import apiClient from "./apiClient";
import { 
  LoginRequest, 
  LoginResponse 
} from "../types/auth/login";
import {
  ResetPasswordRequest,
  ResetPasswordResponse
} from "../types/auth/resetPassword";

// 로그인
export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  try {
    console.log("🔵 [API] 로그인 요청:", request);
    const response = await apiClient.post<LoginResponse>("/api/users/login", request);
    console.log("✅ [API] 로그인 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ [API] 로그인 실패:", error);
    throw error;
  }
};

// 토큰 검증 (로그인 상태 확인)
export const checkAuthStatus = async () => {
  try {
    const response = await apiClient.get("/api/users/check");
    return response.data;
  } catch (error) {
    console.error("❌ [API] 토큰 검증 실패:", error);
    throw error;
  }
};

// 비밀번호 재설정
export const resetPassword = async (request: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  try {
    console.log("🔵 [API] 비밀번호 재설정 요청:", { ...request, newPassword: "***" });
    const response = await apiClient.patch<ResetPasswordResponse>("/api/users/password-reset", request);
    console.log("✅ [API] 비밀번호 재설정 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ [API] 비밀번호 재설정 실패:", error);
    throw error;
  }
};