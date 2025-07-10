function FixedHeader() {
  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50 shadow ">
      <div className="fixed top-0 left-0 w-full h-[66px] bg-white z-50 flex items-center justify-between px-[30px] shadow">
        <img
          src="/assets/common/headerLogo.svg"
          alt="MyFit"
          className="w-[68px]"
        />
        <div className="flex gap-[19px]">
          <img src="/public/assets/feed/search.svg" />
          <img src="/public/assets/feed/plus.svg" />
          <img src="/public/assets/feed/ringbell.svg" />
        </div>
      </div>
    </div>
  );
}

export default FixedHeader;
