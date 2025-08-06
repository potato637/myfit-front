// 검색 결과 유저 타입
export interface SearchUser {
  user_id: number;
  name: string;
  sector: string;
  profile_img: string;
}

// 유저 검색 응답 타입
export interface SearchUsersResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    users: SearchUser[];
    pagination: {
      has_next: boolean;
      next_cursor: number | null;
    };
  };
}

// 유저 검색 요청 파라미터
export interface SearchUsersParams {
  name: string;
  last_profile_id?: number;
}

// 해시태그 검색 결과 피드 타입
export interface HashtagFeed {
  feed_id: number;
  feed_text: string;
  comment_count: number;
  heart: number;
  is_liked: boolean;
  created_at: string;
  hashtags: string[];
  images: string[];
  user: {
    id: number;
    name: string;
    profile_img: string;
    sector: string;
  };
}

// 해시태그 검색 응답 타입
export interface SearchHashtagResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    feeds: HashtagFeed[];
    pagination: {
      has_next: boolean;
      next_cursor: number | null;
    };
  };
}

// 해시태그 검색 요청 파라미터
export interface SearchHashtagParams {
  hashtag: string;
  last_feed_id?: number;
}

// 키워드 검색 결과 피드 타입
export interface KeywordFeed {
  feed_id: number;
  feed_text: string;
  comment_count: number;
  heart: number;
  is_liked: boolean;
  created_at: string;
  hashtags: string[];
  images: string[];
  user: {
    id: number;
    name: string;
    profile_img: string;
    sector: string;
  };
}

// 키워드 검색 응답 타입
export interface SearchKeywordResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    feeds: KeywordFeed[];
    pagination: {
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

// 해시태그 분석 결과 타입
export interface HashtagItem {
  hashtag_id: number;
  hashtag: string;
}

// 해시태그 분석 응답 타입
export interface AnalyzeHashtagResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    hashtags: HashtagItem[];
    pagination: {
      has_next: boolean;
      next_cursor: number | null;
    };
  };
}

// 해시태그 분석 요청 파라미터
export interface AnalyzeHashtagParams {
  keyword: string;
  last_hashtag_id?: number;
}