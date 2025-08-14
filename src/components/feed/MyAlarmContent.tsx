import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotifications, useMarkAllAsReadMutation } from "../../hooks/useNotifications";
import type { Notification } from "../../types/notification";
import getTimeAgo from "../../utils/timeAgo";

function MyAlarmContent() {
  const navigate = useNavigate();
  const { data: notificationsData, isLoading } = useNotifications();
  const markAllAsReadMutation = useMarkAllAsReadMutation();

  const notifications = notificationsData?.result?.notifications || [];

  useEffect(() => {
    // 언마운트 시 모든 읽지 않은 알림을 읽음 처리
    return () => {
      const hasUnreadNotifications = notifications.some(notification => !notification.is_read);
      if (hasUnreadNotifications) {
        markAllAsReadMutation.mutate();
      }
    };
  }, [notifications, markAllAsReadMutation]);

  const handleClick = (notification: Notification) => {
    // 클릭 시 해당 타입에 따라 페이지 이동 로직
    switch (notification.type) {
      case "NETWORK":
        // 네트워크 관련 알림 - 해당 유저의 프로필 페이지로 이동
        navigate(`/feed/profile/${notification.sender.service_id}`);
        break;
      case "FEED":
        // 피드 관련 알림 (좋아요, 댓글 등) - 해당 피드로 이동
        if (notification.feed_id) {
          navigate(`/feed?feedId=${notification.feed_id}`);
        }
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-66px-89px)]">
        <p className="text-sub2 text-ct-gray-200">알림을 불러오는 중...</p>
      </div>
    );
  }

  return notifications.length === 0 ? (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-66px-89px)]">
      <img
        src="/assets/feed/alarm.svg"
        alt="빈 알림 이모지"
        className="mb-4"
      />
      <p className="text-sub2 text-ct-gray-200">알림이 없습니다.</p>
    </div>
  ) : (
    <ul className="mt-[10px] space-y-[4px]">
      {notifications.map((notification) => (
        <li
          key={notification.notification_id}
          onClick={() => handleClick(notification)}
          className={`flex items-center px-[22px] py-4 cursor-pointer ${
            !notification.is_read ? "bg-[#F0F7FF]" : "bg-ct-white"
          }`}
        >
          <img
            src={notification.sender.profile_img}
            alt={notification.sender.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 ml-3">
            <p className="text-body2 text-ct-black-200">
              {notification.message}
            </p>
          </div>
          <span className="text-body3 text-ct-gray-300 ml-2">
            {getTimeAgo(notification.created_at)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default MyAlarmContent;