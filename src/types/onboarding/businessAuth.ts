/** 사업자 등록증 업로드 요청 */
export interface BusinessAuthRequest {
  /** 사업자 등록증 이미지 URL */
  inc_AuthN_file: string;
}

/** 성공 응답 */
export interface BusinessAuthSuccessResponse {
  /** 처리 결과 메시지 */
  message: string; // ex) "사업자 등록증 등록이 완료되었습니다."
}

/** 에러 응답 */
export interface BusinessAuthErrorResponse {
  /** 에러 메시지 */
  message: string; // ex) "기업 회원이 아닙니다.", "서버에 문제가 발생했습니다."
}
