import { useNavigate } from "react-router-dom";
import TopBar from "../../components/common/TopBar";

function RegisterMethod() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-ct-white ct-center overflow-hidden">
      <div className="w-[375px] h-[812px] bg-white rounded-[15px] pt-[66px] px-4">
        {/* TopBar */}
        <TopBar>
          <span className="font-sans text-h2 text-ct-black-200">회원가입</span>
        </TopBar>
        {/* 콘텐츠 */}
        <div className="px-4 flex flex-col gap-[65px] mt-[50px]">
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
      </div>
    </div>
  );
}

export default RegisterMethod;
