import { useNavigate } from "react-router-dom";
import InformationBox from "../InformationBox";
import { useCoffeeChat } from "../../../contexts/coffeeChatContext";
import { useModal } from "../../../contexts/ui/modalContext";
import { useCoffeeChatModal } from "../../../contexts/CoffeeChatModalContext";
import { useChatting } from "../../../contexts/ChattingContext";
import { formatDateWithDay } from "../../../utils/format";

function RequestModal() {
  const nav = useNavigate();
  const { setIsModalOpen } = useModal();
  const { addMessage } = useChatting();
  const { selectedTitle, selectedDate, selectedTime, selectedPlace } =
    useCoffeeChat();
  const { setRequestStatus } = useCoffeeChatModal();

  const formattedDate = selectedDate
    ? formatDateWithDay(
        selectedDate.year,
        selectedDate.month,
        selectedDate.date
      )
    : "";

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
      <div className="mt-[25px]">
        <InformationBox
          date={formattedDate}
          time={selectedTime}
          place={selectedPlace}
        />
      </div>
      <button
        className="mt-[26px] w-[168px] h-[42px] rounded-[100px] border border-ct-main-blue-200 text-sub1 bg-ct-white text-ct-black-200"
        onClick={() => {
          setRequestStatus("requested");
          addMessage({
            id: Date.now(),
            text: "",
            sender: "me",
            type: "coffeechat",
            status: "requested",
          });
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
