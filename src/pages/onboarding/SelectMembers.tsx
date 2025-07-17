import { useState } from "react";
import BottomCTAButton from "../../components/common/BottomCTAButton";
import TopBarContainer from "../../components/common/TopBarContainer";
import { useNavigate } from "react-router-dom";

type MemberType = "individual" | "team";

function SelectMembers() {
  const navigate = useNavigate();
  // 선택된 회원 유형 상태 관리
  const [selected, setSelected] = useState<MemberType | null>(null);

  const handleSelect = (type: MemberType) => setSelected(type);
  const handleNextStep = () => {
    if (!selected) return;
    localStorage.setItem("memberType", selected); // 새로고침 대비
    // navigate logic 추가
    navigate("/onboarding/register-method");
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
            onClick={() => handleSelect("individual")}
            className={`w-full h-[164px] ct-center gap-[25px] px-[20px] rounded-[10px] border cursor-pointer ${
              selected === "individual"
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
            onClick={() => handleSelect("team")}
            className={`w-full h-[164px] ct-center gap-[25px] px-[20px] rounded-[10px] border cursor-pointer ${
              selected === "team"
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
          disabled={!selected}
        />
      </div>
    </TopBarContainer>
  );
}

export default SelectMembers;
