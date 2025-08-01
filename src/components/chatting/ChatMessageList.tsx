import { useEffect, useRef } from "react";
import { useChatting } from "../../contexts/ChattingContext";
import { useUser } from "../../contexts/UserContext";
import MessageBubble from "./MessageBubble";
import RequestCoffeeChatBox from "./RequestCoffechatBox";
import { useChatMessageInfiniteQuery } from "../../hooks/chatting/chatting";

interface Props {
  bottomRef?: React.RefObject<HTMLDivElement | null>;
}

function ChatMessageList({ bottomRef }: Props) {
  const { messages, roomId, prependMessages } = useChatting();
  const { myId, name } = useUser();

  const containerRef = useRef<HTMLDivElement>(null);
  const prevPageCount = useRef(0);

  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useChatMessageInfiniteQuery(roomId);

  const lastCoffeeChatIndex = messages
    .map((m) => m.type)
    .lastIndexOf("COFFEECHAT");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      if (isFetchingNextPage || !hasNextPage) return;
      if (el.scrollTop < 100) fetchNextPage();
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (!data) return;
    if (data.pages.length === prevPageCount.current) return;

    const el = containerRef.current;
    if (!el) return;
    const prevHeight = el.scrollHeight;

    const latest = data.pages[data.pages.length - 1].result.messages;
    const older = [...latest].reverse();
    prependMessages(older);
    prevPageCount.current = data.pages.length;

    requestAnimationFrame(() => {
      el.scrollTop += el.scrollHeight - prevHeight;
    });
  }, [data, prependMessages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col overflow-y-auto overscroll-contain px-4 pb-[80px]"
    >
      {messages.length > 0 && (
        <div className="flex flex-col items-center gap-[6px] pt-[46px]">
          <span className="text-body2 text-ct-gray-300">
            2025.05.15 (월) PM 3:00
          </span>
          <span className="text-body2 text-ct-gray-300">
            {name}님께서 대화를 시작하셨습니다.
          </span>
        </div>
      )}

      {messages.map((msg, idx) => {
        if (msg.type === "COFFEECHAT")
          return (
            <div key={msg.id} className="min-h-[41px] my-[10px]">
              <RequestCoffeeChatBox
                coffeechat_id={msg.coffeechat_id!}
                text={msg.detail_message}
                name={msg.sender_name ?? "이름 없음"}
                isLast={idx === lastCoffeeChatIndex}
              />
            </div>
          );

        const isSameSender = messages[idx - 1]?.sender_id === msg.sender_id;
        const isMine = msg.sender_id === myId;

        return (
          <div
            key={`${msg.id}${msg.isTemp ? "-t" : ""}`}
            className={`flex flex-col ${
              isSameSender ? "mt-[5px]" : "mt-[20px]"
            }`}
          >
            <div className={`flex ${isMine ? "justify-start" : "justify-end"}`}>
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

      <div ref={bottomRef} />
    </div>
  );
}

export default ChatMessageList;
