/** 이력/활동 카드 등록 요청 */
export interface ActivityCardRequest {
  /** 서비스 사용자 ID */
  service_id: number;
  /** 카드 이미지 URL */
  card_img: string;
  /** 카드 한 줄 소개 */
  card_one_line_profile: string;
  /** 카드 상세 설명 */
  detailed_profile: string;
  /** 포트폴리오 등 외부 링크 */
  link: string;
  /** 키워드 (최대 3개) */
  keyword_text: string[];
}

/** 성공 응답 */
export interface ActivityCardSuccessResponse {
  /** 처리 결과 메시지 */
  message: string; // ex) "이력/활동 카드 등록이 완료되었습니다."
}

/** 에러 응답 */
export interface ActivityCardErrorResponse {
  /** 에러 메시지 */
  message: string; // ex) "서버에 문제가 생겼습니다."
}
