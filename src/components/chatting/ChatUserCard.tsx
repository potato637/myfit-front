import { useNavigate } from "react-router-dom";
export interface dataprops {
  chatting_room_id: number;
  partner: {
    service_id: number;
    name: string;
    age: number;
    low_sector: string;
    profile_image: string;
  };
  last_message: {
    message: string;
    created_at: string;
  };
}
interface ChatUserDataProps {
  data: dataprops;
}
function ChatUserCard({ data }: ChatUserDataProps) {
  const nav = useNavigate();
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
          {data.partner.name}/{data.partner.age}
        </span>
        <span className="text-[13px] font-[400] text-ct-black-100">
          {data.partner.low_sector}
        </span>
        <span className="text-[13px] font-[400] text-ct-main-blue-200">
          {data.last_message.message}
        </span>
      </div>
    </div>
  );
}
export default ChatUserCard;
