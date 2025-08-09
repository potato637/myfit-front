import { useNavigate } from "react-router-dom";

interface CoffeeChatItem {
  id: number;
  date: string;
  name: string;
  age: number;
  job: string;
  location: string;
  profileImageUrl?: string;
  chatting_room_id: number;
}

interface Props {
  chat: CoffeeChatItem;
}

function CoffeeChatStorageCard({ chat }: Props) {
  const nav = useNavigate();
  return (
    <div
      className="w-[339px] h-[136px] rounded-[7.53px] flex flex-col bg-ct-white border border-[#E2E2E2] pl-[9px] pt-[24px] pb-[20px]"
      onClick={() => nav(`/chatting/${chat.chatting_room_id}`)}
    >
      <div className="flex gap-[13px] pl-[7px]">
        <img
          src={chat.profileImageUrl}
          alt="프로필 이미지"
          className="w-[49px] h-[49px] object-cover rounded-full"
        />
        <div className="flex flex-col justify-center">
          <span className="text-[15px] font-[400] text-ct-main-blue-200">
            {chat.date}
          </span>
          <span className="flex gap-[4px]">
            <span className="text-[16px] font-[700] text-ct-black-300">
              {chat.name} / {chat.age}
            </span>
            <span className="text-[16px] font-[400] text-ct-black-300">
              {chat.job}
            </span>
          </span>
        </div>
      </div>
      <div className="mt-[18px] flex items-center gap-[4px]">
        <img src="/assets/chatting/placeicon.svg" alt="위치 아이콘" />
        <span className="text-[15px] font-[400] text-ct-gray-300">
          {chat.location}
        </span>
      </div>
    </div>
  );
}

export default CoffeeChatStorageCard;
