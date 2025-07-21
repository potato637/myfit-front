export interface FeedItem {
  feed_id: number;
  user: {
    id: number;
    name: string;
    sector: string;
    profile_img: string;
  };
  created_at: string;
  images: string[];
  feed_text: string;
  hashtags: string[];
  heart: number;
  is_liked: boolean;
  comment_count: number;
}
