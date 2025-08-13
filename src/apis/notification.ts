import apiInstance from "./apiClient";
import { NotificationApiResponse, UnreadNotificationApiResponse } from "../types/notification";

/**
 * 알림 목록 조회 (커서 기반 페이지네이션)
 * @param cursor - 이전에 조회한 마지막 알림의 ID (옵션)
 * @returns 알림 목록과 페이지네이션 정보
 */
export const getNotifications = async (cursor?: number): Promise<NotificationApiResponse> => {
  const params = cursor ? { cursor: cursor.toString() } : {};
  
  console.log("🔍 알림 목록 조회 API 호출:", { cursor, params });
  
  try {
    const response = await apiInstance.get("/notifications", { params });
    console.log("✅ 알림 목록 조회 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ 알림 목록 조회 실패:", error);
    throw error;
  }
};

/**
 * 미확인 알림 개수 조회
 * @returns 미확인 알림 존재 여부와 개수
 */
export const getUnreadNotifications = async (): Promise<UnreadNotificationApiResponse> => {
  console.log("🔍 미확인 알림 개수 조회 API 호출");
  
  try {
    const response = await apiInstance.get("/notifications/unread");
    console.log("✅ 미확인 알림 개수 조회 성공:", response.data);
    console.log("📡 응답 상태:", response.status);
    console.log("📋 응답 헤더:", response.headers);
    return response.data;
  } catch (error: any) {
    console.error("❌ 미확인 알림 개수 조회 실패:", error);
    console.error("📡 에러 상태:", error.response?.status);
    console.error("📋 에러 응답:", error.response?.data);
    console.error("🔐 요청 헤더:", error.config?.headers);
    throw error;
  }
};

/**
 * 모든 읽지 않은 알림을 읽음 처리
 * @returns API 응답
 */
export const markAllUnreadNotificationsAsRead = async () => {
  // TODO: 실제 API 엔드포인트가 제공되면 구현
  // 현재는 명세서에 없으므로 콘솔 로그만 출력
  console.log("모든 읽지 않은 알림을 읽음 처리 중...");
  
  // 예상되는 API 호출:
  // const response = await apiInstance.patch("/notifications/mark-all-read");
  // return response.data;
};