function CoffeeChatStorageCard() {
  return (
    <div className="w-[339px] h-[136px] rounded-[7.53px] flex flex-col bg-ct-white border border-[#E2E2E2] pl-[9px] pt-[24px] pb-[20px]">
      <div className="flex gap-[13px] pl-[7px]">
        <img
          src="/assets/chatting/manprofile.svg"
          alt="남성프로필"
          className="w-[49px] h-[49px]"
        />
        <div className="flex flex-col justify-center">
          <span className="text-[15px] font-[400] text-ct-main-blue-200">
            2025.05.21 토 PM 3:30
          </span>
          <span className="flex gap-[4px]">
            <span className="text-[16px] font-[700] text-ct-black-300">
              임호현 / 34
            </span>
            <span className="text-[16px] font-[400] text-ct-black-300">
              백앤드개발자
            </span>
          </span>
        </div>
      </div>
      <div className="mt-[18px] flex">
        <img src="/assets/chatting/placeicon.svg" alt="위치 아이콘" />
        <span className="text-[15px] font-[400] text-ct-gray-300">
          서울 강남구 유니온로 77 스튜디오 1층 마핏카페
        </span>
      </div>
    </div>
  );
}
export default CoffeeChatStorageCard;
