// 피드 작성 요청
export interface CreateFeedRequest {
  images: string[];
  feed_text: string;
  hashtag: string[];
  service_id: number;
}

// 피드 작성 응답
export interface CreateFeedResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    feed_id: number;
  };
}