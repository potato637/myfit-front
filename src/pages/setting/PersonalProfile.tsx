import { useState } from "react";
import TopBarContainer from "../../components/common/TopBarContainer";
import AcademicStatusModal from "../../components/onboarding/AcademicStatusModal";
import PersonalInputField from "../../components/setting/PersonalInputField";
import Modal from "../../components/ui/Modal";
import { useModal } from "../../contexts/ui/modalContext";
import EmploymentStatusModal from "../../components/onboarding/EmploymentStatusModal";
import BirthModal from "../../components/onboarding/BirthModal";
import RegionModal from "../../components/onboarding/RegionModal";
import SubRegionModal from "../../components/onboarding/SubRegionModal";

function PersonalProfile() {
  const { isModalOpen, setIsModalOpen } = useModal();
  const [region, setRegion] = useState("");
  const [subRegion, setSubRegion] = useState("");
  const [subRegionError, setSubRegionError] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [employ, setEmploy] = useState("");
  const [academic, setAcademic] = useState("");
  const [modalType, setModalType] = useState<
    "region" | "subregion" | "birth" | "academic" | "employment" | null
  >(null);
  const openModal = (
    type: "region" | "subregion" | "birth" | "academic" | "employment"
  ) => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const TopBarContent = () => {
    return (
      <div className="flex ct-center">
        <span className="text-h2 font-Pretendard text-ct-black-100">
          프로필
        </span>
        <span className="absolute right-[23px] text-sub2 text-ct-gray-300">
          완료
        </span>
      </div>
    );
  };
  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="flex flex-col mt-[19px] gap-[27px] mb-[35px] items-center">
        <PersonalInputField label="닉네임" />
        <div className="flex flex-col gap-[8px]">
          <PersonalInputField label="한줄 소개" />
          <span className="text-Body1 text-ct-gray-200 ml-[16px]">
            한줄로 나에 대해 나타내보세요!
            <br />
            EX. 저는 워라밸보다 연봉에 더 욕심이 있어요.
          </span>
        </div>
        <PersonalInputField
          label="나이"
          value={birthDate}
          placeholder="생년월일 입력"
          onClick={() => openModal("birth")}
        />
        <PersonalInputField
          label="주 활동 지역"
          value={region}
          placeholder="주 활동지역 입력"
          onClick={() => openModal("region")}
        />
        <PersonalInputField
          label="세부 활동 지역"
          value={subRegion}
          placeholder="세부 활동지역 입력"
          onClick={() => {
            if (!region) {
              setSubRegionError("먼저 주 활동 지역을 선택해주세요.");
            } else {
              setSubRegionError("");
              openModal("subregion");
            }
          }}
          error={subRegionError}
        />
        <PersonalInputField
          label="현재 구인/구직 상태를 알려주세요!"
          value={employ}
          placeholder="구인/구직 상태 입력"
          onClick={() => openModal("employment")}
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
          value={academic}
          placeholder="재학/졸업 상태 입력"
          onClick={() => openModal("academic")}
        />
      </div>
      <Modal>
        {isModalOpen && modalType === "region" && (
          <RegionModal onConfirm={(val) => setRegion(val)} />
        )}
        {isModalOpen && modalType === "subregion" && (
          <SubRegionModal
            value={region}
            onConfirm={(val) => setSubRegion(val)}
          />
        )}
        {isModalOpen && modalType === "birth" && (
          <BirthModal onConfirm={(val) => setBirthDate(val)} />
        )}
        {isModalOpen && modalType === "academic" && (
          <AcademicStatusModal onConfirm={(val) => setAcademic(val)} />
        )}
        {isModalOpen && modalType === "employment" && (
          <EmploymentStatusModal onConfirm={(val) => setEmploy(val)} />
        )}
      </Modal>
    </TopBarContainer>
  );
}
export default PersonalProfile;
