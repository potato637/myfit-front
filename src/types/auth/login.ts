/** 로그인 요청 */
export interface LoginRequest {
  /** 사용자 이메일 */
  email: string;
  /** 사용자 비밀번호 */
  password: string | number;
}

/** 로그인 성공 응답 */
export interface LoginSuccessResponse {
  /** 요청 성공 여부 */
  isSuccess: true;
  /** HTTP 상태 코드 */
  code: 200;
  /** 응답 메시지 */
  message: "로그인 성공";
  /** 사용자 정보 */
  result: {
    /** 서비스 사용자 ID */
    service_id: number;
    /** 사용자 이메일 */
    email: string;
    /** 사용자 이름 */
    name: string;
  };
}

/** 로그인 실패 응답 */
export interface LoginErrorResponse {
  /** 요청 성공 여부 */
  isSuccess: false;
  /** HTTP 상태 코드 */
  code: 401 | 500;
  /** 에러 메시지 */
  message: string;
  /** 결과 (에러 시 null) */
  result: null;
}

/** 로그인 응답 (성공/실패 통합) */
export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

/** 로그인 에러 타입 */
export const LOGIN_ERROR_CODES = {
  /** 이메일/비밀번호 오류 */
  AUTH_FAILED: 401,
  /** 서버 오류 */
  SERVER_ERROR: 500,
} as const;