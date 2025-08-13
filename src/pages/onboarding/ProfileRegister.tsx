import { useEffect, useRef, useState } from "react";
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
import BottomCTAButton from "../../components/common/BottomCTAButton";
import { useSignup } from "../../contexts/SignupContext";
import { signUp } from "../../apis/onboarding";
import { SignUpRequest } from "../../types/onboarding/signup";

type JobState =
  | {
      prevData?: {
        region?: string;
        subRegion?: string;
        birthDate?: string;
        employ?: string;
        academic?: string;
        nickname?: string;
        shortIntro?: string;
        educationLevel?: string;
      };
      high_sector?: string | string[] | null;
      low_sector?: string | string[] | null;
    }
  | undefined;

function ProfileRegister() {
  const { isModalOpen, setIsModalOpen } = useModal();
  const { signupData, updateProfileInfo, nextStep } = useSignup();

  const [nickname, setNickname] = useState(signupData.name || "");
  const [nicknameError, setNicknameError] = useState("");
  const [shortIntro, setShortIntro] = useState(signupData.oneLineProfile || "");
  const [region, setRegion] = useState("");
  const [regionError, setRegionError] = useState("");
  const [subRegion, setSubRegion] = useState("");
  const [subRegionError, setSubRegionError] = useState("");
  const [birthDate, setBirthDate] = useState(signupData.birthdate || "");
  const [birthError, setBirthError] = useState("");
  const [employ, setEmploy] = useState(signupData.recruitingStatus || "");
  const [employError, setEmployError] = useState("");
  const [educationLevel, setEducationLevel] = useState(
    signupData.educationLevel || ""
  );
  const [educationError, setEducationError] = useState("");
  const [academic, setAcademic] = useState(signupData.gradeStatus || "");
  const [academicError, setAcademicError] = useState("");

  const [highSectorText, setHighSectorText] = useState<string>("");
  const [lowSectorText, setLowSectorText] = useState<string>("");
  const [lowSectorError, setLowSectorError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalType, setModalType] = useState<
    "region" | "subregion" | "birth" | "academic" | "employment" | null
  >(null);

  const nicknameRef = useRef<HTMLDivElement>(null);
  const birthRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const subRegionRef = useRef<HTMLDivElement>(null);
  const employRef = useRef<HTMLDivElement>(null);
  const lowSectorRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const academicRef = useRef<HTMLDivElement>(null);

  const openModal = (
    type: "region" | "subregion" | "birth" | "academic" | "employment"
  ) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const state = location.state as JobState;

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
    }

    if (state?.high_sector !== undefined && state?.high_sector !== null) {
      setHighSectorText(
        Array.isArray(state.high_sector)
          ? state.high_sector[0] ?? ""
          : state.high_sector
      );
    }
    if (state?.low_sector !== undefined && state?.low_sector !== null) {
      setLowSectorText(
        Array.isArray(state.low_sector)
          ? state.low_sector.join(", ")
          : state.low_sector
      );
    }
  }, [location.state]);

  const TopBarContent = () => (
    <div className="flex ct-center">
      <span className="text-h2 font-Pretendard text-ct-black-100">프로필</span>
    </div>
  );

  const hasSpecial = (s: string) => /[^a-zA-Z0-9가-힣 ]/.test(s || "");

  useEffect(() => {
    if (!nickname) {
      setNicknameError("닉네임을 입력해주세요");
    } else if (hasSpecial(nickname)) {
      setNicknameError("특수문자는 사용이 불가합니다");
    } else {
      setNicknameError("");
    }
  }, [nickname]);

  const validateAndScroll = () => {
    let firstErrorEl: HTMLElement | null = null;

    if (!nickname || hasSpecial(nickname)) {
      setNicknameError(
        !nickname ? "닉네임을 입력해주세요" : "특수문자는 사용이 불가합니다"
      );
      firstErrorEl = firstErrorEl || nicknameRef.current;
    }

    if (!birthDate) {
      setBirthError("생년월일을 입력해주세요");
      firstErrorEl = firstErrorEl || birthRef.current;
    } else {
      setBirthError("");
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

    if (!employ) {
      setEmployError("구인/구직 상태를 선택해주세요");
      firstErrorEl = firstErrorEl || employRef.current;
    } else {
      setEmployError("");
    }

    if (!lowSectorText) {
      setLowSectorError("희망 직무를 선택해주세요");
      firstErrorEl = firstErrorEl || lowSectorRef.current;
    } else {
      setLowSectorError("");
    }

    if (!educationLevel) {
      setEducationError("최종 학력을 입력해주세요");
      firstErrorEl = firstErrorEl || educationRef.current;
    } else {
      setEducationError("");
    }

    if (!academic) {
      setAcademicError("재학/졸업 상태를 입력해주세요");
      firstErrorEl = firstErrorEl || academicRef.current;
    } else {
      setAcademicError("");
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

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="relative pt-[19px] pb-[35px]">
        <div className="absolute top-[0px] right-[22px] flex items-center gap-[6px] z-10">
          <img src="/assets/onboarding/step1.svg" alt="현재 스텝 1" />
          <img src="/assets/onboarding/nonestep.svg" alt="none" />
        </div>

        <div className="w-full max-w-[400px] px-[24px] mx-auto flex flex-col gap-[27px]">
          <div ref={nicknameRef}>
            <PersonalInputField
              label="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              error={nicknameError}
              maxLength={10}
              showCounter
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <PersonalInputField
              label="한줄 소개"
              value={shortIntro}
              onChange={(e) => setShortIntro(e.target.value)}
              multiline
              maxLength={50}
              showCounter
            />
            <span className="text-body1 text-ct-gray-200 ml-[10px]">
              한줄로 나에 대해 나타내보세요!
              <br />
              EX. 저는 워라밸보다 연봉에 더 욕심이 있어요.
            </span>
          </div>

          <div ref={birthRef}>
            <PersonalInputField
              label="나이"
              value={birthDate}
              placeholder="생년월일 입력"
              onClick={() => openModal("birth")}
              error={birthError}
            />
          </div>

          <div ref={regionRef}>
            <PersonalInputField
              label="주 활동 지역"
              value={region}
              placeholder="주 활동지역 입력"
              onClick={() => openModal("region")}
              error={regionError}
            />
          </div>

          <div ref={subRegionRef}>
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
          </div>

          <div ref={employRef}>
            <PersonalInputField
              label="현재 구인/구직 상태를 알려주세요!"
              value={employ}
              placeholder="구인/구직 상태 입력"
              onClick={() => openModal("employment")}
              error={employError}
            />
          </div>

          <div ref={lowSectorRef}>
            <PersonalInputField
              label="희망 직무를 선택해주세요"
              value={lowSectorText}
              placeholder="희망직무 입력"
              onClick={() => {
                updateProfileInfo({
                  name: nickname,
                  oneLineProfile: shortIntro,
                  birthdate: birthDate,
                  recruitingStatus: employ,
                  gradeStatus: academic,
                  educationLevel: educationLevel,
                });

                const state: JobState = {
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
                  high_sector: highSectorText,
                  low_sector: lowSectorText,
                };

                (document.activeElement as HTMLElement | null)?.blur();
                nav("/onboarding/jobpreference", { state });
              }}
              error={lowSectorError}
            />
          </div>

          <div ref={educationRef}>
            <PersonalInputField
              label="최종 학력을 입력해주세요"
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              placeholder="최종학력 입력"
              error={educationError}
            />
          </div>

          <div ref={academicRef}>
            <PersonalInputField
              label="재학/졸업 상태를 입력해주세요"
              value={academic}
              placeholder="재학/졸업 상태 입력"
              onClick={() => openModal("academic")}
              error={academicError}
            />
          </div>
        </div>

        <div className="w-full max-w-[400px] px-[24px] mx-auto mt-[32px]">
          <BottomCTAButton
            text={isSubmitting ? "회원가입 중..." : "첫 카드 등록하러 가기"}
            disabled={isSubmitting}
            onClick={async () => {
              if (!validateAndScroll()) return;
              try {
                setIsSubmitting(true);

                updateProfileInfo({
                  name: nickname,
                  oneLineProfile: shortIntro,
                  birthdate: birthDate,
                  recruitingStatus: employ,
                  gradeStatus: academic,
                  educationLevel: educationLevel,
                  highSector: highSectorText || "",
                  lowSector: lowSectorText || "",
                });

                const signupRequest: SignUpRequest = {
                  email: signupData.email,
                  password: signupData.password,
                  division: "personal",
                  name: nickname,
                  one_line_profile: shortIntro,
                  birth_date: birthDate,
                  high_area: region,
                  low_area: subRegion,
                  recruiting_status: employ,
                  high_sector: highSectorText || "",
                  low_sector: lowSectorText || "",
                  Highest_grade: educationLevel,
                  grade_status: academic,
                };

                const response = await signUp(signupRequest);

                if (response.isSuccess) {
                  updateProfileInfo({ serviceId: response.result.service_id });
                  nextStep();
                  nav("/onboarding/profile-card-register");
                } else {
                  throw new Error(response.message || "회원가입 실패");
                }
              } catch (error) {
                console.error("회원가입 실패:", error);
              } finally {
                setIsSubmitting(false);
              }
            }}
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

export default ProfileRegister;
