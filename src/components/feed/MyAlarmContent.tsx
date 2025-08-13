import { useNavigate } from "react-router-dom";
import { useInfiniteNotifications } from "../../hooks/useNotifications";
import { Notification } from "../../types/notification";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

function MyAlarmContent() {
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteNotifications();

  // 모든 페이지의 알림들을 하나의 배열로 합치기
  const allNotifications: Notification[] = data?.pages?.flatMap(page => 
    page.isSuccess ? page.result.notifications : []
  ) || [];

  // 알림 클릭 처리
  const handleNotificationClick = (notification: Notification) => {
    switch (notification.type) {
      case "FEED":
        if (notification.feed_id) {
          navigate(`/feed/${notification.feed_id}`);
        }
        break;
      case "COMMENT":
        if (notification.feed_id) {
          navigate(`/feed/${notification.feed_id}`);
        }
        break;
      default:
        console.log("알림 클릭:", notification);
        break;
    }
  };

  // 시간 포맷팅
  const formatNotificationTime = (createdAt: string) => {
    try {
      return formatDistanceToNow(new Date(createdAt), { 
        addSuffix: true, 
        locale: ko 
      });
    } catch {
      return "방금 전";
    }
  };

  // 더 보기 버튼 클릭
  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // 에러 상태
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-66px-89px)]">
        <p className="text-sub2 text-ct-red-100">알림을 불러오는데 실패했습니다.</p>
        <p className="text-body3 text-ct-gray-300 mt-2">
          {error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다."}
        </p>
      </div>
    );
  }

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-66px-89px)]">
        <div className="animate-spin w-8 h-8 border-2 border-ct-main-blue-100 border-t-transparent rounded-full"></div>
        <p className="text-sub2 text-ct-gray-200 mt-4">알림을 불러오는 중...</p>
      </div>
    );
  }

  // 알림이 없는 경우
  if (allNotifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-66px-89px)]">
        <img
          src="/assets/feed/alarm.svg"
          alt="빈 알림 이모지"
          className="mb-4"
        />
        <p className="text-sub2 text-ct-gray-200">새로운 알림이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mt-[10px]">
      <ul className="space-y-[4px]">
        {allNotifications.map((notification) => (
          <li
            key={notification.notification_id}
            onClick={() => handleNotificationClick(notification)}
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
              {formatNotificationTime(notification.created_at)}
            </span>
          </li>
        ))}
      </ul>
      
      {/* 무한 스크롤 로딩 버튼 */}
      {hasNextPage && (
        <div className="flex justify-center py-4">
          <button
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
            className="px-4 py-2 text-sub2 text-ct-main-blue-100 disabled:opacity-50"
          >
            {isFetchingNextPage ? "로딩 중..." : "더 보기"}
          </button>
        </div>
      )}
    </div>
  );
}

export default MyAlarmContent;