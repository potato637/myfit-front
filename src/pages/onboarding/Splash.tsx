function Splash() {
  return (
    <div className="w-full h-screen ct-center relative font-sans overflow-hidden">
      <img
        src="/public/assets/onboarding/splash_background.svg"
        alt="Splash Background"
        className="absolute top-0 left-0 w-full h-full object-cover "
      />

      {/* 고정된 사이즈 박스 */}
      <div className="w-[375px] h-[812px] rounded-[15px] overflow-hidden relative z-10">
        <div className="w-full h-full flex flex-col ct-center">
          {/* 로고 */}
          <img
            src="/public/assets/onboarding/myfit_logo.svg"
            alt="MyFit Logo"
            className="w-[136px] h-[62px]  mx-auto"
          />

          {/* 설명 텍스트 */}
          <p className="mt-[24px] font-sans text-center text-ct-white text-sub1 leading-[22px]">
            나를 간편하게 표현하고 <br />
            인재들과 자유롭게 대화해보세요!
          </p>

          {/* 이메일 입력 */}
          <input
            type="email"
            className="mt-[40px] w-full px-4 py-3 rounded-md bg-transparent  border-[0.5px] border-ct-white text-ct-white font-sans text-body1 placeholder-ct-white placeholder:font-sans placeholder:text-body1"
            placeholder="이메일을 입력해주세요"
          />

          {/* 비밀번호 입력 */}
          <input
            type="password"
            className="mt-[16px] w-full px-4 py-3 rounded-md bg-transparent border-[0.5px] border-ct-white text-ct-white font-sans text-body1 placeholder-ct-white placeholder:font-sans placeholder:text-body1"
            placeholder="비밀번호를 입력해주세요"
          />

          {/* 로그인 버튼 */}
          <button className="mt-[23px] w-full py-3 rounded-md bg-ct-main-blue-100 text-ct-white font-sans text-h2">
            로그인
          </button>

          {/* 탭 */}
          <div className="mt-[16px] w-full flex justify-center items-center font-sans text-ct-white text-sub2 gap-[8px]">
            <span>비밀번호 재설정</span>
            <span>|</span>
            <span>회원가입</span>
          </div>

          {/* SNS */}
          <div className="mt-[57px] flex flex-col items-center">
            <p className=" text-body2 text-ct-gray-200 mb-[18px] ">
              소셜 계정으로 로그인
            </p>
            {/* 아이콘 그룹 */}
            <div className="flex gap-[19px]">
              <img
                src="/assets/onboarding/flash_kakao_logo.svg"
                alt="Kakao Login"
                className="w-[54px] h-[54px] rounded-full"
              />
              <img
                src="/assets/onboarding/flash_google_logo.svg"
                alt="Google Login"
                className="w-[54px] h-[54px] rounded-full"
              />
              <img
                src="/assets/onboarding/flash_naver_logo.svg"
                alt="Naver Login"
                className="w-[54px] h-[54px] rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Splash;
