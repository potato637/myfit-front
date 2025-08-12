import BottomCTAButton from "../../components/common/BottomCTAButton";
import TopBarContainer from "../../components/common/TopBarContainer";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../contexts/SignupContext";

function SelectMembers() {
  const navigate = useNavigate();
  const { signupData, updateDivision, nextStep } = useSignup();

  const handleSelect = (type: "personal" | "company") => {
    updateDivision(type);
  };

  const handleNextStep = () => {
    if (!signupData.division) return;
    nextStep();
    navigate("/onboarding/register-email");
  };

  return (
    <TopBarContainer
      TopBarContent={
        <span className="text-h2 font-sans text-ct-black-300">
          회사인증(선택)
        </span>
      }
    >
      {/* 공통 padding 적용: 버튼/카드 모두 w-full 일치 */}
      <div className="flex flex-col px-[25.26px] justify-between bg-ct-white">
        {/* 카드 선택 영역 */}
        <div className="mt-[108px] mb-[161px] flex flex-col gap-[24px]">
          {/* 개인 회원 카드 */}
          <div
            onClick={() => handleSelect("personal")}
            className={`w-full h-[164px] ct-center gap-[25px] px-[20px] rounded-[10px] border cursor-pointer ${
              signupData.division === "personal"
                ? "border-ct-main-blue-100"
                : "border-ct-gray-100"
            }`}
          >
            <img
              src="/assets/onboarding/individual_member.svg"
              alt="개인 회원"
              className="w-[109px] h-[99px]"
            />
            <div className="font-sans">
              <p className="text-h2 text-ct-black-200">개인 회원</p>
              <p className="text-sub1 text-ct-main-blue-100">
                구직/네트워킹 희망
              </p>
            </div>
          </div>

          {/* 회사/팀 회원 카드 */}
          <div
            onClick={() => handleSelect("company")}
            className={`w-full h-[164px] ct-center gap-[25px] px-[20px] rounded-[10px] border cursor-pointer ${
              signupData.division === "company"
                ? "border-ct-main-blue-100"
                : "border-ct-gray-100"
            }`}
          >
            <img
              src="/assets/onboarding/group_member.svg"
              alt="회사/팀 회원"
              className="w-[109px] h-[99px]"
            />
            <div className="font-sans">
              <p className="text-h2 text-ct-black-200">회사/팀 회원</p>
              <p className="text-sub1 text-ct-main-blue-100">
                스타트업/(예비)창업 팀
              </p>
            </div>
          </div>
        </div>

        {/* CTA 버튼 (42px margin은 버튼 컴포넌트 내부에서 처리) */}
        <BottomCTAButton
          text="다음 단계로 이동"
          onClick={handleNextStep}
          disabled={!signupData.division}
        />
      </div>
    </TopBarContainer>
  );
}

export default SelectMembers;
