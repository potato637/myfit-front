import { useEffect, useState } from "react";
import BottomCTAButton from "../../components/common/BottomCTAButton";
import ImageUploadBox from "../../components/common/ImageUploadBox";
import TopBarContainer from "../../components/common/TopBarContainer";
import InputField from "../../components/recruiting/InputField";
import { useModal } from "../../contexts/ui/modalContext";
import SalaryModal from "../../components/recruiting/SalaryModal";
import CalendarModal from "../../components/recruiting/CalandarModal";
import { useCoffeeChat } from "../../contexts/coffeeChatContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useRegisterRecruitPost } from "../../hooks/recruiting/recruiting";
import WorkTypeModal from "../../components/recruiting/WorkTypeModal";

function RegisterAnnouncement() {
  const { state } = useLocation();
  const { setSelectedDate } = useCoffeeChat();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { selectedDate } = useCoffeeChat();

  const [title, setTitle] = useState("");
  const [area, setArea] = useState("");
  const [require, setRequire] = useState("");
  const [salary, setSalary] = useState("");
  const [workType, setWorkType] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [highSector, setHighSector] = useState<string[]>([]);
  const [lowSector, setLowSector] = useState<string[]>([]);

  const { mutate: registerPost, isPending } = useRegisterRecruitPost();

  const formattedDate = selectedDate
    ? `${selectedDate.year}-${selectedDate.month}-${selectedDate.date}`
    : "";

  useEffect(() => {
    if (!state) return;
    if (state.prevData) {
      const d = state.prevData;
      setTitle(d.title ?? "");
      setArea(d.location ?? "");
      setRequire(d.require ?? "");
      setSalary(d.salary ?? "");
      setWorkType(d.workType ?? "");
      setImageUrl(d.recruiting_img ?? "");
    }
    if (state.high_sector) setHighSector(state.high_sector);
    if (state.low_sector) setLowSector(state.low_sector);
  }, [state]);

  const selectedSkillLabel = lowSector.join(", ");

  useEffect(() => {
    if (!state) {
      setSelectedDate(null);
    }
  }, [state, setSelectedDate]);

  const handleSubmit = () => {
    if (!imageUrl) {
      alert("이미지를 선택해주세요.");
      return;
    }
    registerPost(
      {
        title,
        high_sector: highSector,
        low_sector: lowSector,
        area,
        require,
        salary,
        work_type: workType,
        dead_line: formattedDate,
        recruiting_img: imageUrl,
      },
      {
        onSuccess: () => {
          const hs = highSector?.[0] ?? "";
          const ls = lowSector?.[0];

          const params = new URLSearchParams();
          if (hs) params.set("highSector", hs);
          if (ls) params.set("lowSector", ls);
          params.set("page", "1");

          navigate(`/recruiting?${params.toString()}`, { replace: true });
        },
      }
    );
  };

  const handleOpenModal = (type: "salary" | "calendar" | "worktype") => {
    if (type === "salary") {
      openModal(<SalaryModal onConfirm={(val) => setSalary(val)} />);
    } else if (type === "worktype") {
      openModal(<WorkTypeModal onConfirm={(val) => setWorkType(val)} />);
    } else if (type === "calendar") {
      openModal(<CalendarModal />);
    }
  };

  const TopBarContent = () => (
    <span className="text-h2 font-Pretendard text-ct-black-300">공고 등록</span>
  );

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="flex flex-col pt-[24px] mx-[19px]">
        <InputField
          label="공고 제목"
          placeholder="입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputField
          label="구인 직무"
          placeholder="선택해주세요"
          value={selectedSkillLabel}
          onClick={() =>
            navigate("/recruiting/jobpreference", {
              state: {
                from: "recruit",
                prevData: {
                  title,
                  location: area,
                  require,
                  salary,
                  workType,
                  deadline: formattedDate,
                  recruiting_img: imageUrl,
                },
                high_sector: highSector,
                low_sector: lowSector,
              },
            })
          }
        />
        <InputField
          label="근무 지역"
          placeholder="입력해주세요"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <InputField
          label="지원 조건"
          placeholder="입력해주세요"
          value={require}
          onChange={(e) => setRequire(e.target.value)}
        />
        <InputField
          label="급여"
          placeholder="선택"
          value={salary}
          onClick={() => handleOpenModal("salary")}
        />
        <InputField
          label="근무 형태"
          placeholder="입력해주세요"
          value={workType}
          onClick={() => handleOpenModal("worktype")}
        />
        <InputField
          label="마감 일자"
          placeholder="선택"
          value={formattedDate}
          onClick={() => handleOpenModal("calendar")}
        />
        <div className="flex flex-col gap-[13.15px] mt-[25px]">
          <span className="pl-[7px] text-sub1 text-ct-black-200">
            공고사진 첨부
          </span>
          <ImageUploadBox
            className="w-[349px] h-[384px] rounded-[16px] bg-ct-gray-100"
            textClassName="text-body2 text-ct-gray-300"
            initialPreview={imageUrl}
            onUploadSuccess={(url) => setImageUrl(url)}
            S3Folder="recruit"
          />
        </div>
        <span className="mt-[25px] mb-[23.29px] text-body1 text-ct-gray-300">
          등록된 공고는 ‘마이페이지’, ‘공고 관리’ 탭에서 확인 가능합니다.
        </span>
        <div className="flex justify-center mb-[42px]">
          <BottomCTAButton
            text={isPending ? "등록 중..." : "공고 등록하기"}
            disabled={isPending}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </TopBarContainer>
  );
}

export default RegisterAnnouncement;
