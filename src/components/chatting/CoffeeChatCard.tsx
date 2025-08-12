import { useNavigate } from "react-router-dom";
import { useModal } from "../../contexts/ui/modalContext";
import Modal from "../ui/Modal";
import CancelModal from "./Modal/CancelModal";
import { useCoffeeChatModal } from "../../contexts/CoffeeChatModalContext";
import { divisionType } from "../../apis/chatting/chatting";

export interface CoffeeChatData {
  coffeechat_id: number;
  chatting_room_id: number;
  opponent: {
    name: string;
    age: number;
    job: string;
    profile_img: string;
    division: divisionType;
  };
  scheduled_at: string; // e.g., "2025-05-21T15:30:00Z"
  place: string;
}

interface CoffeeChatCardProps {
  data: CoffeeChatData;
}

function CoffeeChatCard({ data }: CoffeeChatCardProps) {
  const { setIsModalOpen } = useModal();
  const { setEditMode } = useCoffeeChatModal();
  const nav = useNavigate();

  const formatDateTime = (iso: string) => {
    const date = new Date(iso);
    const now = new Date();
    const daysLeft = Math.ceil(
      (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    const hours = date.getHours();
    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;

    const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")} ${
      ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
    } ${period} ${hour12}:${date.getMinutes().toString().padStart(2, "0")}`;

    return { daysLeft: `${daysLeft}일 뒤`, formattedDate };
  };

  const { daysLeft, formattedDate } = formatDateTime(data.scheduled_at);

  return (
    <div className="w-full rounded-[7.53px] flex flex-col bg-ct-white border border-[#E2E2E2] pl-[9px] py-[24px]">
      <div
        className="flex gap-[13px] pl-[7px] "
        onClick={() => nav(`/chatting/${data.chatting_room_id}`)}
      >
        <img
          src={data.opponent.profile_img}
          alt="프로필 이미지"
          className="w-[49px] h-[49px] rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-[14px] font-[400] text-ct-black-300 opacity-[50%]">
            {daysLeft}
          </span>
          <span className="text-[15px] font-[400] text-ct-main-blue-200">
            {formattedDate}
          </span>
          <span className="flex gap-[4px]">
            <span className="text-[16px] font-[700] text-ct-black-300">
              {data.opponent.name}
              {data.opponent.division === "personal" && `/${data.opponent.age}`}
            </span>
            <span className="text-[16px] font-[400] text-ct-black-300">
              {data.opponent.job}
            </span>
          </span>
        </div>
      </div>
      <div className="mt-[18px] flex">
        <img src="/assets/chatting/placeicon.svg" alt="위치 아이콘" />
        <span className="text-[15px] font-[400] text-ct-gray-300 ml-2">
          {data.place}
        </span>
      </div>
      <div className="flex gap-[4.75px] justify-end mr-[12px] mt-[13px]">
        <button
          className="w-[121px] h-[26px] rounded-[4.81px] bg-ct-gray-100 text-[15px] font-[400] text-ct-black-300"
          onClick={() => setIsModalOpen(true)}
        >
          취소
        </button>
        <button
          className="w-[121px] h-[26px] rounded-[4.81px] bg-ct-gray-100 text-[15px] font-[400] text-ct-black-300"
          onClick={() => {
            setEditMode(false);
            nav(`/chatting/coffeechatrequest/${data.chatting_room_id}`);
          }}
        >
          재요청
        </button>
      </div>
      <Modal>
        <CancelModal
          coffeechat_id={data.coffeechat_id}
          roomId={data.chatting_room_id}
        />
      </Modal>
    </div>
  );
}

export default CoffeeChatCard;
