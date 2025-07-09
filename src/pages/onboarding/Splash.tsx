function Splash() {
  return (
    <div className="relative w-full min-h-screen flex justify-center items-center bg-black overflow-hidden">
      {/* ✅ 배경 이미지 - safe area 상단까지 확장 */}
      <img
        src="/assets/onboarding/splash_background.svg"
        alt="Splash Background"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{
          top: "calc(-1 * env(safe-area-inset-top, 0px))",
        }}
      />

      {/* ✅ 콘텐츠 박스 */}
      <div className="relative z-10 w-full max-w-[375px] min-h-[812px] px-[24px] pt-safe pb-safe rounded-[15px] flex flex-col items-center">
        {/* 로고 */}
        <img
          src="/assets/onboarding/myfit_logo.svg"
          alt="MyFit Logo"
          className="w-[136px] h-[62px] mb-[24px]"
        />

        {/* 설명 텍스트 */}
        <p className="text-center text-ct-white text-sub1 leading-[22px] mb-[40px]">
          나를 간편하게 표현하고 <br />
          인재들과 자유롭게 대화해보세요!
        </p>

        {/* 이메일 입력 */}
        <input
          type="email"
          placeholder="이메일을 입력해주세요"
          className="w-full px-4 py-3 mb-[16px] rounded-md bg-transparent border border-ct-white text-ct-white placeholder-ct-white"
        />

        {/* 비밀번호 입력 */}
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          className="w-full px-4 py-3 mb-[23px] rounded-md bg-transparent border border-ct-white text-ct-white placeholder-ct-white"
        />

        {/* 로그인 버튼 */}
        <button className="w-full py-3 mb-[16px] rounded-md bg-ct-main-blue-100 text-ct-white text-h2">
          로그인
        </button>

        {/* 비밀번호 재설정 / 회원가입 */}
        <div className="flex justify-center items-center gap-[8px] text-ct-white text-sub2 mb-[57px]">
          <span>비밀번호 재설정</span>
          <span>|</span>
          <span>회원가입</span>
        </div>

        {/* 소셜 로그인 */}
        <p className="text-ct-gray-200 text-body2 mb-[18px]">
          소셜 계정으로 로그인
        </p>
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
  );
}

export default Splash;
