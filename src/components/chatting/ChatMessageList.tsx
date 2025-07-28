import { useChatting } from "../../contexts/ChattingContext";
import { useUser } from "../../contexts/UserContext";
import MessageBubble from "./MessageBubble";
import RequestCoffeeChatBox from "./RequestCoffechatBox";

interface Props {
  bottomRef?: React.RefObject<HTMLDivElement | null>;
}

function ChatMessageList({ bottomRef }: Props) {
  const { messages } = useChatting();
  const { name } = useUser();

  return (
    <div className="flex-1 flex flex-col overflow-y-auto overscroll-contain px-4 pb-[80px]">
      {messages.length > 0 && (
        <div className="flex flex-col items-center gap-[6px] pt-[46px]">
          <span className="text-body2 text-ct-gray-300">
            2025.05.15 (월) PM 3:00
          </span>
          <span className="text-body2 text-ct-gray-300">
            임호현님께서 대화를 시작하셨습니다.
          </span>
        </div>
      )}
      {messages.map((msg, idx) => {
        const LastCoffeeChatIndex = [...messages]
          .map((m) => m.type)
          .lastIndexOf("coffeechat");
        const isLast = idx === LastCoffeeChatIndex;
        if (msg.type == "coffeechat") {
          return (
            <div className="min-h-[41px] my-[10px]">
              <RequestCoffeeChatBox
                key={msg.id}
                status={msg.status!}
                name={name}
                sender="you"
                isLast={isLast}
              />
            </div>
          );
        }
        const prev = messages[idx - 1];
        const isSame = prev?.sender === msg.sender;
        const MarginTop = isSame ? "mt-[5px]" : "mt-[20px]";

        return (
          <div className="flex flex-col">
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              } ${MarginTop}`}
            >
              <div className="flex flex-col gap-[5px]">
                <MessageBubble text={msg.text} sender={msg.sender} />
              </div>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
export default ChatMessageList;
