import TopBarContainer from "../../components/common/TopBarContainer";
import PersonalInputField from "../../components/setting/PersonalInputField";

function PersonalProfile() {
  const TopBarContent = () => {
    return (
      <span className="text-h2 font-Pretendard text-ct-black-100">프로필</span>
    );
  };
  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="flex flex-col mt-[19px] gap-[27px] mb-[35px]">
        <PersonalInputField label="닉네임" />
        <div className="flex flex-col gap-[8px]">
          <PersonalInputField label="한줄 소개" />
          <span className="text-Body1 text-ct-gray-200 ml-[16px]">
            한줄로 나에 대해 나타내보세요!
            <br />
            EX. 저는 워라밸보다 연봉에 더 욕심이 있어요.
          </span>
        </div>
        <PersonalInputField label="나이" placeholder="생년월일 입력" />
        <PersonalInputField label="주 활동 지역" placeholder="활동지역 입력" />
        <PersonalInputField
          label="현재 구인/구직 상태를 알려주세요!"
          placeholder="추후 드롭다운 박스 구현예정"
        />
        <PersonalInputField
          label="희망 직무를 선택해주세요"
          placeholder="희망직무 입력"
        />
        <PersonalInputField
          label="최종 학력을 입력해주세요"
          placeholder="최종학력 입력"
        />
        <PersonalInputField
          label="재학/졸업 상태를 입력해주세요"
          placeholder="재학/졸업 상태 입력"
        />
      </div>
    </TopBarContainer>
  );
}
export default PersonalProfile;
