import { useCoffeeChatModal } from "../../../contexts/CoffeeChatModalContext";
import { useModal } from "../../../contexts/ui/modalContext";
import { useCancelCoffeeChatMutation } from "../../../hooks/chatting/coffeechat";

interface CancelModalProps {
  onClose?: () => void;
  coffeechat_id: number;
  roomId: number;
}

function CancelModal({ onClose, coffeechat_id, roomId }: CancelModalProps) {
  const numericRoomId = Number(roomId);
  const { closeModal } = useModal();
  const { setRequestStatus } = useCoffeeChatModal();
  const { mutate: cancelChat } = useCancelCoffeeChatMutation(numericRoomId);
  const handleCancel = () => {
    cancelChat(coffeechat_id, {
      onSuccess: () => {
        if (onClose) onClose();
        setRequestStatus("CANCELED");
        closeModal();
      },
      onError: (error) => {
        console.error("커피챗 취소 실패", error);
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
        정말 취소하시겠어요?
      </span>
      <span className="text-[15px] font-[400] text-ct-gray-300">
        취소한 커피챗은 되돌릴 수 없습니다.
      </span>
      <div className="flex gap-[12px] mt-[30px]">
        <button
          className="w-[142px] h-[42px] rounded-[100px] bg-ct-gray-200 text-ct-white text-sub2"
          onClick={() => {
            closeModal();
          }}
        >
          안 할래요
        </button>
        <button
          className="w-[142px] h-[42px] rounded-[100px] bg-ct-main-blue-200 text-ct-white text-sub2"
          onClick={handleCancel}
        >
          취소 할래요
        </button>
      </div>
    </div>
  );
}

export default CancelModal;
