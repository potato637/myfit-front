import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/layouts/BottomNav";
import CoffeeChatCard from "../../components/chatting/CoffeeChatCard";
import CoffeeChatStorageBox from "../../components/chatting/CoffeeChatStorageBox";

function CoffeeChatList() {
  const nav = useNavigate();
  const nothing = false;
  return (
    <div className="flex flex-col">
      <div className="flex w-full h-[39px] fixed bg-ct-white">
        <button
          className="flex-1 border-b-[3px] border-[#D9D9D9] text-ct-gray-200 text-[18px] font-[600]"
          onClick={() => nav("/chatting/chattinglist")}
        >
          대화
        </button>
        <button className="flex-1 border-b-[3px] border-ct-main-blue-200 text-ct-black-300 text-[18px] font-[600]">
          커피챗
        </button>
      </div>
      <div className="pt-[19px] px-[18px] flex flex-col mt-[39px]  max-h-[690px]  overflow-y-scroll pb-[90px]">
        <div className="flex flex-col gap-[9px] text-[17px] font-[600] text-ct-black-100">
          지난 커피챗은 이곳에서 보관해요!
          <div className="flex justify-center">
            <CoffeeChatStorageBox />
          </div>
        </div>
        <div className="flex gap-[6px] mt-[31px]">
          <img src="/assets/chatting/coffeechat.svg" alt="커피챗로고" />
          <span className="text-h1 text-ct-black-100">예정된 커피챗</span>
        </div>
        <span className="text-[15px] text-ct-gray-300 mt-[13px]">
          다가오는 커피챗 일정이에요!
        </span>
        {nothing ? (
          <div className="h-[160px] w-full text-[15px] font-[400] text-ct-gray-300 flex ct-center">
            예정된 커피챗이 없습니다
          </div>
        ) : (
          <div className="flex flex-col gap-[17px] mt-[13px]">
            <CoffeeChatCard />
            <CoffeeChatCard />
            <CoffeeChatCard />
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
export default CoffeeChatList;
