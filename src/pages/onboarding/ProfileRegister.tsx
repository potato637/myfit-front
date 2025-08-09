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
import BottomCTAButton from "../../components/common/BottomCTAButton";
import { useSignup } from "../../contexts/SignupContext";
import { signUp } from "../../apis/onboarding";
import { SignUpRequest } from "../../types/onboarding/signup";

function ProfileRegister() {
  const { isModalOpen, setIsModalOpen } = useModal();
  const { signupData, updateProfileInfo, nextStep } = useSignup();

  // 로컬 상태는 SignupContext의 데이터로 초기화
  const [nickname, setNickname] = useState(signupData.name || "");
  const [shortIntro, setShortIntro] = useState(signupData.oneLineProfile || "");
  const [region, setRegion] = useState("");
  const [subRegion, setSubRegion] = useState("");
  const [subRegionError, setSubRegionError] = useState("");
  const [birthDate, setBirthDate] = useState(signupData.birthdate || "");
  const [employ, setEmploy] = useState(signupData.recruitingStatus || "");
  const [educationLevel, setEducationLevel] = useState(signupData.educationLevel || "");
  const [highSector, setHighSector] = useState<string[]>([]);
  const [lowSector, setLowSector] = useState<string[]>([]);
  const [academic, setAcademic] = useState(signupData.gradeStatus || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      </div>
    );
  };
  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="relative pt-[19px] pb-[35px]">
        {/* ✅ 스텝 인디케이터 */}
        <div className="absolute top-[0px] right-[22px] flex items-center gap-[6px] z-10">
          <img src="/assets/onboarding/step1.svg" alt="현재 스텝 1" />
          <img src="/assets/onboarding/nonestep.svg" alt="none" />
        </div>{" "}
        <div className="w-full max-w-[400px] px-[24px] mx-auto flex flex-col gap-[27px]">
          <PersonalInputField
            label="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />{" "}
          <div className="flex flex-col gap-[8px]">
            <PersonalInputField
              label="한줄 소개"
              value={shortIntro}
              onChange={(e) => setShortIntro(e.target.value)}
              multiline={true}
              maxLength={50}
              showCounter={true}
            />{" "}
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
            onClick={() => {
              // Context에 현재 상태 먼저 저장
              updateProfileInfo({
                name: nickname,
                oneLineProfile: shortIntro,
                birthdate: birthDate,
                recruitingStatus: employ,
                gradeStatus: academic,
                educationLevel: educationLevel,
              });
              
              nav("/onboarding/jobpreference", {
                state: {
                  from: "onboarding",
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
              });
            }}
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
        <div className="w-full max-w-[400px] px-[24px] mx-auto mt-[32px]">
          <BottomCTAButton
            text={isSubmitting ? "회원가입 중..." : "첫 카드 등록하러 가기"}
            disabled={isSubmitting}
            onClick={async () => {
              try {
                setIsSubmitting(true);

                // SignupContext에 프로필 정보 저장
                updateProfileInfo({
                  name: nickname,
                  oneLineProfile: shortIntro,
                  birthdate: birthDate,
                  recruitingStatus: employ,
                  gradeStatus: academic,
                  educationLevel: educationLevel,
                  highSector: highSector.join(", ") || "",
                  lowSector: lowSector.join(", ") || "",
                });

                // 회원가입 API 호출
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
                  high_sector: highSector[0] || "",
                  low_sector: lowSector.join(", ") || "",
                  Highest_grade: educationLevel,
                  grade_status: academic,
                };

                console.log(
                  "👤 [ProfileRegister] 개인 회원가입 요청:",
                  signupRequest
                );
                const response = await signUp(signupRequest);

                if (response.isSuccess) {
                  console.log(
                    "✅ [ProfileRegister] 개인 회원가입 성공:",
                    response
                  );

                  // service_id를 SignupContext에 저장
                  updateProfileInfo({
                    serviceId: response.result.service_id,
                  });

                  nextStep();
                  nav("/onboarding/profile-card-register");
                } else {
                  throw new Error(response.message || "회원가입 실패");
                }
              } catch (error) {
                console.error("회원가입 실패:", error);
                // 에러 처리 - 사용자에게 알림
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
