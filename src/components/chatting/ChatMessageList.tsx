import MessageBubble from "./MessageBubble";

interface Message {
  id: number;
  text: string;
  sender: "me" | "you";
}
interface Props {
  messages: Message[];
  bottomRef?: React.RefObject<HTMLDivElement | null>;
}

function ChatMessageList({ messages, bottomRef }: Props) {
  return (
    <div className="flex flex-col px-4 h-[670px] overflow-y-auto border-t border-[#E0E0E0]">
      {messages.length > 0 && (
        <div className="flex flex-col items-center gap-[6px] mt-[20px]">
          <span className="text-body2 text-ct-gray-300">
            2025.05.15 (월) PM 3:00
          </span>
          <span className="text-body2 text-ct-gray-300">
            임호현님께서 대화를 시작하셨습니다.
          </span>
        </div>
      )}
      {messages.map((msg, idx) => {
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
            {/*<RequestCoffeeChatBox />*/}
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
export default ChatMessageList;
