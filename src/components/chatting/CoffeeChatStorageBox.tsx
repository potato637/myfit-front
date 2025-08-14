import { useNavigate } from "react-router-dom";

function CoffeeChatStorageBox() {
  const nav = useNavigate();
  return (
    <div className="min-w-[350px] h-[71px] rounded-[10px] bg-[linear-gradient(90deg,_#004CE4_0%,_#0AF_100%)] flex items-center pl-[12px]">
      <div className="flex gap-[14px] items-center">
        <img src="/assets/chatting/storageicon.svg" alt="보관아이콘" />
        <div className="flex flex-col">
          <span className="text-[18px] font-[600] text-ct-white">
            커피챗 보관함
          </span>
          <span className="text-[13px] font-[500] text-ct-white">
            커피챗 기록을 확인해보세요
          </span>
        </div>
        <button
          className="w-[85px] h-[27px] ml-[25px] rounded-[100px] bg-white/40 backdrop-blur-[2px] text-ct-white text-[15px] font-[500] "
          onClick={() => {
            nav("/chatting/coffeechatstorage");
          }}
        >
          바로가기
        </button>
      </div>
    </div>
  );
}
export default CoffeeChatStorageBox;
