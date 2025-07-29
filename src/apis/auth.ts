import apiClient from "./apiClient";
import { 
  LoginRequest, 
  LoginResponse 
} from "../types/auth/login";

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