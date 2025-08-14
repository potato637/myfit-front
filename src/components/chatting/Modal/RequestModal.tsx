import { useNavigate } from "react-router-dom";
import InformationBox from "../InformationBox";
import { useCoffeeChat } from "../../../contexts/coffeeChatContext";
import { useModal } from "../../../contexts/ui/modalContext";
import toISOString, { formatDateWithDay } from "../../../utils/format";
import {
  useGetCoffeeChatPreviewQuery,
  useRequestCoffeeChatMutation,
} from "../../../hooks/chatting/coffeechat";

function RequestModal({ roomId }: { roomId: number }) {
  const nav = useNavigate();
  const { closeModal } = useModal();
  const { selectedTitle, selectedDate, selectedTime, selectedPlace } =
    useCoffeeChat();

  const numericRoomId = Number(roomId);
  if (!numericRoomId || !selectedDate) return null;

  const formattedDate = formatDateWithDay(
    selectedDate.year,
    selectedDate.month,
    selectedDate.date
  );
  const scheduledAt = toISOString(selectedTime, selectedDate);

  const { data } = useGetCoffeeChatPreviewQuery(numericRoomId);
  const { mutateAsync: requestCoffeeChat, isPending } =
    useRequestCoffeeChatMutation(numericRoomId);

  const onRequest = async () => {
    if (isPending) return;
    try {
      await requestCoffeeChat({
        title: selectedTitle,
        scheduled_at: scheduledAt,
        place: selectedPlace,
      });
      closeModal();
      nav(`/chatting/${roomId}`);
    } catch (err) {
      console.error("커피챗 요청 실패", err);
    }
  };

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
        <img
          src={data?.result.participants[0]?.profile_img}
          alt="senderprofile"
          className="w-[61px] h-[61px] rounded-full"
        />
        <img
          src={data?.result.participants[1]?.profile_img}
          alt="receiverprofile"
          className="w-[61px] h-[61px] rounded-full"
        />
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

      <button
        className="mt-[26px] w-[168px] h-[42px] rounded-[100px] border border-ct-main-blue-200 text-sub1 bg-ct-white text-ct-black-200"
        onClick={onRequest}
        disabled={isPending}
      >
        요청하기
      </button>

      <button
        className="mt-[20px] w-[70px] h-[23px] border-b border-ct-gray-300 text-sub1 text-ct-gray-300"
        onClick={closeModal}
      >
        수정하기
      </button>
    </div>
  );
}

export default RequestModal;
