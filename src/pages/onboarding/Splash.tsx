import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../apis/auth";
import { useAuth } from "../../contexts/AuthContext";

function Splash() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuth();
  
  // 폼 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      
      const response = await login({ email, password });
      
      if (response.isSuccess) {
        // 로그인 성공
        setUser({
          id: response.result.service_id,
          username: response.result.name,
          email: response.result.email,
        });
        setIsLoggedIn(true);
        navigate("/feed/feed-main"); // 메인 페이지로 이동
      }
    } catch (apiError: any) {
      console.error("로그인 에러:", apiError);
      
      if (apiError.response?.status === 401) {
        setError("로그인에 실패하였습니다. 이메일이나 비밀번호를 확인해주세요.");
      } else if (apiError.response?.status === 500) {
        setError("서버에 오류가 발생하였습니다.");
      } else {
        setError("로그인 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      {/* ✅ 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url("/assets/onboarding/splash_background.svg")`,
          top: "calc(-1 * env(safe-area-inset-top, 0px))",
        }}
      />

      {/* ✅ 콘텐츠 */}
      <div className="relative z-10 w-full max-w-[375px] h-full mx-auto px-[35px] pt-safe pb-safe flex flex-col items-center rounded-[15px]">
        {/* 로고 */}
        <img
          src="/assets/onboarding/myfit_logo.svg"
          alt="MyFit 로고"
          className="w-[136px] h-[62px] mt-[70px] mb-6"
        />

        {/* 소개 텍스트 */}
        <p className="text-center text-ct-white text-sub1 leading-[22px] mb-10">
          나를 간편하게 표현하고 <br />
          인재들과 자유롭게 대화해보세요!
        </p>

        {/* 이메일 입력 */}
        <input
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="w-full px-4 py-3 mb-4 rounded-md bg-transparent border border-ct-white text-ct-white placeholder:text-ct-white disabled:opacity-50"
        />

        {/* 비밀번호 입력 */}
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          className="w-full px-4 py-3 mb-2 rounded-md bg-transparent border border-ct-white text-ct-white placeholder:text-ct-white disabled:opacity-50"
        />

        {/* 에러 메시지 */}
        {error && (
          <p className="w-full text-red-400 text-body2 mb-4 text-center">
            {error}
          </p>
        )}

        {/* 로그인 버튼 */}
        <button 
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full py-3 mb-4 rounded-md bg-ct-main-blue-100 text-ct-white text-h2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>

        {/* 하단 링크 */}
        <div className="ct-center gap-[32px] text-ct-white text-sub2 mb-[57px]">
          <button onClick={() => navigate("/personalsetting/resetpassword")}>
            비밀번호 재설정
          </button>
          <div className="w-px h-[12px] bg-ct-white" />
          <button onClick={() => navigate("/onboarding/selectmembers")}>
            회원가입
          </button>
        </div>

        {/* 소셜 로그인 구분선 */}
        <div className="flex items-center w-full mb-[18px]">
          <div className="flex-grow h-px bg-ct-gray-200" />
          <p className="px-[12px] text-ct-gray-200 text-body2 whitespace-nowrap">
            소셜 계정으로 로그인
          </p>
          <div className="flex-grow h-px bg-ct-gray-200" />
        </div>

        {/* 소셜 로그인 아이콘 */}
        <div className="flex gap-[19px]">
          {[
            { alt: "카카오 로그인", src: "flash_kakao_logo.svg" },
            { alt: "구글 로그인", src: "flash_google_logo.svg" },
            { alt: "네이버 로그인", src: "flash_naver_logo.svg" },
          ].map(({ alt, src }) => (
            <img
              key={alt}
              src={`/assets/onboarding/${src}`}
              alt={alt}
              className="w-[54px] h-[54px] rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Splash;
