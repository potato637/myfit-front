function NetworkingBar() {
  return (
    <div className="w-[335px] flex items-center justify-between mt-[20px] gap-2">
      <div className="w-[110px] h-[29px] ct-center">
        <div className="w-full h-full ct-center gap-1 bg-ct-gray-100 rounded-[3px]">
          <img
            src="/assets/profile/networkingIcon.svg"
            alt="네트워킹"
            className="w-[20px] h-[20px]"
          />
          <span className="text-sub1 text-ct-main-blue-200">네트워크</span>
        </div>
      </div>
      <div className="w-[110px] h-[29px] ct-center">
        <div className="w-full h-full ct-center gap-1 bg-ct-gray-100 rounded-[3px]">
          <img
            src="/assets/profile/follow.svg"
            alt="관심"
            className="w-[11px] h-[11px]"
          />
          <span className="text-sub1 text-ct-main-blue-200">관심</span>
        </div>
      </div>
      <div className="w-[110px] h-[29px] ct-center">
        <div className="w-full h-full ct-center gap-1 bg-ct-main-blue-100 rounded-[3px]">
          <img
            src="/assets/profile/chat.svg"
            alt="메세지"
            className="w-[12px] h-[12px]"
          />
          <span className="text-sub1 text-ct-white">메세지</span>
        </div>
      </div>
    </div>
  );
}

export default NetworkingBar;
