import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBarContainer from "../../components/common/TopBarContainer";
import InputField from "../../components/onboarding/InputField";
import PersonalInputField from "../../components/setting/PersonalInputField";
import Modal from "../../components/ui/Modal";
import { useModal } from "../../contexts/ui/modalContext";
import CompanyDivisionModal from "../../components/onboarding/CompanyDivisionModal";
import EmploymentStatusModal from "../../components/onboarding/EmploymentStatusModal";
import RegionModal from "../../components/onboarding/RegionModal";
import SubRegionModal from "../../components/onboarding/SubRegionModal";
import { useAuth } from "../../contexts/AuthContext";
import { useGetProfile } from "../../hooks/mypageQueries";
import { usePatchBusinessProfile } from "../../hooks/settingQueries";

function CompanyProfile() {
  const navigate = useNavigate();
  const { isModalOpen, setIsModalOpen } = useModal();
  const { user } = useAuth();
  const { data: profile } = useGetProfile({
    service_id: user?.id?.toString() || "",
  });

  // 상태 관리 - 빈 문자열로 초기화하여 controlled input 보장
  const [companyName, setCompanyName] = useState("");
  const [shortIntro, setShortIntro] = useState("");
  const [region, setRegion] = useState("");
  const [subRegion, setSubRegion] = useState("");
  const [subRegionError, setSubRegionError] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [division, setDivision] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    if (profile) {
      setCompanyName(profile.result.user.name);
      setShortIntro(profile.result.user.one_line_profile);
      setRegion(profile.result.service.userArea.high_area);
      setSubRegion(profile.result.service.userArea.low_area);
      setEmploymentStatus(profile.result.service.recruiting_status);
      setDivision(profile.result.user.team_division || "");
      setIndustry(profile.result.user.industry || "");
      setWebsite(profile.result.user.link || "");
    }
  }, [profile]);

  // 모달 타입 관리
  const [modalType, setModalType] = useState<
    "region" | "subregion" | "employment" | "division" | null
  >(null);

  const openModal = (
    type: "region" | "subregion" | "employment" | "division"
  ) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const { mutate: updateProfile } = usePatchBusinessProfile({
    service_id: user?.id?.toString() || "",
  });

  const handleSubmit = async () => {
    updateProfile({
      name: companyName,
      one_line_profile: shortIntro,
      team_division: division,
      industry: industry,
      high_area: region,
      low_area: subRegion,
      recruiting_status: employmentStatus,
      link: website,
    });
    navigate("/mypage");
  };

  const TopBarContent = () => {
    return (
      <div className="flex ct-center">
        <span className="text-h2 font-Pretendard text-ct-black-100">
          프로필
        </span>
        <div onClick={handleSubmit} className="ct-center">
          <span className="absolute right-[23px] text-sub2 text-ct-gray-300">
            완료
          </span>
        </div>
      </div>
    );
  };

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="relative flex flex-col pt-[24px] mx-[22px]">
        <InputField
          label="회사/팀 이름"
          placeholder="입력해주세요"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <InputField
          label="한줄 소개"
          as="textarea"
          placeholder="50자 이내"
          value={shortIntro}
          onChange={(e) => setShortIntro(e.target.value)}
          maxLength={50}
          showCounter={true}
          helperText={
            <>
              한줄로 나에 대해 나타내보세요! <br />
              <span className="block">
                EX. 저는 워라밸보다 연봉에 더 욕심이 있어요.
              </span>
            </>
          }
        />
        <PersonalInputField
          label="주 활동 지역"
          value={region}
          placeholder="'시/도' 를 선택해주세요!"
          onClick={() => openModal("region")}
        />
        <PersonalInputField
          label="주 활동 세부 지역"
          value={subRegion}
          placeholder="세부 활동 지역을 선택해주세요"
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
          label="현재 구인/구직 상태"
          value={employmentStatus}
          placeholder="현재 구직중!"
          onClick={() => openModal("employment")}
        />
        <PersonalInputField
          label="구분"
          value={division}
          placeholder="선택"
          onClick={() => openModal("division")}
        />
        <InputField
          label="업종"
          placeholder="입력"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          helperText={
            <>
              사업자등록증 기준 업종을 기재해주세요. 아직 사업자등록이 되어
              <br />
              있지 않다면, 향후 등록 예정인 업종으로 기재해주세요! (변경 가능)
            </>
          }
        />
        <InputField
          label="회사 공식 웹사이트 링크(선택)"
          placeholder="선택"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          helperText={<>링크 등록 시, 자동으로 프로필 페이지에 기재 됩니다.</>}
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
        {isModalOpen && modalType === "employment" && (
          <EmploymentStatusModal
            onConfirm={(val) => setEmploymentStatus(val)}
          />
        )}
        {isModalOpen && modalType === "division" && (
          <CompanyDivisionModal onConfirm={(val) => setDivision(val)} />
        )}
      </Modal>
    </TopBarContainer>
  );
}
export default CompanyProfile;
