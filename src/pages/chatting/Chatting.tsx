import TopBarContainer from "../../components/common/TopBarContainer";
import ChatMessageList from "../../components/chatting/ChatMessageList";
import ChatInputField from "../../components/chatting/ChatInputField";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useChatting } from "../../contexts/ChattingContext";
import { useCoffeeChatModal } from "../../contexts/CoffeeChatModalContext";
import { useCoffeeChat } from "../../contexts/coffeeChatContext";

function Chatting() {
  const { messages, addMessage } = useChatting();
  const { setEditMode } = useCoffeeChatModal();
  const { resetSelections } = useCoffeeChat();
  const nav = useNavigate();
  const handleSend = (text: string) => {
    addMessage({ id: Date.now(), text, sender: "me", type: "message" });
  };
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const TopBarContent = () => {
    return (
      <div className="w-full h-[70px] bg-white">
        {" "}
        <div className="flex flex-col gap-[3px] ct-center">
          <img
            src="/assets/chatting/manprofile.svg"
            alt="남성프로필"
            className="w-[49px] h-[49px]"
          />
          <span className="text-h2 text-ct-black-100">임호현</span>
          <img
            src="/assets/chatting/calender.svg"
            alt="캘린더 아이콘"
            className="absolute right-[28px] "
            onClick={() => {
              resetSelections();
              setEditMode(false);
              nav("/coffeechat/request");
            }}
          />
        </div>
      </div>
    );
  };
  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="pt-[24px] h-[calc(100vh-42px)] flex flex-col overflow-hidden">
        <div className="min-h-full flex flex-col justify-end">
          <ChatMessageList bottomRef={bottomRef} />
        </div>
        <ChatInputField onSend={handleSend} />
      </div>
    </TopBarContainer>
  );
}
export default Chatting;
