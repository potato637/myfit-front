import { useUnreadNotifications } from "../../hooks/useNotifications";

interface NotificationBadgeProps {
  children: React.ReactNode; // 알림 아이콘 등
  className?: string;
}

/**
 * 알림 뱃지 컴포넌트
 * 미확인 알림이 있을 때 빨간 점 또는 개수를 표시
 */
function NotificationBadge({ children, className = "" }: NotificationBadgeProps) {
  console.log("🎯 NotificationBadge 컴포넌트 렌더링됨");
  
  const { data, isLoading, isError } = useUnreadNotifications();
  
  console.log("📊 useUnreadNotifications 상태:", { data, isLoading, isError });

  const hasUnread = data?.isSuccess && data.result.has_unread;
  const unreadCount = data?.isSuccess ? data.result.unread_count : 0;

  return (
    <div className={`relative ${className}`}>
      {children}
      
      {/* 로딩 중이거나 에러일 때는 뱃지 표시 안함 */}
      {!isLoading && !isError && hasUnread && (
        <div className="absolute -top-2 -right-2">
          {unreadCount > 0 ? (
            // 개수 표시 (9보다 클 때는 9+로 표시)
            <div className="bg-ct-red-100 text-ct-white text-[10px] font-bold min-w-[16px] h-4 rounded-full flex items-center justify-center px-1">
              {unreadCount > 9 ? "9+" : unreadCount}
            </div>
          ) : (
            // 단순 빨간 점
            <div className="bg-ct-red-100 w-2 h-2 rounded-full"></div>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBadge;