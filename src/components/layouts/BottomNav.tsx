function BottomNav() {
  return (
    <div className="w-full h-[89px] fixed bottom-0 left-0 right-0 ct-center">
      <div className="flex-1 ct-center flex-col">
        <img src="" alt="피드" className="w-[22px] h-[22px]" />
        <span className="text-body3">피드</span>
      </div>
      <div className="flex-1 ct-center flex-col">
        <img src="" alt="카드 검색" className="w-[22px] h-[22px]" />
        <span className="text-body3">카드 검색</span>
      </div>
      <div className="flex-1 ct-center flex-col">
        <img src="" alt="채팅" className="w-[22px] h-[22px]" />
        <span className="text-body3">채팅</span>
      </div>
      <div className="flex-1 ct-center flex-col">
        <img src="" alt="리크루팅" className="w-[22px] h-[22px]" />
        <span className="text-body3">리크루팅</span>
      </div>
      <div className="flex-1 ct-center flex-col">
        <img src="" alt="마이페이지" className="w-[22px] h-[22px]" />
        <span className="text-body3">마이페이지</span>
      </div>
    </div>
  );
}

export default BottomNav;
