import { useNavigate } from "react-router-dom";
import { useCoffeeChatModal } from "../../../contexts/CoffeeChatModalContext";
import InformationBox from "../InformationBox";
import { useModal } from "../../../contexts/ui/modalContext";
import { useCoffeeChat } from "../../../contexts/coffeeChatContext";
import { formatDateWithDay } from "../../../utils/format";

function PendingModal() {
  const { setEditMode } = useCoffeeChatModal();
  const { setIsModalOpen } = useModal();
  const { selectedTitle, selectedDate, selectedTime, selectedPlace } =
    useCoffeeChat();

  const formattedDate = selectedDate
    ? formatDateWithDay(
        selectedDate.year,
        selectedDate.month,
        selectedDate.date
      )
    : "";
  const nav = useNavigate();
  return (
    <div className="w-full h-[498px] rounded-[15px] bg-ct-white flex flex-col ct-center">
      <img
        src="/assets/chatting/coffechatlogo.svg"
        alt="커피챗 로고"
        className="w-[80.53px] h-[80.53px]"
      />
      <span className="text-h2 text-ct-black-200 mt-[4.24px]">
        {selectedTitle}
      </span>
      <div className="mt-[21px] flex">
        <img src="/assets/chatting/manprofile.svg" alt="남성프로필" />
        <img src="/assets/chatting/womanprofile.svg" alt="여성프로필" />
      </div>
      <div className="mt-[25px] relative">
        <InformationBox
          date={formattedDate}
          time={selectedTime}
          place={selectedPlace}
        />
        <img
          src="/assets/chatting/disablecheck.svg"
          alt="비활성 체크"
          className="absolute top-[10px] right-[10px]"
        />
      </div>
      <button className="mt-[26px] w-[168px] h-[42px] rounded-[100px] border border-ct-main-blue-200 text-sub1 bg-ct-white text-ct-black-200">
        수락 대기중
      </button>
      <button
        className="mt-[20px] w-[70px] h-[23px] border-b border-ct-gray-300 text-sub1 text-ct-gray-300"
        onClick={() => {
          setEditMode(true);
          nav("/coffeechat/request");
          setIsModalOpen(false);
        }}
      >
        변경 하기
      </button>
    </div>
  );
}
export default PendingModal;
