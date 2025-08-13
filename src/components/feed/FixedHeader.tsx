import { useNavigate } from "react-router-dom";
import { useUnreadNotifications } from "../../hooks/useNotifications";

function FixedHeader() {
  const navigate = useNavigate();
  const { data: unreadData } = useUnreadNotifications();

  return (
    <div className="fixed top-0 left-0 w-full pt-safe bg-white z-40 shadow">
      <div className="w-full h-[66px] bg-white flex items-center justify-between px-[30px]">
        <img
          src="/assets/common/headerLogo.svg"
          alt="MyFit"
          className="w-[68px]"
        />
        <div className="flex gap-[19px]">
          <button onClick={() => navigate("/feed/search")}>
            <img src="/assets/feed/search.svg" alt="검색" />
          </button>
          <button onClick={() => navigate("/feed/post")}>
            <img src="/assets/feed/plus.svg" alt="피드 작성" />
          </button>
          <button 
            onClick={() => navigate("/feed/alarm")}
            className="relative"
          >
            <img src="/assets/feed/emptyalarm.svg" alt="알림" />
            {unreadData?.result?.has_unread && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {unreadData.result.unread_count > 99 ? "99+" : unreadData.result.unread_count}
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FixedHeader;
