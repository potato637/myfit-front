export interface Writer {
  user_id: number;
  name: string;
  job: string;
  profile_image_url: string;
}

export interface Reply {
  id: number;
  comment_text: string;
  high_comment_id: number;
  created_at: string;
  writer: Writer;
}

export interface Comment {
  id: number;
  comment_text: string;
  high_comment_id: number | null;
  created_at: string;
  writer: Writer;
  replies: Reply[];
}
