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