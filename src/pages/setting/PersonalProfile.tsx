import { useEffect, useState } from "react";
import TopBarContainer from "../../components/common/TopBarContainer";
import AcademicStatusModal from "../../components/onboarding/AcademicStatusModal";
import PersonalInputField from "../../components/setting/PersonalInputField";
import Modal from "../../components/ui/Modal";
import { useModal } from "../../contexts/ui/modalContext";
import EmploymentStatusModal from "../../components/onboarding/EmploymentStatusModal";
import BirthModal from "../../components/onboarding/BirthModal";
import RegionModal from "../../components/onboarding/RegionModal";
import SubRegionModal from "../../components/onboarding/SubRegionModal";
import { useLocation, useNavigate } from "react-router-dom";

function PersonalProfile() {
  const { isModalOpen, setIsModalOpen } = useModal();
  const [nickname, setNickname] = useState("");
  const [shortIntro, setShortIntro] = useState("");
  const [region, setRegion] = useState("");
  const [subRegion, setSubRegion] = useState("");
  const [subRegionError, setSubRegionError] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [employ, setEmploy] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [highSector, setHighSector] = useState<string[]>([]);
  const [lowSector, setLowSector] = useState<string[]>([]);
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
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const state = location.state;
    if (state?.prevData) {
      const data = state.prevData;
      setNickname(data.nickname || "");
      setShortIntro(data.shortIntro || "");
      setEducationLevel(data.educationLevel || "");
      setRegion(data.region || "");
      setSubRegion(data.subRegion || "");
      setBirthDate(data.birthDate || "");
      setEmploy(data.employ || "");
      setAcademic(data.academic || "");

      if (state.high_sector) setHighSector(state.high_sector);
      if (state.low_sector) setLowSector(state.low_sector);
    }
  }, [location.state]);

  const selectedSkillLabel = lowSector.join(", ");

  const TopBarContent = () => {
    return (
      <div className="flex ct-center">
        <span className="text-h2 font-Pretendard text-ct-black-100">
          프로필
        </span>
        <span
          className="absolute right-[23px] text-sub2 text-ct-gray-300"
          onClick={() => nav("/personalsetting")}
        >
          완료
        </span>
      </div>
    );
  };
  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="pt-[19px] pb-[35px]">
        <div className="w-full max-w-[400px] px-[24px] mx-auto flex flex-col gap-[27px]">
          <PersonalInputField
            label="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <div className="flex flex-col gap-[8px]">
            <PersonalInputField
              label="한줄 소개"
              value={shortIntro}
              onChange={(e) => setShortIntro(e.target.value)}
              multiline={true}
              maxLength={50}
              showCounter={true}
            />
            <span className="text-body1 text-ct-gray-200 ml-[10px]">
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
            value={selectedSkillLabel}
            placeholder="희망직무 입력"
            onClick={() =>
              nav("/personalsetting/profile/jobpreference", {
                state: {
                  from: "setting",
                  prevData: {
                    region,
                    subRegion,
                    birthDate,
                    employ,
                    academic,
                    nickname,
                    shortIntro,
                    educationLevel,
                  },
                  high_sector: highSector,
                  low_sector: lowSector,
                },
              })
            }
          />
          <PersonalInputField
            label="최종 학력을 입력해주세요"
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            placeholder="최종학력 입력"
          />
          <PersonalInputField
            label="재학/졸업 상태를 입력해주세요"
            value={academic}
            placeholder="재학/졸업 상태 입력"
            onClick={() => openModal("academic")}
          />
        </div>
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
