import { useMemo } from "react";
import { useChatting } from "../../contexts/ChattingContext";
import { useAuth } from "../../contexts/AuthContext";
import MessageBubble from "./MessageBubble";
import RequestCoffeeChatBox from "./RequestCoffechatBox";
import { formatDateWithDayAndTime } from "../../utils/format";

interface Props {
  showStartBanner: boolean;
}

function ChatMessageList({ showStartBanner }: Props) {
  const { messages } = useChatting();
  const { user } = useAuth();

  const firstMessage = useMemo(() => {
    if (!messages.length) return null;
    let min = messages[0];
    for (let i = 1; i < messages.length; i++) {
      if (
        new Date(messages[i].created_at).getTime() <
        new Date(min.created_at).getTime()
      ) {
        min = messages[i];
      }
    }
    return min;
  }, [messages]);

  const lastCoffeeChatIndex = useMemo(
    () => messages.map((m: any) => m.type).lastIndexOf("COFFEECHAT"),
    [messages]
  );

  return (
    <div className="flex-1 flex flex-col pb-[80px]">
      {showStartBanner && firstMessage && (
        <div className="flex flex-col items-center gap-[6px] pt-[16px] pb-[8px]">
          <span className="text-body2 text-ct-gray-300">
            {formatDateWithDayAndTime(
              new Date(firstMessage.created_at).getTime()
            )}
          </span>
          <span className="text-body2 text-ct-gray-300">
            {firstMessage.sender_name ?? "알 수 없음"}님께서 대화를
            시작하셨습니다.
          </span>
        </div>
      )}

      {messages.map((msg: any, idx: number) => {
        if (msg.type === "COFFEECHAT") {
          return (
            <div key={`coffee-${msg.id}`} className="min-h-[41px] my-[10px]">
              <RequestCoffeeChatBox
                coffeechat_id={msg.coffeechat_id}
                text={msg.detail_message}
                name={msg.sender_name ?? "이름 없음"}
                isLast={idx === lastCoffeeChatIndex}
                status={msg.status}
              />
            </div>
          );
        }

        const prev = messages[idx - 1];
        const isSameSender = prev && prev.sender_id === msg.sender_id;
        const isMine = user && msg.sender_id === user.id;

        return (
          <div
            key={`msg-${msg.id}`}
            className={`flex flex-col ${
              isSameSender ? "mt-[5px]" : "mt-[20px]"
            }`}
          >
            <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
              <div className="flex flex-col gap-[5px]">
                <MessageBubble
                  text={msg.detail_message}
                  sender_id={msg.sender_id}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatMessageList;
