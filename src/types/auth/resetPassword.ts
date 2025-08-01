// 비밀번호 재설정 요청
export interface ResetPasswordRequest {
  email: string;
  authCode: string;
  newPassword: string;
}

// 비밀번호 재설정 응답
export interface ResetPasswordResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: null;
}