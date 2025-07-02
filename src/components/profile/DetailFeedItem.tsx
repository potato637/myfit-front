import CompanyLink from "./CompanyLink";
import FeedTagContainer from "./FeedTagContainer";

function DetailFeedItem() {
  return (
    <div className="w-full h-auto bg-ct-white rounded-[10px] p-[16px] flex flex-col gap-[10px] items-center">
      <div className="w-full h-[30px] px-[5px] py-[14px] flex items-center justify-between">
        <span className="text-ct-main-blue-100 text-body1">활동 카드 1</span>
        <img src="/assets/profile/settingIcon.svg" alt="설정" />
      </div>
      <img
        className="w-[353px] h-[442px] rounded-[5px] object-cover"
        src="/assets/profile/card.jpg"
        alt="활동 카드 이미지"
      />
      <div className="w-full p-[12px] bg-ct-gray-100 flex flex-col rounded-[5px] gap-2">
        <span className="text-sub1 text-ct-black-100">한줄 소개</span>
        <span className="text-body3 text-ct-black-200">
          기획자의 기본기, 논리적 흐름과 구조를 갖춘 서비스 기획서 작성 경험
        </span>
      </div>
      <div className="w-full p-[12px] bg-ct-gray-100 flex flex-col rounded-[5px] gap-2">
        <span className="text-sub1 text-ct-black-100">상세 설명</span>
        <span className="text-body3 text-ct-black-200">
          사용자 페르소나 설정부터, 니즈 도출 → 기능 정의 → 플로우 설계까지 신규
          서비스의 전체 구조를 기획하고 팀원들과 공유 가능한 형태로 문서화
          했습니다. 사용자 중심의 사고와 개발자/디자이너와 협업을 고려한 구조로
          구성했습니다..
        </span>
      </div>
      <CompanyLink link="notion.so/plan-structure-case-study" width="w-full" />
      <FeedTagContainer />
    </div>
  );
}

export default DetailFeedItem;
