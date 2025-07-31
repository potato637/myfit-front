/** 인증번호 검증 요청 */
export interface VerifyCodeRequest {
  /** 이메일 */
  email: string;
  /** 인증 코드 (6자리) */
  authCode: string;
}

/** 인증번호 검증 응답 */
export interface VerifyCodeResponse {
  /** 성공 여부 */
  isSuccess: boolean;
  /** 상태 코드 (200 등) */
  code: number;
  /** 메시지 */
  message: string;
  /** 결과 값 (없을 경우 null) */
  result: unknown | null;
}
