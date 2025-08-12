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
  /** 성공 여부 */
  isSuccess: boolean;
  /** 상태 코드 */
  code: number;
  /** 처리 결과 메시지 */
  message: string; // ex) "첫 이력/활동 카드 등록 및 로그인 성공"
  /** 응답 결과 데이터 */
  result: {
    /** 카드 ID */
    card_id: number;
    /** 처리 메시지 */
    message: string; // ex) "이력/활동 카드 등록 성공"
    /** 서비스 사용자 ID */
    service_id: number;
  };
}

/** 에러 응답 */
export interface ActivityCardErrorResponse {
  /** 에러 메시지 */
  message: string; // ex) "서버에 문제가 생겼습니다."
}
