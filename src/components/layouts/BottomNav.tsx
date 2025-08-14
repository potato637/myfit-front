import { useLocation, useNavigate } from "react-router-dom";

function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-full h-[89px] fixed bottom-0 left-0 right-0 z-50 ct-center bg-ct-white">
      <div
        className="flex-1 ct-center flex-col gap-1"
        onClick={() => navigate("/feed")}
      >
        <img
          src={
            pathname.startsWith("/feed")
              ? "/assets/bottom-nav/feed-selected.svg"
              : "/assets/bottom-nav/feed.svg"
          }
          alt="피드"
          className="w-[22px] h-[22px]"
        />
        <span
          className={`text-body3 ${
            pathname.startsWith("/feed")
              ? "text-ct-main-blue-200"
              : "text-ct-gray-400"
          }`}
        >
          피드
        </span>
      </div>
      <div
        className="flex-1 ct-center flex-col gap-1"
        onClick={() => navigate("/searching")}
      >
        <img
          src={
            pathname.startsWith("/searching")
              ? "/assets/bottom-nav/card-selected.svg"
              : "/assets/bottom-nav/card.svg"
          }
          alt="카드 검색"
          className="w-[22px] h-[22px]"
        />
        <span
          className={`text-body3 ${
            pathname.startsWith("/searching")
              ? "text-ct-main-blue-200"
              : "text-ct-gray-400"
          }`}
        >
          카드 검색
        </span>
      </div>
      <div
        className="flex-1 ct-center flex-col gap-1"
        onClick={() => navigate("/chatting")}
      >
        <img
          src={
            pathname.startsWith("/chatting")
              ? "/assets/bottom-nav/chat-selected.svg"
              : "/assets/bottom-nav/chat.svg"
          }
          alt="채팅"
          className="w-[22px] h-[22px]"
        />
        <span
          className={`text-body3 ${
            pathname.startsWith("/chatting")
              ? "text-ct-main-blue-200"
              : "text-ct-gray-400"
          }`}
        >
          채팅
        </span>
      </div>
      <div
        className="flex-1 ct-center flex-col gap-1"
        onClick={() => navigate("/recruiting")}
      >
        <img
          src={
            pathname.startsWith("/recruiting")
              ? "/assets/bottom-nav/recruiting-selected.svg"
              : "/assets/bottom-nav/recruiting.svg"
          }
          alt="리크루팅"
          className="w-[22px] h-[22px]"
        />
        <span
          className={`text-body3 ${
            pathname.startsWith("/recruiting")
              ? "text-ct-main-blue-200"
              : "text-ct-gray-400"
          }`}
        >
          리크루팅
        </span>
      </div>
      <div
        className="flex-1 ct-center flex-col gap-1"
        onClick={() => navigate("/mypage")}
      >
        <img
          src={
            pathname.startsWith("/mypage")
              ? "/assets/bottom-nav/profile-selected.svg"
              : "/assets/bottom-nav/profile.svg"
          }
          alt="마이페이지"
          className="w-[22px] h-[22px]"
        />
        <span
          className={`text-body3 ${
            pathname.startsWith("/mypage")
              ? "text-ct-main-blue-200"
              : "text-ct-gray-400"
          }`}
        >
          마이페이지
        </span>
      </div>
    </div>
  );
}

export default BottomNav;
