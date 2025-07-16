function DetailIntroduction() {
  return (
    <>
      <div className="w-full h-[61px] flex items-center px-[17px] gap-[7px] bg-ct-white fixed z-10 left-0 top-[calc(pb-safe+61px)]">
        <img
          src="/assets/profile/profileImage.png"
          alt="프로필 이미지"
          className="w-[45px] h-[45px] rounded-full"
        />
        <span className="text-sub1 text-ct-black-100">장예솔</span>
        <span className="text-sub2 text-ct-blue-gray-100">광고 마케터</span>
      </div>
      <div className="w-full h-[61px]" />
    </>
  );
}

export default DetailIntroduction;
