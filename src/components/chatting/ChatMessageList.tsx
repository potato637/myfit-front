import { useEffect, useState } from "react";
import { useChatMessageQuery } from "../../apis/chatting/chatting";
import { useChatting } from "../../contexts/ChattingContext";
import { useCoffeeChatModal } from "../../contexts/CoffeeChatModalContext";
import { useUser } from "../../contexts/UserContext";
import { ChatBoxStatus } from "../../types/chatting/ChatBoxStatus";
import MessageBubble from "./MessageBubble";
import RequestCoffeeChatBox from "./RequestCoffechatBox";

interface Props {
  bottomRef?: React.RefObject<HTMLDivElement | null>;
}

function ChatMessageList({ bottomRef }: Props) {
  const { messages, prependMessages, roomId } = useChatting();
  const { requestStatus } = useCoffeeChatModal();
  const { myId, senderId, name } = useUser();
  const { data } = useChatMessageQuery(roomId);
  const [statusMap, setStatusMap] = useState<Record<number, ChatBoxStatus>>({});
  useEffect(() => {
    if (data?.messages) prependMessages(data.messages);
  }, [data]);
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
          .lastIndexOf("COFFEECHAT");
        const isLast = idx === LastCoffeeChatIndex;
        if (msg.type == "COFFEECHAT") {
          return (
            <div className="min-h-[41px] my-[10px]">
              <RequestCoffeeChatBox
                key={msg.id}
                status={statusMap[msg.id] ?? "none"}
                name={name}
                sender="you"
                isLast={isLast}
              />
            </div>
          );
        }
        const prev = messages[idx - 1];
        const isSame = prev?.sender_id === msg.sender_id;
        const MarginTop = isSame ? "mt-[5px]" : "mt-[20px]";

        return (
          <div className="flex flex-col">
            <div
              key={msg.id}
              className={`flex ${
                msg.sender_id === 1 ? "justify-end" : "justify-start" // 세션에서 myid 를 불러와서 같은거 확인해야할듯
              } ${MarginTop}`}
            >
              <div className="flex flex-col gap-[5px]">
                <MessageBubble text={msg.type} sender_id={msg.sender_id} />
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
