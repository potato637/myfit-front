import { useNavigate } from "react-router-dom";
import { ChatMessageType, divisionType } from "../../apis/chatting/chatting";
export interface dataprops {
  chatting_room_id: number;
  partner: {
    service_id: number;
    name: string;
    age: number;
    low_sector: string;
    profile_image: string;
    division: divisionType;
  };
  last_message: {
    message: string;
    created_at: string;
    type: ChatMessageType;
    sender_name: string;
  };
}
interface ChatUserDataProps {
  data: dataprops;
}

function ChatUserCard({ data }: ChatUserDataProps) {
  const nav = useNavigate();
  function truncateText(text: string, maxLength: number) {
    if (!text) return "";
    return text.length > maxLength
      ? text.slice(0, maxLength - 3) + "..."
      : text;
  }
  return (
    <div
      className="h-[54px] flex gap-[10px] mb-[24px]"
      onClick={() => {
        nav(`/chatting/${data.chatting_room_id}`);
      }}
    >
      <img
        src={data.partner.profile_image}
        alt="프로필 이미지"
        className="w-[49px] h-[49px] rounded-full"
      />
      <div className="flex flex-col gap-[2px]">
        <span className="text-[13px] font-[400] text-ct-black-100">
          {data.partner.name}
          {data.partner.division === "personal" && `/${data.partner.age}`}
        </span>
        <span className="text-[13px] font-[400] text-ct-black-100">
          {data.partner.low_sector}
        </span>
        <span
          className={`text-[13px] font-[400] ${
            data.last_message.type === "COFFEECHAT"
              ? "text-ct-main-blue-200"
              : "text-[#909397]"
          }`}
        >
          {data.last_message.type === "COFFEECHAT"
            ? `${data.last_message.sender_name} ${truncateText(
                data.last_message.message,
                30
              )}`
            : truncateText(data.last_message.message, 64)}
        </span>
      </div>
    </div>
  );
}
export default ChatUserCard;
