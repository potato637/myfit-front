import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/layouts/BottomNav";
import ChatUserCard from "../../components/chatting/ChatUserCard";

function ChattingList() {
  const nav = useNavigate();
  const nothing = true;
  return (
    <div className="flex flex-col">
      <div className="flex w-full h-[39px]">
        <button className="flex-1 border-b-[3px] border-ct-main-blue-200 text-ct-black-300 text-[18px] font-[600]">
          대화
        </button>
        <button
          className="flex-1 border-b-[3px] border-[#D9D9D9] text-ct-gray-200 text-[18px] font-[600]"
          onClick={() => nav("/chatting/coffeechatlist")}
        >
          커피챗
        </button>
      </div>
      {nothing ? (
        <div className="h-[680px] w-full flex flex-col gap-[8px] ct-center">
          <img src="/assets/chatting/nochattingicon.svg" alt="채팅없음아이콘" />
          <span className="text-[17px] font-[400] text-ct-gray-300">
            현재 진행중인 대화가 없습니다.
          </span>
        </div>
      ) : (
        <div className="flex-1 flex-col w-full mt-[26px] pl-[20px]">
          <ChatUserCard />
          <ChatUserCard />
          <ChatUserCard />
          <ChatUserCard />
        </div>
      )}
      <BottomNav />
    </div>
  );
}
export default ChattingList;
