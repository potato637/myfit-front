import { useState } from "react";
import TopBar from "../../components/common/TopBar";
import BottomCTAButton from "../../components/common/BottomCTAButton";
type MemberType = "individual" | "team";
function SelectMembers() {
  const [selected, setSelected] = useState<MemberType | null>(null);

  const handleSelect = (type: MemberType) => {
    setSelected(type);
  };
  const handleNextStep = () => {
    if (!selected) return;
    // navigate logic here
  };

  return (
    <div className="w-full h-screen ct-center">
      <div className="w-[375px] h-[812px] rounded-[15px] ">
        {/* TopBar */}
        <TopBar>
          <span className="font-sans text-h2 text-ct-black-200">회원가입</span>
        </TopBar>
        <div className="w-full h-screen bg-ct-white flex justify-center">
          <div className="w-[375px] h-[812px] rounded-[15px] relative pt-[66px]">
            {/* TopBar */}
            <TopBar>
              <span className="font-sans text-h2 text-ct-black-200">
                회원가입
              </span>
            </TopBar>

            {/* 콘텐츠 영역 */}
            <div
              className="flex flex-col items-center"
              onClick={() => setSelected(null)}
            >
              {/* 텍스트와 카드 영역 */}
              <div className="mt-[108px] flex flex-col gap-[24px]">
                {/* 개인 회원 카드 */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect("individual");
                  }}
                  className={`w-[328px] h-[164px] ct-center gap-[25px] px-[20px] rounded-[10px] border ${
                    selected === "individual"
                      ? "border-ct-main-blue-100"
                      : "border-ct-gray-100"
                  }`}
                >
                  <img
                    src="/assets/onboarding/individual_member.svg"
                    className="w-[109px] h-[99px]"
                  />
                  <div className="font-sans">
                    <p className=" text-h2 text-ct-black-200">개인 회원</p>
                    <p className="text-sub1 text-ct-main-blue-100">
                      구직/네트워킹 희망
                    </p>
                  </div>
                </div>

                {/* 팀 회원 카드 */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect("team");
                  }}
                  className={`w-[328px] h-[164px] ct-center gap-[25px] px-[20px] rounded-[10px] border ${
                    selected === "team"
                      ? "border-ct-main-blue-100"
                      : "border-ct-gray-100"
                  }`}
                >
                  <img
                    src="/assets/onboarding/group_member.svg"
                    className="w-[109px] h-[99px]"
                  />
                  <div className="font-sans">
                    <p className=" text-h2 text-ct-black-200">회사/팀 회원</p>
                    <p className="text-sub1 text-ct-main-blue-100">
                      스타트업/(예비)창업 팀
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA 버튼 */}
              <div
                className="mt-[180px] mb-[42px]"
                onClick={(e) => e.stopPropagation()}
              >
                <BottomCTAButton
                  text="다음 단계로 이동"
                  onClick={handleNextStep}
                  disabled={!selected}
                />
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

export default SelectMembers;
