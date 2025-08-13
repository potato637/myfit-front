export interface NotificationSender {
  service_id: number;
  name: string;
  profile_img: string;
}

export interface Notification {
  notification_id: number;
  receiver_id: number;
  sender_id: number;
  type: "FEED" | "COMMENT" | "LIKE" | "FOLLOW"; // 필요에 따라 추가 가능
  feed_id?: number; // FEED 타입일 때만 존재
  message: string;
  is_read: boolean;
  created_at: string;
  read_at: string | null;
  sender: NotificationSender;
}

export interface NotificationListResponse {
  notifications: Notification[];
  next_cursor: number | null;
  has_next: boolean;
}

export interface NotificationApiResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: NotificationListResponse;
}

export interface UnreadNotificationResponse {
  has_unread: boolean;
  unread_count: number;
}

export interface MarkAllAsReadResponse {
  updated_count: number;
  has_unread: boolean;
}

export interface MarkAllAsReadApiResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: MarkAllAsReadResponse;
}

export interface UnreadNotificationApiResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: UnreadNotificationResponse;
}