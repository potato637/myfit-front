/** 이메일/비밀번호 유효성 확인 요청 */
export interface ValidateCredentialsRequest {
  /** 이메일 */
  email: string;
  /** 비밀번호 */
  password: string;
}

/** 이메일/비밀번호 유효성 확인 응답 */
export interface ValidateCredentialsResponse {
  /** 성공 여부 */
  isSuccess: boolean;
  /** 상태 코드 (200 등) */
  code: number;
  /** 메시지 */
  message: string;
  /** 결과 값 (없을 경우 null) */
  result: null;
}