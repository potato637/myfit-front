import { useNavigate } from "react-router-dom";
import { useCoffeeChatModal } from "../../../contexts/CoffeeChatModalContext";
import InformationBox from "../InformationBox";
import { useModal } from "../../../contexts/ui/modalContext";
import { formatDateWithDay } from "../../../utils/format";
import { CoffeeChatDetailResponse } from "../../../apis/chatting/coffeechat";
import { useChatting } from "../../../contexts/ChattingContext";

interface Props {
  data: CoffeeChatDetailResponse["result"];
}

function PendingModal({ data }: Props) {
  const { setEditMode } = useCoffeeChatModal();
  const { setIsModalOpen } = useModal();
  const { roomId } = useChatting();
  const nav = useNavigate();

  const formattedDate = formatDateWithDay(
    new Date(data.scheduled_at).getFullYear(),
    new Date(data.scheduled_at).getMonth() + 1,
    new Date(data.scheduled_at).getDate()
  );
  const formattedTime = new Date(data.scheduled_at).toLocaleTimeString(
    "ko-KR",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

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
        <img src={data.sender.profile_img} alt="보낸이" />
        <img src={data.receiver.profile_img} alt="받는이" />
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
      <button className="mt-[26px] w-[168px] h-[42px] rounded-[100px] border border-ct-main-blue-200 text-sub1 bg-ct-white text-ct-black-200">
        수락 대기중
      </button>
      <button
        className="mt-[20px] w-[70px] h-[23px] border-b border-ct-gray-300 text-sub1 text-ct-gray-300"
        onClick={() => {
          setEditMode(true);
          nav("/chatting/coffeechatrequest/:roomId");
          setIsModalOpen(false);
        }}
      >
        변경 하기
      </button>
    </div>
  );
}

export default PendingModal;
