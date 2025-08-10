import { CoffeeChatDetailResponse } from "../../../apis/chatting/coffeechat";
import { useChatting } from "../../../contexts/ChattingContext";
import { useCoffeeChatModal } from "../../../contexts/CoffeeChatModalContext";
import { useModal } from "../../../contexts/ui/modalContext";
import { useRejectCoffeeChatMutation } from "../../../hooks/chatting/coffeechat";

interface RejectModalProps {
  onClose?: () => void;
  data: CoffeeChatDetailResponse["result"];
}

function RejectConfirmModal({ data }: RejectModalProps) {
  const { roomId } = useChatting();
  const numericRoomId = Number(roomId);
  const { setIsModalOpen } = useModal();
  const { setRequestStatus } = useCoffeeChatModal();
  const { mutate: rejectChat } = useRejectCoffeeChatMutation(numericRoomId);
  const handleReject = () => {
    rejectChat(data.coffeechat_id, {
      onSuccess: () => {
        setRequestStatus("REJECTED");
        setIsModalOpen(false);
      },
      onError: (error) => {
        console.error("커피챗 거절 실패", error);
      },
    });
  };
  return (
    <div className="flex flex-col ct-center mt-[55px] mb-[26px]">
      <img
        src="/assets/chatting/bluecalender.svg"
        alt="캘린더 아이콘"
        className="w-[33px] h-[34px]"
      />
      <span className="mt-[4px] text-sub2 text-ct-black-100">
        정말 거절하시겠어요?
      </span>
      <span className="text-[15px] font-[400] text-ct-gray-300">
        거절된 커피챗은 되돌릴 수 없습니다.
      </span>
      <div className="flex gap-[12px] mt-[30px]">
        <button
          className="w-[142px] h-[42px] rounded-[100px] bg-ct-gray-200 text-ct-white text-sub2"
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          안 할래요
        </button>
        <button
          className="w-[142px] h-[42px] rounded-[100px] bg-ct-main-blue-200 text-ct-white text-sub2"
          onClick={handleReject}
        >
          거절 할래요
        </button>
      </div>
    </div>
  );
}

export default RejectConfirmModal;
