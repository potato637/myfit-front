import { useEffect, useState } from "react";
import TopBarContainer from "../../components/common/TopBarContainer";
import AcademicStatusModal from "../../components/onboarding/AcademicStatusModal";
import PersonalInputField from "../../components/setting/PersonalInputField";
import { useModal } from "../../contexts/ui/modalContext";
import EmploymentStatusModal from "../../components/onboarding/EmploymentStatusModal";
import BirthModal from "../../components/onboarding/BirthModal";
import RegionModal from "../../components/onboarding/RegionModal";
import SubRegionModal from "../../components/onboarding/SubRegionModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetProfile, usePatchProfile } from "../../hooks/mypageQueries";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

function PersonalProfile() {
  const { openModal } = useModal();
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [shortIntro, setShortIntro] = useState("");
  const [shortIntroError, setShortIntroError] = useState("");
  const [region, setRegion] = useState("");
  const [regionError, setRegionError] = useState("");
  const [subRegion, setSubRegion] = useState("");
  const [subRegionError, setSubRegionError] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthError, setBirthError] = useState("");
  const [employ, setEmploy] = useState("");
  const [employError, setEmployError] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [educationError, setEducationError] = useState("");
  const [highSectorText, setHighSectorText] = useState("");
  const [lowSectorText, setLowSectorText] = useState("");
  const [academic, setAcademic] = useState("");
  const [academicError, setAcademicError] = useState("");
  const handleOpenModal = (
    type: "region" | "subregion" | "birth" | "academic" | "employment"
  ) => {
    if (type === "region") {
      openModal(<RegionModal onConfirm={(val) => setRegion(val)} />);
    } else if (type === "subregion") {
      if (!region) {
        setSubRegionError("먼저 주 활동 지역을 선택해주세요.");
        return;
      }
      setSubRegionError("");
      openModal(
        <SubRegionModal value={region} onConfirm={(val) => setSubRegion(val)} />
      );
    } else if (type === "birth") {
      openModal(<BirthModal onConfirm={(val) => setBirthDate(val)} />);
    } else if (type === "academic") {
      openModal(<AcademicStatusModal onConfirm={(val) => setAcademic(val)} />);
    } else if (type === "employment") {
      openModal(<EmploymentStatusModal onConfirm={(val) => setEmploy(val)} />);
    }
  };

  const nav = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { data: profile } = useGetProfile({
    service_id: user?.id.toString() || "",
  });

  const hasSpecialChars = (s: string) => /[^a-zA-Z0-9가-힣 ]/.test(s || "");

  useEffect(() => {
    setNickname(profile?.result.user.name || "");
    setShortIntro(profile?.result.user.one_line_profile || "");
    setRegion(profile?.result.service.userArea.high_area || "");
    setSubRegion(profile?.result.service.userArea.low_area || "");
    setEmploy(profile?.result.service.recruiting_status || "");
    setEducationLevel(profile?.result.user.Highest_grade || "");
    setAcademic(profile?.result.user.grade_status || "");
    setBirthDate(
      profile?.result.user.birth_date
        ? profile.result.user.birth_date.split("T")[0]
        : ""
    );
    setLowSectorText(profile?.result.service.low_sector || "");
  }, [profile]);

  useEffect(() => {
    const state = location.state as
      | {
          prevData?: any;
          high_sector?: string | null;
          low_sector?: string | null;
        }
      | undefined;

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

    if (
      typeof state?.high_sector === "string" &&
      state.high_sector.trim().length > 0
    ) {
      setHighSectorText(state.high_sector);
    }
    if (
      typeof state?.low_sector === "string" &&
      state.low_sector.trim().length > 0
    ) {
      setLowSectorText(state.low_sector);
    }
  }, [location.state]);

  useEffect(() => {
    if (hasSpecialChars(nickname))
      setNicknameError("특수문자는 사용이 불가합니다");
    else setNicknameError("");
  }, [nickname]);

  const isValid =
    nickname &&
    !nicknameError &&
    shortIntro &&
    region &&
    subRegion &&
    birthDate &&
    employ &&
    educationLevel &&
    academic;

  const { mutate: updateProfile } = usePatchProfile({
    service_id: user?.id.toString() || "",
  });

  const handleSubmit = () => {
    if (hasSpecialChars(nickname)) {
      setNicknameError("특수문자는 사용이 불가합니다");
      toast.error("올바른 입력값을 입력해주세요");
      return;
    }

    if (!nickname) setNicknameError("닉네임을 입력해주세요");
    else setNicknameError("");

    if (!shortIntro) setShortIntroError("한줄 소개를 입력해주세요");
    else setShortIntroError("");

    if (!region) setRegionError("주 활동 지역을 선택해주세요");
    else setRegionError("");

    if (!subRegion) setSubRegionError("세부 활동 지역을 선택해주세요");

    if (!birthDate) setBirthError("생년월일을 입력해주세요");
    else setBirthError("");

    if (!employ) setEmployError("구인/구직 상태를 선택해주세요");
    else setEmployError("");

    if (!educationLevel) setEducationError("최종 학력을 입력해주세요");
    else setEducationError("");

    if (!academic) setAcademicError("재학/졸업 상태를 입력해주세요");
    else setAcademicError("");

    if (!isValid) return;

    updateProfile({
      name: nickname,
      one_line_profile: shortIntro,
      birth_date: birthDate,
      Highest_grade: educationLevel,
      grade_status: academic,
      high_area: region,
      low_area: subRegion,
      recruiting_status: employ,
      low_sector: lowSectorText,
    });
    nav("/mypage");
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
      <div className="pt-[19px] pb-[35px]">
        <div className="w-full max-w-[400px] px-[24px] mx-auto flex flex-col gap-[27px]">
          <PersonalInputField
            label="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            error={nicknameError}
            maxLength={10}
            showCounter={true}
          />
          <div className="flex flex-col gap-[8px]">
            <PersonalInputField
              label="한줄 소개"
              value={shortIntro}
              onChange={(e) => setShortIntro(e.target.value)}
              multiline={true}
              maxLength={50}
              showCounter={true}
              error={shortIntroError}
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
            onClick={() => handleOpenModal("birth")}
            error={birthError}
          />
          <PersonalInputField
            label="주 활동 지역"
            value={region}
            placeholder="주 활동지역 입력"
            onClick={() => handleOpenModal("region")}
            error={regionError}
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
                handleOpenModal("subregion");
              }
            }}
            error={subRegionError}
          />
          <PersonalInputField
            label="현재 구인/구직 상태를 알려주세요!"
            value={employ}
            placeholder="구인/구직 상태 입력"
            onClick={() => handleOpenModal("employment")}
            error={employError}
          />
          <PersonalInputField
            label="희망 직무를 선택해주세요"
            value={lowSectorText}
            placeholder="희망직무 입력"
            onClick={() =>
              nav("/mypage/setting/job-select", {
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
                  high_sector: highSectorText,
                  low_sector: lowSectorText,
                },
              })
            }
          />
          <PersonalInputField
            label="최종 학력을 입력해주세요"
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            placeholder="최종학력 입력"
            error={educationError}
          />
          <PersonalInputField
            label="재학/졸업 상태를 입력해주세요"
            value={academic}
            placeholder="재학/졸업 상태 입력"
            onClick={() => handleOpenModal("academic")}
            error={academicError}
          />
        </div>
      </div>
    </TopBarContainer>
  );
}
export default PersonalProfile;
