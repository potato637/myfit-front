import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomCTAButton from "../../components/common/BottomCTAButton";
import TopBarContainer from "../../components/common/TopBarContainer";
import InputField from "../../components/onboarding/InputField";
import PersonalInputField from "../../components/setting/PersonalInputField";
import Modal from "../../components/ui/Modal";
import { useModal } from "../../contexts/ui/modalContext";
import { useSignup } from "../../contexts/SignupContext";
import { companySignUp } from "../../apis/onboarding";
import { CompanyProfileRequest } from "../../types/onboarding/companyProfile";
import CompanyDivisionModal from "../../components/onboarding/CompanyDivisionModal";
import EmploymentStatusModal from "../../components/onboarding/EmploymentStatusModal";
import RegionModal from "../../components/onboarding/RegionModal";
import SubRegionModal from "../../components/onboarding/SubRegionModal";

function CompanyProfileRegister() {
  const { isModalOpen, setIsModalOpen } = useModal();
  const { signupData, nextStep, updateProfileInfo } = useSignup();
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [shortIntro, setShortIntro] = useState("");
  const [region, setRegion] = useState("");
  const [subRegion, setSubRegion] = useState("");
  const [subRegionError, setSubRegionError] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [division, setDivision] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [companyNameError, setCompanyNameError] = useState("");
  const [shortIntroError, setShortIntroError] = useState("");
  const [regionError, setRegionError] = useState("");
  const [employmentStatusError, setEmploymentStatusError] = useState("");
  const [divisionError, setDivisionError] = useState("");
  const [industryError, setIndustryError] = useState("");

  const companyNameRef = useRef<HTMLDivElement>(null);
  const shortIntroRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const subRegionRef = useRef<HTMLDivElement>(null);
  const employmentRef = useRef<HTMLDivElement>(null);
  const divisionRef = useRef<HTMLDivElement>(null);
  const industryRef = useRef<HTMLDivElement>(null);

  const [modalType, setModalType] = useState<
    "region" | "subregion" | "employment" | "division" | null
  >(null);

  const openModal = (
    type: "region" | "subregion" | "employment" | "division"
  ) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const validateAndScroll = () => {
    let firstErrorEl: HTMLElement | null = null;

    if (!companyName.trim()) {
      setCompanyNameError("회사/팀 이름을 입력해주세요");
      firstErrorEl = firstErrorEl || companyNameRef.current;
    } else {
      setCompanyNameError("");
    }

    if (!shortIntro.trim()) {
      setShortIntroError("한줄 소개를 입력해주세요");
      firstErrorEl = firstErrorEl || shortIntroRef.current;
    } else {
      setShortIntroError("");
    }

    if (!region) {
      setRegionError("주 활동 지역을 선택해주세요");
      firstErrorEl = firstErrorEl || regionRef.current;
    } else {
      setRegionError("");
    }

    if (!subRegion) {
      setSubRegionError("세부 활동 지역을 선택해주세요");
      firstErrorEl = firstErrorEl || subRegionRef.current;
    }

    if (!employmentStatus) {
      setEmploymentStatusError("구인/구직 상태를 선택해주세요");
      firstErrorEl = firstErrorEl || employmentRef.current;
    } else {
      setEmploymentStatusError("");
    }

    if (!division) {
      setDivisionError("구분을 선택해주세요");
      firstErrorEl = firstErrorEl || divisionRef.current;
    } else {
      setDivisionError("");
    }

    if (!industry.trim()) {
      setIndustryError("업종을 입력해주세요");
      firstErrorEl = firstErrorEl || industryRef.current;
    } else {
      setIndustryError("");
    }

    if (firstErrorEl) {
      firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
      const focusable = firstErrorEl.querySelector(
        "input, textarea"
      ) as HTMLElement | null;
      focusable?.focus();
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateAndScroll()) return;

    try {
      setIsSubmitting(true);

      const companyRequest: CompanyProfileRequest = {
        email: signupData.email,
        password: signupData.password,
        division: "team",
        name: companyName,
        one_line_profile: shortIntro,
        high_area: region,
        low_area: subRegion,
        recruiting_status: employmentStatus,
        team_division: division,
        industry: industry,
        link: website,
      };

      console.log(
        "🏢 [CompanyProfileRegister] 회사 회원가입 요청:",
        companyRequest
      );
      const response = await companySignUp(companyRequest);

      if (response.isSuccess) {
        console.log(
          "✅ [CompanyProfileRegister] 회사 회원가입 성공:",
          response
        );
        updateProfileInfo({
          name: companyName,
          oneLineProfile: shortIntro,
          teamDivision: division,
          industry: industry,
          website: website,
          recruitingStatus: employmentStatus,
          serviceId: response.result?.service_id || 0,
        });
        nextStep();
        navigate("/onboarding/company-card-register");
      } else {
        throw new Error(response.message || "회사 회원가입 실패");
      }
    } catch (error) {
      console.error("회사 회원가입 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const TopBarContent = () => {
    return <span className="text-h2 font-sans text-ct-black-300">프로필</span>;
  };

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="relative flex flex-col pt-[24px] mx-[22px] border-t border-ct-gray-200">
        <div className="absolute top-[8px] right-0 flex items-center gap-[6px]">
          <img src="/assets/onboarding/step1.svg" alt="현재 스텝 1" />
          <img src="/assets/onboarding/nonestep.svg" alt="none" />
          <img src="/assets/onboarding/nonestep.svg" alt="none" />
        </div>

        <div ref={companyNameRef}>
          <InputField
            label="회사/팀 이름"
            placeholder="입력해주세요"
            value={companyName}
            error={companyNameError}
            onChange={(e) => {
              setCompanyName(e.target.value);
              if (companyNameError && e.target.value.trim())
                setCompanyNameError("");
            }}
          />
        </div>

        <div ref={shortIntroRef}>
          <InputField
            label="한줄 소개"
            as="textarea"
            placeholder="50자 이내"
            value={shortIntro}
            onChange={(e) => {
              setShortIntro(e.target.value);
              if (shortIntroError && e.target.value.trim())
                setShortIntroError("");
            }}
            maxLength={50}
            showCounter={true}
            error={shortIntroError}
            helperText={
              <>
                한줄로 나에 대해 나타내보세요! <br />
                <span className="block">
                  EX. 저는 워라밸보다 연봉에 더 욕심이 있어요.
                </span>
              </>
            }
          />
        </div>

        <div ref={regionRef}>
          <PersonalInputField
            label="주 활동 지역"
            value={region}
            placeholder="'시/도' 를 선택해주세요!"
            onClick={() => openModal("region")}
            error={regionError}
          />
        </div>

        <div ref={subRegionRef}>
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
        </div>

        <div ref={employmentRef}>
          <PersonalInputField
            label="현재 구인/구직 상태"
            value={employmentStatus}
            placeholder="현재 구직중!"
            onClick={() => openModal("employment")}
            error={employmentStatusError}
          />
        </div>

        <div ref={divisionRef}>
          <PersonalInputField
            label="구분"
            value={division}
            placeholder="선택"
            onClick={() => openModal("division")}
            error={divisionError}
          />
        </div>

        <div ref={industryRef}>
          <InputField
            label="업종"
            placeholder="입력"
            value={industry}
            onChange={(e) => {
              setIndustry(e.target.value);
              if (industryError && e.target.value.trim()) setIndustryError("");
            }}
            helperText={
              <>
                사업자등록증 기준 업종을 기재해주세요. 아직 사업자등록이 되어
                <br />
                있지 않다면, 향후 등록 예정인 업종으로 기재해주세요! (변경 가능)
              </>
            }
          />
          {industryError && (
            <span className="text-body2 text-ct-red-100 pl-[13px]">
              {industryError}
            </span>
          )}
        </div>

        <InputField
          label="회사 공식 웹사이트 링크(선택)"
          placeholder="선택"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          helperText={<>링크 등록 시, 자동으로 프로필 페이지에 기재 됩니다.</>}
        />

        <BottomCTAButton
          text={isSubmitting ? "등록 중..." : "첫 카드 등록하러 가기"}
          onClick={handleSubmit}
          disabled={isSubmitting}
        />
      </div>

      <Modal>
        {isModalOpen && modalType === "region" && (
          <RegionModal
            onConfirm={(val) => {
              setRegion(val);
              if (val) setRegionError("");
            }}
          />
        )}
        {isModalOpen && modalType === "subregion" && (
          <SubRegionModal
            value={region}
            onConfirm={(val) => {
              setSubRegion(val);
              if (val) setSubRegionError("");
            }}
          />
        )}
        {isModalOpen && modalType === "employment" && (
          <EmploymentStatusModal
            onConfirm={(val) => {
              setEmploymentStatus(val);
              if (val) setEmploymentStatusError("");
            }}
          />
        )}
        {isModalOpen && modalType === "division" && (
          <CompanyDivisionModal
            onConfirm={(val) => {
              setDivision(val);
              if (val) setDivisionError("");
            }}
          />
        )}
      </Modal>
    </TopBarContainer>
  );
}
export default CompanyProfileRegister;
