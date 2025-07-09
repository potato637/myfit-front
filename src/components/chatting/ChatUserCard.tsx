import { useNavigate } from "react-router-dom";

function ChatUserCard() {
  const nav = useNavigate();
  return (
    <div
      className="h-[54px] flex gap-[10px] mb-[24px]"
      onClick={() => {
        nav("/chatting");
      }}
    >
      <img
        src="/assets/chatting/manprofile.svg"
        alt="남성프로필"
        className="w-[49px] h-[49px]"
      />
      <div className="flex flex-col gap-[2px]">
        <span className="text-[13px] font-[400] text-ct-black-100">
          임호현 /34
        </span>
        <span className="text-[13px] font-[400] text-ct-black-100">
          개발자 / 백앤드개발자
        </span>
        <span className="text-[13px] font-[400] text-ct-main-blue-200">
          임호현님이 커피챗 요청을 수락하셨습니다!
        </span>
      </div>
    </div>
  );
}
export default ChatUserCard;
