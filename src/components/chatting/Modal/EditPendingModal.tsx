import { useNavigate } from "react-router-dom";
import InformationBox from "../InformationBox";
import { CoffeeChatDetailResponse } from "../../../apis/chatting/coffeechat";
import { FormattedDate, FormattedTime } from "../../../utils/format";
import { useState } from "react";
import { useModal } from "../../../contexts/ui/modalContext";
import CancelModal from "./CancelModal";
import { useChatting } from "../../../contexts/ChattingContext";
import { useCoffeeChatModal } from "../../../contexts/CoffeeChatModalContext";

interface Props {
  data: CoffeeChatDetailResponse["result"];
}

function EditPendingModal({ data }: Props) {
  const { roomId } = useChatting();
  const { setEditMode } = useCoffeeChatModal();
  const nav = useNavigate();
  const numericRoomId = Number(roomId);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { setIsModalOpen } = useModal();

  const formattedDate = FormattedDate(data.scheduled_at);
  const formattedTime = FormattedTime(data.scheduled_at);

  const handleEdit = () => {
    nav(`/chatting/coffeechatrequest/${roomId}`, {
      state: {
        coffeechatId: data.coffeechat_id,
      },
      replace: true,
    });
    setEditMode(true);
    setIsModalOpen(false);
  };

  if (showCancelModal) {
    return (
      <CancelModal
        coffeechat_id={data.coffeechat_id}
        roomId={numericRoomId}
        onClose={() => setShowCancelModal(false)}
      />
    );
  }

  return (
    <div className="w-full h-[498px] rounded-[15px] bg-ct-white flex flex-col ct-center">
      <img
        src="/assets/chatting/coffechatlogo.svg"
        alt="커피챗 로고"
        className="w-[80.53px] h-[80.53px]"
      />
      <span className="text-h2 text-ct-black-200 mt-[4.24px]">
        {data.title}
      </span>
      <div className="mt-[21px] flex">
        <img
          src={data.sender.profile_img}
          alt="보낸이 프로필"
          className="w-[61px] h-[61px] rounded-full"
        />
        <img
          src={data.receiver.profile_img}
          alt="받은이 프로필"
          className="w-[61px] h-[61px] rounded-full"
        />
      </div>
      <div className="mt-[25px] relative">
        <InformationBox
          date={formattedDate}
          time={formattedTime}
          place={data.place}
        />
        <img
          src="/assets/chatting/check.svg"
          alt="체크아이콘"
          className="absolute top-[10px] right-[10px]"
        />
      </div>
      <button
        className="mt-[26px] w-[168px] h-[42px] rounded-[100px] border border-ct-main-blue-200 text-sub1 bg-ct-main-blue-200 text-ct-white"
        onClick={handleEdit}
      >
        변경 하기
      </button>
      <button
        className="mt-[20px] w-[70px] h-[23px] border-b border-ct-gray-300 text-sub1 text-ct-gray-300"
        onClick={() => setShowCancelModal(true)}
      >
        취소하기
      </button>
    </div>
  );
}

export default EditPendingModal;
