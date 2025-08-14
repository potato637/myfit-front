/** 사업자 등록증 업로드 요청 */
export interface BusinessAuthRequest {
  /** 사업자 등록증 이미지 URL */
  inc_AuthN_file: string;
}

/** 성공 응답 */
export interface BusinessAuthResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    service_id: number;
    inc_AuthN_file: string;
  };
}

/** 에러 응답 */
export interface BusinessAuthErrorResponse {
  /** 에러 메시지 */
  message: string; // ex) "기업 회원이 아닙니다.", "서버에 문제가 발생했습니다."
}
