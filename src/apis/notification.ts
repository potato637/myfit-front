import apiClient from "./apiClient";
import type { 
  NotificationApiResponse, 
  UnreadNotificationApiResponse,
  MarkAllAsReadApiResponse
} from "../types/notification";

export const getNotifications = async (
  cursor?: number
): Promise<NotificationApiResponse> => {
  const params = cursor ? { cursor } : {};
  const response = await apiClient.get<NotificationApiResponse>("/api/notifications", { params });
  return response.data;
};

export const getUnreadNotifications = async (): Promise<UnreadNotificationApiResponse> => {
  const response = await apiClient.get<UnreadNotificationApiResponse>("/api/notifications/unread");
  return response.data;
};

export const markAllAsRead = async (): Promise<MarkAllAsReadApiResponse> => {
  const response = await apiClient.patch<MarkAllAsReadApiResponse>("/api/notifications/read-all");
  return response.data;
};