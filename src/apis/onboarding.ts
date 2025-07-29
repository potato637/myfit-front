import apiClient from "./apiClient";
import { 
  SendCodeRequest, 
  SendCodeResponse 
} from "../types/onboarding/sendCode";
import { 
  VerifyCodeRequest, 
  VerifyCodeResponse 
} from "../types/onboarding/verifyCode";
import { 
  SignUpRequest, 
  SignUpResponse 
} from "../types/onboarding/signup";
import {
  CompanyProfileRequest,
  CompanyProfileResponse
} from "../types/onboarding/companyProfile";
import {
  ActivityCardRequest,
  ActivityCardSuccessResponse
} from "../types/common/activityCard";

// 이메일 인증 코드 전송
export const sendVerificationCode = async (request: SendCodeRequest): Promise<SendCodeResponse> => {
  try {
    console.log("🔵 [API] 이메일 인증 발송 요청:", request);
    const response = await apiClient.post<SendCodeResponse>("/api/users/send-auth-code", request);
    console.log("✅ [API] 이메일 인증 발송 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ [API] 이메일 인증 발송 실패:", error);
    throw error;
  }
};

// 인증 코드 검증
export const verifyCode = async (request: VerifyCodeRequest): Promise<VerifyCodeResponse> => {
  try {
    console.log("🔵 [API] 인증코드 검증 요청:", request);
    const response = await apiClient.post<VerifyCodeResponse>("/api/users/verify-code", request);
    console.log("✅ [API] 인증코드 검증 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ [API] 인증코드 검증 실패:", error);
    throw error;
  }
};

// 개인 회원가입 완료
export const signUp = async (request: SignUpRequest): Promise<SignUpResponse> => {
  try {
    console.log("🔵 [API] 개인 회원가입 요청:", request);
    const response = await apiClient.post<SignUpResponse>("/api/users", request);
    console.log("✅ [API] 개인 회원가입 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ [API] 개인 회원가입 실패:", error);
    throw error;
  }
};

// 회사/팀 회원가입 완료
export const companySignUp = async (request: CompanyProfileRequest): Promise<CompanyProfileResponse> => {
  try {
    console.log("🔵 [API] 회사/팀 회원가입 요청:", request);
    const response = await apiClient.post<CompanyProfileResponse>("/api/users", request);
    console.log("✅ [API] 회사/팀 회원가입 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ [API] 회사/팀 회원가입 실패:", error);
    throw error;
  }
};

// 이력/활동 카드 등록
export const createActivityCard = async (request: ActivityCardRequest): Promise<ActivityCardSuccessResponse> => {
  try {
    console.log("🔵 [API] 이력/활동 카드 등록 요청:", request);
    const response = await apiClient.post<ActivityCardSuccessResponse>("/api/cards", request);
    console.log("✅ [API] 이력/활동 카드 등록 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ [API] 이력/활동 카드 등록 실패:", error);
    throw error;
  }
};