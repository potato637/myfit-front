// 키워드 검색 피드 타입
export interface SearchFeed {
  feed_id: number;
  feed_text: string;
  images: string[];
}

// 키워드 검색 응답 타입
export interface SearchKeywordResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    feeds: SearchFeed[];
    pagination?: {
      has_next: boolean;
      next_cursor: number | null;
    };
  };
}

// 키워드 검색 요청 파라미터
export interface SearchKeywordParams {
  keyword: string;
  last_feed_id?: number;
}