function BottomNav() {
  return (
    <div className="w-full h-[89px] fixed bottom-0 left-0 right-0 z-50 ct-center bg-ct-white">
      <div className="flex-1 ct-center flex-col gap-1">
        <img
          src="/assets/bottom-nav/feed.svg"
          alt="피드"
          className="w-[22px] h-[22px]"
        />
        <span className="text-body3">피드</span>
      </div>
      <div className="flex-1 ct-center flex-col gap-1">
        <img
          src="/assets/bottom-nav/card.svg"
          alt="카드 검색"
          className="w-[22px] h-[22px]"
        />
        <span className="text-body3">카드 검색</span>
      </div>
      <div className="flex-1 ct-center flex-col gap-1">
        <img
          src="/assets/bottom-nav/chat.svg"
          alt="채팅"
          className="w-[22px] h-[22px]"
        />
        <span className="text-body3">채팅</span>
      </div>
      <div className="flex-1 ct-center flex-col gap-1">
        <img
          src="/assets/bottom-nav/recruiting.svg"
          alt="리크루팅"
          className="w-[22px] h-[22px]"
        />
        <span className="text-body3">리크루팅</span>
      </div>
      <div className="flex-1 ct-center flex-col gap-1">
        <img
          src="/assets/bottom-nav/profile.svg"
          alt="마이페이지"
          className="w-[22px] h-[22px]"
        />
        <span className="text-body3">마이페이지</span>
      </div>
    </div>
  );
}

export default BottomNav;
