import BottomCTAButton from "../../components/common/BottomCTAButton";
import TopBarContainer from "../../components/common/TopBarContainer";
import InputField from "../../components/onboarding/InputField";

function ProfileRegister() {
  const TopBarContent = () => {
    return <span className="text-h2 font-sans text-ct-black-300">프로필</span>;
  };
  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="relative flex flex-col pt-[24px] mx-[22px] border-t border-ct-gray-200">
        {/* ✅ 스텝 인디케이터 */}
        <div className="absolute top-[8px] right-0 flex items-center gap-[6px]">
          {/* 스텝 아이콘 */}
          <img src="/public/assets/onboarding/step1.svg" alt="현재 스텝 1" />
          <img src="/public/assets/onboarding/nonestep.svg" alt="none" />
        </div>
        <InputField
          label="닉네임"
          placeholder="입력해주세요(본인의 실명을 추천합니다!)"
        />
        <InputField
          label="한줄 소개"
          placeholder="50자 이내"
          helperText={
            <>
              한줄로 나에 대해 나타내보세요! <br />
              <span className="block">
                EX. 저는 워라밸보다 연봉에 더 욕심이 있어요.
              </span>
            </>
          }
        />{" "}
        <InputField label="나이" placeholder="생년월일 선택" />
        <InputField
          label="주 활동 지역"
          placeholder="‘시/도’ 를 선택해주세요!"
        />
        <InputField
          label="주 활동 세부 지역"
          placeholder="세부 활동 지역을 선택해주세요"
        />
        <InputField label="현재 구인/구직 상태" placeholder="현재 구직중!" />
        <InputField label="희망 직무" placeholder="선택" />
        <InputField
          label="최종 학력을 입력해주세요"
          placeholder="예시) 마핏대학교, 마핏대학교 일반대학원"
        />
        <InputField label="재학/졸업 상태" placeholder="선택" />
        <BottomCTAButton text="다음 단계로 이동" />
      </div>
    </TopBarContainer>
  );
}
export default ProfileRegister;
