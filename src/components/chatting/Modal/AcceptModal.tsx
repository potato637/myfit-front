import { useNavigate, useParams } from "react-router-dom";
import InformationBox from "../InformationBox";
import { CoffeeChatDetailResponse } from "../../../apis/chatting/coffeechat";
import { FormattedDate, FormattedTime } from "../../../utils/format";
import { useAcceptCoffeeChatMutation } from "../../../hooks/chatting/coffeechat";
import CancelModal from "./CancelModal";
import { useState } from "react";
import { useModal } from "../../../contexts/ui/modalContext";

interface Props {
  data: CoffeeChatDetailResponse["result"];
}

function AcceptModal({ data }: Props) {
  const { chattingRoomId } = useParams();
  const nav = useNavigate();
  const numericRoomId = Number(chattingRoomId);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { setIsModalOpen } = useModal();

  const { mutate: acceptChat } = useAcceptCoffeeChatMutation(numericRoomId);

  const formattedDate = FormattedDate(data.scheduled_at);
  const formattedTime = FormattedTime(data.scheduled_at);

  const handleAccept = () => {
    acceptChat(data.coffeechat_id, {
      onSuccess: () => {
        nav(`/chatting/${chattingRoomId}`);
        setIsModalOpen(false);
      },
      onError: (error) => {
        console.log("커피챗아이디", data.coffeechat_id);
        console.error("커피챗 수락 실패", error);
      },
    });
  };

  if (showCancelModal) {
    return (
      <CancelModal onClose={() => setShowCancelModal(false)} data={data} />
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
          alt="보낸 사람 프로필"
          className="w-[61px] h-[61px] rounded-full"
        />
        <img
          src={data.receiver.profile_img}
          alt="받는 사람 프로필"
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
          src="/assets/chatting/disablecheck.svg"
          alt="비활성 체크"
          className="absolute top-[10px] right-[10px]"
        />
      </div>
      <button
        className="mt-[26px] w-[168px] h-[42px] rounded-[100px] border border-ct-main-blue-200 text-sub1 bg-ct-main-blue-200 text-ct-white"
        onClick={handleAccept}
      >
        수락 하기
      </button>
      <button
        className="mt-[20px] w-[70px] h-[23px] border-b border-ct-gray-300 text-sub1 text-ct-gray-300"
        onClick={() => setShowCancelModal(true)}
      >
        거절 하기
      </button>
    </div>
  );
}

export default AcceptModal;
