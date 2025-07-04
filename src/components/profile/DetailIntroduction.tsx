function DetailIntroduction() {
  return (
    <div className="w-full h-[61px] flex items-center px-[17px] gap-[7px] bg-ct-white">
      <img
        src="/assets/profile/profileImage.png"
        alt="프로필 이미지"
        className="w-[45px] h-[45px] rounded-full"
      />
      <span className="text-sub1 text-ct-black-100">장예솔</span>
      <span className="text-sub2 text-ct-blue-gray-100">광고 마케터</span>
    </div>
  );
}

export default DetailIntroduction;
