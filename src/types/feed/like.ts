// 피드 좋아요 성공 응답
export interface LikeFeedResponse {
  message: string; // "하트가 등록되었습니다."
}

// 피드 좋아요 실패 응답 (401)
export interface LikeFeedErrorResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    errorCode: string;
    data: {
      message: string;
    };
  };
}
