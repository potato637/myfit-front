import BottomCTAButton from "../../components/common/BottomCTAButton";
import TopBar from "../../components/common/TopBar";

function RegisterEmail() {
  return (
    <div className="w-full h-screen bg-white ct-center overflow-hidden">
      <div className="w-[375px] min-h-[812px] rounded-[15px] bg-white pt-[66px] pl-[25.45px] pr-[25.55px]">
        <TopBar>
          <span className="text-h2 font-sans text-ct-black-200 ">
            이메일 회원가입
          </span>
        </TopBar>
        {/* 이메일 입력 */}
        <fieldset className="w-full max-w-[324px] mx-auto mt-[60px]">
          <label
            htmlFor="email"
            className="block mb-[10px] text-sub1 font-sans text-ct-black-200"
          >
            이메일
          </label>
          <div className="flex items-center gap-[6px]">
            <input
              id="email"
              name="email"
              type="text"
              placeholder="이메일"
              className="w-[127px] h-[44px] pl-[18px] rounded-[10px] bg-[#F7F7F7] text-sub2 font-sans text-ct-gray-200"
            />
            <span>@</span>
            <input
              id="emailDomain"
              name="emailDomain"
              type="text"
              placeholder="도메인 주소 입력"
              className="w-[162px] h-[44px] pl-[26.5px] rounded-[10px] bg-[#F7F7F7] text-sub2 font-sans text-ct-gray-200"
            />
          </div>
        </fieldset>
        {/* 인증번호 입력 */}
        <fieldset className="w-full  mx-auto mt-[40px]">
          <label
            htmlFor="authCode"
            className="block mb-[10px] text-sub1 font-sans text-ct-black-200"
          >
            인증번호 입력
          </label>

          <div className="flex flex-col gap-[12px]">
            {/* 인증 발송 */}
            <button
              type="button"
              className="w-full h-[44px] rounded-[10px] bg-ct-gray-100  "
            >
              <span className="text-sub2 text-ct-gray-300 font-sans">
                이메일 인증 발송
              </span>
            </button>

            {/* 인증번호 입력칸 */}
            <div className="flex gap-[10px]">
              <div className="relative w-[205px] h-[44px]">
                <input
                  id="authCode"
                  name="authCode"
                  type="text"
                  className="w-full h-full rounded-[10px] bg-[#F7F7F7] px-3 pr-[36px] text-sub2 font-sans text-ct-gray-200"
                  placeholder="인증번호 입력"
                />
                {/* X 아이콘 */}
                <button
                  type="button"
                  className="absolute right-[10px] top-1/2 -translate-y-1/2"
                  aria-label="입력값 지우기"
                  onClick={() => {
                    // TODO: input값 초기화 로직
                  }}
                >
                  <img
                    src="/public/assets/onboarding/delete.svg"
                    alt="지우기 아이콘"
                    className="w-[16px] h-[16px]"
                  />
                </button>
              </div>{" "}
              <button
                type="button"
                className="w-[109px] h-[44px] bg-ct-gray-100 rounded-[10px] "
              >
                <span className="text-sub2 text-ct-gray-300 font-sans">
                  재발송
                </span>
              </button>
            </div>
          </div>
        </fieldset>
        {/* 비밀번호 입력 */}
        <fieldset className="w-full mx-auto mt-[40px] mb-[127px] flex flex-col gap-[13px]">
          <label
            htmlFor="password"
            className="text-sub1 font-sans text-ct-black-200"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호"
            className="w-full h-[44px] pl-[18px] bg-[#F7F7F7] rounded-[10px] text-sub2 font-sans text-ct-gray-200"
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="w-full h-[44px] pl-[18px] bg-[#F7F7F7] rounded-[10px] text-sub2 font-sans text-ct-gray-200 "
          />
        </fieldset>
        {/* CTA 버튼 */}
        <div className="mb-[42px]">
          <BottomCTAButton
            text="다음 단계로 이동"
            onClick={() => {
              // TODO: 폼 유효성 검사 후 다음 단계로 이동
            }}
            disabled={false} // TODO: 실제 유효성 검사 로직 추가
          />{" "}
        </div>
      </div>
    </div>
  );
}

export default RegisterEmail;
