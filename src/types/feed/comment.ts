// 댓글 작성자 정보 (실제 API에서는 "service" 필드)
export interface Writer {
  id: number;
  name: string;
  high_sector: string; // job 대신
  profile_img: string; // profile_image_url 대신
}

// 대댓글 (replies 배열 안의 댓글)
export interface Reply {
  id: number;
  content: string; // comment_text 대신
  high_comment_id: number; // 항상 상위 댓글 ID 존재
  created_at: string;
  service: Writer; // writer 대신
}

// 최상위 댓글 (replies 포함)
export interface Comment {
  id: number;
  content: string; // comment_text 대신
  high_comment_id: null; // 최상위 댓글은 항상 null
  created_at: string;
  service: Writer; // writer 대신
  replies: Reply[]; // 대댓글 배열
}

// 댓글 목록 조회 응답 (실제 API 구조에 맞게)
export interface CommentsResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    feeds: Comment[]; // comments 대신 feeds
  };
}

// 댓글 목록 조회 요청 파라미터
export interface GetCommentsParams {
  feedId: number;
  last_comment_id?: number; // 커서 기반 페이지네이션용
  size?: number; // 가져올 댓글 수
}

// 댓글 작성 요청
export interface CreateCommentRequest {
  comment_text: string;
  high_comment_id: number | null; // null이면 일반 댓글, 숫자면 대댓글
}

// 댓글 작성 응답
export interface CreateCommentResponse {
  message: string;
  comment_id: number;
}

// 댓글 삭제 응답
export interface DeleteCommentResponse {
  isSuccess: boolean;
  code: number;
  message: string;
}
