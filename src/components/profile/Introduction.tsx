import { useNavigate } from "react-router-dom";

function Introduction() {
  const certificated = true;
  const navigate = useNavigate();

  return (
    <div className="w-[335px]">
      <img
        src="/assets/profile/setting.svg"
        alt="설정"
        className="w-[20px] h-[20px]"
      />
      <div className="w-full flex justify-between items-center mt-4 h-[80px]">
        <img
          src="/assets/profile/profileImage.png"
          alt="프로필 이미지"
          className="w-[70px] h-[70px] rounded-full"
        />
        <div className="w-[160px] h-full flex flex-col justify-between">
          <div className="h-[20px] flex items-center gap-1">
            <span className="text-sub1 text-ct-black-100">장예솔 / 30</span>
            {certificated && (
              <img
                src="/assets/profile/badge.svg"
                alt="인증"
                className="w-[21px] h-[21px]"
              />
            )}
          </div>
          <div className="flex flex-col h-[50px]">
            <span className="text-body1 text-ct-gray-300">수원</span>
            <span className="text-body1 text-ct-sub-blue-300">광고마케터</span>
            <span className="text-body1 text-ct-black-100 whitespace-nowrap">
              광운대학교 4학년 2학기 재학
            </span>
          </div>
        </div>
        <div className="w-[80px] h-full flex flex-col justify-between">
          <div
            className="w-full h-[29px] rounded-[3px] ct-center bg-ct-main-blue-200"
            onClick={() => navigate("/mypage/status")}
          >
            <span className="text-ct-white text-body1">구직중</span>
          </div>
          <div className="w-full h-[40px] flex flex-col justify-between">
            <div className="flex justify-end items-center gap-2 h-[20px]">
              <img
                src="/assets/profile/networkingIcon.svg"
                alt="네트워킹"
                className="w-[20px] h-[20px]"
              />
              <span className="text-ct-gray-300 text-body2">70</span>
            </div>
            <div className="flex items-center gap-2 justify-end h-[16px]">
              <img
                src="/assets/profile/follow.svg"
                alt="팔로우"
                className="w-[11px] h-[11px]"
              />
              <span className="text-ct-gray-300 text-body2">177</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
