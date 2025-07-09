import { useNavigate } from "react-router-dom";
import TopBarContainer from "../../components/common/TopBarContainer";

function RegisterMethod() {
  const TopBarContent = () => (
    <span className="text-h2 font-sans text-ct-black-300">회사인증(선택)</span>
  );

  const navigate = useNavigate();

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      {/* 콘텐츠 */}
      <div className="px-[36px] flex flex-col gap-[65px] mt-[50px]">
        {/* 이메일 회원가입 */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => navigate("/onboarding/register-email")}
          onKeyDown={(e) =>
            e.key === "Enter" && navigate("/onboarding/register-email")
          }
          className="w-fit py-[6px] border-b-[1px] border-ct-black-200 font-sans text-sub1 cursor-pointer"
        >
          이메일로 회원가입
        </div>

        {/* 소셜 로그인 섹션 */}
        <div className="flex flex-col gap-[23px]">
          {/* 텍스트는 왼쪽 정렬 */}
          <div className="w-fit  py-1 font-sans text-sub1 text-ct-black-200">
            소셜 계정으로 회원가입
          </div>

          {/* 아이콘은 가운데 정렬 */}
          <div className="ct-center gap-[19px]">
            <button>
              <img
                src="/public/assets/onboarding/flash_google_logo.svg"
                alt="Google 로그인"
                className="w-10 h-10"
              />
            </button>
            <button>
              <img
                src="/public/assets/onboarding/flash_kakao_logo.svg"
                alt="Kakao 로그인"
                className="w-10 h-10"
              />
            </button>
            <button>
              <img
                src="/public/assets/onboarding/flash_naver_logo.svg"
                alt="Naver 로그인"
                className="w-10 h-10"
              />
            </button>
          </div>
        </div>
      </div>{" "}
    </TopBarContainer>
  );
}

export default RegisterMethod;
