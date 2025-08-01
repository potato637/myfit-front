import { useNavigate } from "react-router-dom";

function FixedHeader() {
  const navigate = useNavigate(); // ✅ 훅 사용

  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50 shadow ">
      <div className="fixed top-0 left-0 w-full h-[66px] bg-white z-50 flex items-center justify-between px-[30px] shadow">
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
          <button onClick={() => navigate("/feed/alarm")}>
            <img src="/assets/feed/ringbell.svg" alt="알림" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FixedHeader;
