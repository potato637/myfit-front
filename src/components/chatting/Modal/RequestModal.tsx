import { useNavigate } from "react-router-dom";
import InformationBox from "../InformationBox";
import { useCoffeeChat } from "../../../contexts/coffeeChatContext";
import { useModal } from "../../../contexts/ui/modalContext";
import { useCoffeeChatModal } from "../../../contexts/CoffeeChatModalContext";
import toISOString, { formatDateWithDay } from "../../../utils/format";
import {
  useGetCoffeeChatPreviewQuery,
  useRequestCoffeeChatMutation,
} from "../../../hooks/chatting/coffeechat";
import { useAuth } from "../../../contexts/AuthContext";
import { useChatting } from "../../../contexts/ChattingContext";
import { useQueryClient } from "@tanstack/react-query";

function RequestModal({ roomId }: { roomId: number }) {
  const nav = useNavigate();
  const qc = useQueryClient();
  const { setIsModalOpen } = useModal();
  const { setRequestStatus } = useCoffeeChatModal();
  const { selectedTitle, selectedDate, selectedTime, selectedPlace } =
    useCoffeeChat();
  const { user } = useAuth();
  const { addMessage, replaceMessage, removeMessage } = useChatting();

  const numericRoomId = Number(roomId);
  if (!numericRoomId || !selectedDate) return null;

  const formattedDate = formatDateWithDay(
    selectedDate.year,
    selectedDate.month,
    selectedDate.date
  );
  const scheduledAt = toISOString(selectedTime, selectedDate);

  const { data } = useGetCoffeeChatPreviewQuery(numericRoomId);

  // ⚠️ v5: isLoading 대신 isPending
  const { mutate: requestCoffeeChat, isPending } =
    useRequestCoffeeChatMutation(numericRoomId);

  const onRequest = () => {
    if (isPending) return;
    const tempId = Date.now();

    // 1) 낙관적 메시지 즉시 표출
    if (user) {
      addMessage({
        id: tempId,
        isTemp: true,
        sender_id: user.id,
        sender_name: user.username ?? user.username,
        detail_message: selectedTitle || "커피챗을 요청했습니다.",
        type: "COFFEECHAT",
        created_at: new Date().toISOString(),
        coffeechat_id: tempId as any,
      } as any);
    }

    // 2) 실제 요청
    requestCoffeeChat(
      {
        title: selectedTitle,
        scheduled_at: scheduledAt,
        place: selectedPlace,
      },
      {
        onSuccess: async (res) => {
          setRequestStatus("PENDING");
          // ⬇️ 니가 올린 타입에 맞춰 result에서 꺼냄
          // CoffeeChatResponse = { message: string; result: { coffeechat_id, sender_id, receiver_id, created_at, name, ... } }
          const r = res.result;

          // 서버가 chat message id를 안 주므로, 우선 tempId 유지 + 확정 처리
          replaceMessage(tempId, {
            id: tempId, // 실제 message_id가 없으므로 임시 id를 확정
            sender_id: r.sender_id,
            sender_name: r.name,
            // 표시 문자열은 서버에서 따로 안 주니 합성
            detail_message: `${r.name}님이 커피챗을 요청했습니다.`,
            created_at: r.created_at,
            type: "COFFEECHAT",
            coffeechat_id: r.coffeechat_id,
            isTemp: false,
          } as any);

          // 최신화(혹시 캐시 잔상 보정)
          await qc.invalidateQueries({
            queryKey: ["chatMessages", numericRoomId],
          });

          setIsModalOpen(false);
          nav(`/chatting/${roomId}`);
        },
        onError: (err) => {
          console.error("커피챗 요청 실패", err);
          removeMessage(tempId);
        },
      }
    );
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
