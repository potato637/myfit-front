// 특정 피드 조회 응답 (수정 시 사용)
export interface GetFeedForEditResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    feed: {
      feed_id: number;
      created_at: string;
      feed_text: string;
      hashtags: string[];
      images: string[];
    };
  };
}

// 피드 수정 요청
export interface UpdateFeedRequest {
  images: string[];
  feed_text: string;
  hashtag: string[];
}

// 피드 수정 응답
export interface UpdateFeedResponse {
  message: string;
  feed_id: number;
}

// 피드 수정 에러 응답
export interface FeedEditError {
  message: string;
}