import { useState } from "react";
import BottomCTAButton from "../../components/common/BottomCTAButton";
import TopBarContainer from "../../components/common/TopBarContainer";

function ResetPasssword() {
  const [authCode, setAuthCode] = useState("");
  const TopBarContent = () => {
    return <span className="text-h2 text-ct-black-100">비밀번호 재설정</span>;
  };
  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="px-[25.45px]">
        {/* 이메일 입력 */}
        <fieldset className="w-full mt-[16px]">
          <label
            htmlFor="email"
            className="block mb-[10px] text-sub1 text-ct-black-200"
          >
            이메일
          </label>
          <div className="flex justify-between items-center">
            <input
              id="email"
              name="email"
              type="text"
              placeholder="이메일"
              className="w-[127px] h-[44px] pl-[18px] rounded-[10px] bg-[#F7F7F7] text-sub2 text-ct-gray-200"
            />
            <span className="ml-[7px] w-[18px] h-[24px]">@</span>
            <input
              id="emailDomain"
              name="emailDomain"
              type="text"
              placeholder="도메인 주소 입력"
              className="w-[162px] h-[44px] ml-[12px] pl-[26.5px] rounded-[10px] bg-[#F7F7F7] text-sub2 text-ct-gray-200"
            />
          </div>
        </fieldset>
        {/* 인증번호 입력 */}
        <fieldset className="w-full  mx-auto mt-[40px]">
          <label
            htmlFor="authCode"
            className="block mb-[10px] text-sub1 text-ct-black-200"
          >
            인증번호 입력
          </label>

          <div className="flex flex-col gap-[12px]">
            {/* 인증 발송 */}
            <button
              type="button"
              className="w-full h-[44px] rounded-[10px] bg-ct-gray-100  "
            >
              <span className="text-sub2 text-ct-gray-300">
                이메일 인증 발송
              </span>
            </button>

            {/* 인증번호 입력칸 */}
            <div className="flex justify-between">
              <div className="relative w-[205px] h-[44px]">
                <input
                  id="authCode"
                  name="authCode"
                  type="text"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  className="w-full h-full rounded-[10px] bg-[#F7F7F7] px-3 pr-[36px] text-sub2 text-ct-gray-200"
                  placeholder="인증번호 입력"
                />

                {authCode.trim() === "" ? (
                  <button
                    type="button"
                    className="absolute right-[10px] top-1/2 -translate-y-1/2"
                    aria-label="입력값 지우기"
                  >
                    <img
                      src="/assets/onboarding/delete.svg"
                      alt="지우기 아이콘"
                      className="w-[16px] h-[16px]"
                    />
                  </button>
                ) : (
                  // 체크 아이콘 (입력값 존재 시)
                  <div className="absolute right-[10px] top-1/2 -translate-y-1/2">
                    <img
                      src="/assets/setting/check.svg"
                      alt="확인 아이콘"
                      className="w-[16px] h-[16px]"
                    />
                  </div>
                )}
              </div>{" "}
              <button
                type="button"
                className="w-[109px] h-[44px] bg-[#B4B4B4] rounded-[10px] "
              >
                <span className="text-sub2 text-ct-white">재발송</span>
              </button>
            </div>
          </div>
        </fieldset>
        {/* 비밀번호 입력 */}
        <fieldset className="w-full mx-auto mt-[40px] mb-[127px] flex flex-col gap-[13px]">
          <label htmlFor="password" className="text-sub1 text-ct-black-200">
            새로운 비밀번호
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="새로운 비밀번호"
            className="w-full h-[44px] pl-[18px] bg-[#F7F7F7] rounded-[10px] text-sub2 text-ct-gray-200"
          />
          <input
            type="password"
            placeholder="새로운 비밀번호 확인"
            className="w-full h-[44px] pl-[18px] bg-[#F7F7F7] rounded-[10px] text-sub2 text-ct-gray-200 "
          />
        </fieldset>
        {/* CTA 버튼 */}
        <div className="absolute bottom-[20px] w-[328px]">
          <BottomCTAButton
            text="저장하기"
            onClick={() => {
              // TODO: 폼 유효성 검사 후 다음 단계로 이동
            }}
            disabled={true} // TODO: 실제 유효성 검사 로직 추가
          />
        </div>
      </div>
    </TopBarContainer>
  );
}

export default ResetPasssword;
