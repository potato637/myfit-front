import TopBarContainer from "../../components/common/TopBarContainer";
import BottomNav from "../../components/layouts/BottomNav";
import BirthModal from "../../components/onboarding/BirthModal";
import CompanyInputField from "../../components/setting/CompanyInputField";
import Modal from "../../components/ui/Modal";
import { useModal } from "../../contexts/ui/modalContext";

function CompanyProfile() {
  const { setIsModalOpen } = useModal();
  const TopBarContent = () => {
    return (
      <span className="text-h2 font-Pretendard text-ct-black-100">프로필</span>
    );
  };
  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="flex flex-col gap-[27px] mt-[21px] items-center">
        <CompanyInputField
          label="회사"
          placeholder="입력"
          hintLabel="선택"
          hintDescription="회사의 공식명칙을 입력해주세요!"
        />
        <CompanyInputField
          label="닉네임"
          placeholder="입력"
          hintLabel="필수"
          hintDescription="10자 이내로 작성해주세요!"
        />
        <CompanyInputField
          label="생년월일"
          placeholder="입력"
          hintLabel="필수"
          hintDescription="정확한 생년월일을 입력해주세요!"
          onClick={() => setIsModalOpen(true)}
        />
        <CompanyInputField
          label="업종"
          placeholder="입력"
          hintLabel="필수"
          hintDescription="해당하는 업종을 입력해주세요!"
        />
      </div>
      <BottomNav />
    </TopBarContainer>
  );
}
export default CompanyProfile;
