import { useNavigate, useParams } from "react-router-dom";
import InformationBox from "../InformationBox";
import { useCoffeeChat } from "../../../contexts/coffeeChatContext";
import { useModal } from "../../../contexts/ui/modalContext";
import { useCoffeeChatModal } from "../../../contexts/CoffeeChatModalContext";
import { useChatting } from "../../../contexts/ChattingContext";
import { formatDateWithDay } from "../../../utils/format";
import {
  useGetCoffeeChatPreviewQuery,
  useRequestCoffeeChatMutation,
} from "../../../hooks/chatting/coffeechat";

function RequestModal({ roomId }: { roomId: number }) {
  const nav = useNavigate();
  const { setIsModalOpen } = useModal();
  const { addMessage } = useChatting();
  const { selectedTitle, selectedDate, selectedTime, selectedPlace } =
    useCoffeeChat();
  const { setRequestStatus } = useCoffeeChatModal();
  const numericRoomId = Number(roomId);

  const formattedDate = selectedDate
    ? formatDateWithDay(
        selectedDate.year,
        selectedDate.month,
        selectedDate.date
      )
    : "";

  const { data } = useGetCoffeeChatPreviewQuery(numericRoomId);

  if (!numericRoomId) return null;
  const { mutate: CoffeeChatInformation } =
    useRequestCoffeeChatMutation(numericRoomId);

  function toISOString(
    timeStr: string,
    dateObj: { year: number; month: number; date: number }
  ): string {
    const [period, time] = timeStr.split(" ");
    let [hour, minute] = time.split(":").map(Number);

    if (period === "PM" && hour < 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    const date = new Date(
      dateObj.year,
      dateObj.month - 1,
      dateObj.date,
      hour,
      minute,
      0
    );

    return date.toISOString();
  }
  if (!selectedDate) return;
  const scheduledAt = toISOString(selectedTime, selectedDate);
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
          CoffeeChatInformation(
            {
              receiver_id: 2,
              title: selectedTitle,
              scheduled_at: scheduledAt,
              place: selectedPlace,
            },
            {
              onSuccess: (res) => {
                setRequestStatus("requested");
                addMessage({
                  id: res.result.coffeechat_id,
                  sender_name: res.result.name,
                  sender_id: res.result.sender_id,
                  type: "COFFEECHAT",
                  detail_message: "",
                  created_at: res.result.created_at,
                });
                nav(`/chatting/${roomId}`);
                setIsModalOpen(false);
              },
              onError: (err) => {
                console.error("커피챗 요청 실패", err);
              },
            }
          );
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
