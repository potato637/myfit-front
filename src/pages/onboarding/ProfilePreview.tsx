import TopBarContainer from "../../components/common/TopBarContainer";
import BottomNavContainer from "../../components/layouts/BottomNavContainer";
import CardPreview from "../../components/onboarding/CardPreview";

function CompanyPreview() {
  const TopBarContent = () => {
    return (
      <div className="relative w-full ct-center">
        <span className="text-ct-black-100 text-h1">미리보기 </span>
        <div className="absolute right-[22px]">
          <span className="text-sub2 text-ct-gray-200">완료</span>
        </div>
      </div>
    );
  };

  return (
    <BottomNavContainer>
      <TopBarContainer TopBarContent={<TopBarContent />}>
        <div className="relative flex flex-col pt-[24px] mx-[22px] border-t border-ct-gray-200 pb-[89px]">
          {" "}
          {/* <-- 여기에 padding-bottom 주의 */}
          {/* ✅ 스텝 인디케이터 */}
          <div className="absolute top-[12px] right-0 flex items-center gap-[6px]">
            <img src="/public/assets/onboarding/nonestep.svg" alt="none" />
            <img src="/public/assets/onboarding/step2.svg" alt="현재 스텝 2" />
            <img src="/public/assets/onboarding/nonestep.svg" alt="none" />
          </div>
          {/* 카드 미리보기 */}
          <CardPreview
            profileImage="/assets/profile/profileImage.png"
            companyName="서인재"
            badge="개발자"
            summary="기획자의 기본기, 논리적 흐름과 구조를 갖춘 서비스 기획서 작성 경험"
            description="사용자 페르소나 설정부터~협업을 고려한 구조로 구성했습니다.."
            link="notion.so/plan-structure-case-study"
          />{" "}
        </div>
      </TopBarContainer>
    </BottomNavContainer>
  );
}

export default CompanyPreview;
