import { useNavigate } from "react-router-dom";
import InformationBox from "../InformationBox";
import { useCoffeeChat } from "../../../contexts/coffeeChatContext";
import { useModal } from "../../../contexts/ui/modalContext";
import { useCoffeeChatModal } from "../../../contexts/CoffeeChatModalContext";

function RequestModal() {
  const nav = useNavigate();
  const { setIsModalOpen } = useModal();
  const { selectedTitle, selectedDate, selectedTime, selectedPlace } =
    useCoffeeChat();
  const { setRequestStatus } = useCoffeeChatModal();
  const getDayOfWeek = (year: number, month: number, day: number): string => {
    const date = new Date(year, month - 1, day); // month는 0-based
    const dayIndex = date.getDay(); // 0~6: 일~토
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days[dayIndex];
  };
  const formatedDate = `${selectedDate?.year}.${selectedDate?.month}.${
    selectedDate?.date
  } ${getDayOfWeek(
    selectedDate!.year,
    selectedDate!.month,
    selectedDate!.date
  )}`;

  return (
    <div className="w-full h-[498px] rounded-[15px] bg-ct-white flex flex-col items-center">
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
      <div className="mt-[25px]">
        <InformationBox
          date={formatedDate}
          time={selectedTime}
          place={selectedPlace}
        />
      </div>
      <button
        className="mt-[26px] w-[168px] h-[42px] rounded-[100px] border border-ct-main-blue-200 text-sub1 bg-ct-white text-ct-black-200"
        onClick={() => {
          setRequestStatus("requested");
          nav("/chatting");
          setIsModalOpen(false);
        }}
      >
        요청하기
      </button>
      <button
        className="mt-[20px] w-[70px] h-[23px] border-b border-ct-gray-300 text-sub1 text-ct-gray-300"
        onClick={() => setIsModalOpen(false)}
      >
        수정하기
      </button>
    </div>
  );
}
export default RequestModal;
