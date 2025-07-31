import { useLocation } from "react-router-dom";
import TopBarContainer from "../../components/common/TopBarContainer";
import BottomNavContainer from "../../components/layouts/BottomNavContainer";
import CardPreview from "../../components/onboarding/CardPreview";
import { useSignup } from "../../contexts/SignupContext";

function CompanyPreview() {
  const location = useLocation();
  const { signupData } = useSignup();
  
  // ProfileCardRegister에서 전달된 데이터
  const cardData = location.state?.cardData || {};
  const {
    cardImageUrl = "/assets/profile/profileImage.png", // 기본 이미지
    oneLineIntro = "기본 한줄 소개",
    detailedDescription = "기본 상세 설명",
    link = "",
    keywords = []
  } = cardData;
  
  // SignupContext에서 사용자 정보 가져오기
  const userName = signupData.name || "사용자";
  const userJobTitle = signupData.highSector || keywords[0] || "키워드";
  
  const TopBarContent = () => {
    return (
      <div className="flex ct-center">
        <span className="text-ct-black-100 text-h1">미리보기</span>
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
            profileImage={cardImageUrl} // S3 업로드된 이미지 사용
            companyName={userName} // SignupContext에서 가져온 사용자 이름
            badge={userJobTitle} // SignupContext의 희망직무 또는 첫 번째 키워드
            summary={oneLineIntro} // 전달된 한줄 소개
            description={detailedDescription} // 전달된 상세 설명
            link={link} // 전달된 링크
            keywords={keywords} // 키워드 배열 전달
          />{" "}
        </div>
      </TopBarContainer>
    </BottomNavContainer>
  );
}

export default CompanyPreview;
