import { useState } from "react";
import BottomCTAButton from "../../components/common/BottomCTAButton";
import ImageUploadBox from "../../components/common/ImageUploadBox";
import TopBarContainer from "../../components/common/TopBarContainer";
import InputField from "../../components/recruiting/InputField";
import { useModal } from "../../contexts/ui/modalContext";
import Modal from "../../components/ui/Modal";
import SalaryModal from "../../components/recruiting/SalaryModal";
import CalendarModal from "../../components/recruiting/CalandarModal";
import { useCoffeeChat } from "../../contexts/coffeeChatContext";
import { useNavigate } from "react-router-dom";

interface RegisterAnnouncementProps {
  data: [
    title: string,
    job: string,
    location: string,
    require: string,
    salary: string,
    work_type: string,
    deadline: string,
    recruiting_img: string
  ];
}

function RegisterAnnouncement() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [require, setRequire] = useState("");
  const [salary, setSalary] = useState("");
  const [workType, setWorkType] = useState("");
  const [modalType, setModalType] = useState("");
  const { isModalOpen, setIsModalOpen } = useModal();
  const { selectedDate } = useCoffeeChat();
  const formatedDate = selectedDate
    ? `${selectedDate.year}-${selectedDate.month}-${selectedDate.date}`
    : "";
  const TopBarContent = () => {
    return (
      <span className="text-h2 font-Pretendard text-ct-black-300">
        공고 등록
      </span>
    );
  };
  const openModal = (type: "salary" | "calendar") => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const nav = useNavigate();
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
          placeholder="입력해주세요"
          onClick={() => nav("/recruit/search")}
        />
        <InputField
          label="근무 지역"
          placeholder="입력해주세요"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <InputField
          label="지원 조건"
          placeholder="입력해주세요"
          value={require}
          onChange={(e) => setRequire(e.target.value)}
        />
        <InputField
          label="급여"
          placeholder="입력해주세요"
          value={salary}
          onClick={() => openModal("salary")}
        />
        <InputField
          label="근무 형태"
          placeholder="선택"
          value={workType}
          onChange={(e) => setWorkType(e.target.value)}
        />
        <InputField
          label="마감 일자"
          value={formatedDate}
          placeholder="입력해주세요"
          onClick={() => openModal("calendar")}
        />
        <div className="flex flex-col gap-[13.15px] mt-[25px]">
          <span className="pl-[7px] text-sub1 text-ct-black-200 font-Pretendard">
            공고사진 첨부
          </span>
          <ImageUploadBox
            className="w-[349px] h-[384px] rounded-[16px] bg-ct-gray-100"
            textClassName="text-body2 font-Pretendard text-ct-gray-300"
          />
        </div>
        <span className="mt-[25px] mb-[23.29px] text-body1 text-ct-gray-300 ">
          등록된 공고는 ‘마이페이지’, ‘공고 관리’ 탭에서 확인 가능합니다.
        </span>
        <div className="flex justify-center mb-[42px]">
          <BottomCTAButton text="공고 등록하기" />
        </div>
      </div>
      <Modal>
        {isModalOpen && modalType === "salary" && (
          <SalaryModal onConfirm={(val) => setSalary(val)} />
        )}
        {isModalOpen && modalType === "calendar" && <CalendarModal />}
      </Modal>
    </TopBarContainer>
  );
}
export default RegisterAnnouncement;
