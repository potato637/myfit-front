import TopBarContainer from "../../components/common/TopBarContainer";
import ChatMessageList from "../../components/chatting/ChatMessageList";
import ChatInputField from "../../components/chatting/ChatInputField";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useChatting } from "../../contexts/ChattingContext";
import { useCoffeeChatModal } from "../../contexts/CoffeeChatModalContext";
import { useCoffeeChat } from "../../contexts/coffeeChatContext";
import {
  useChatMessageInfiniteQuery,
  useSendChatMessageMutation,
} from "../../hooks/chatting/chatting";
import { useLocation } from "react-router-dom";

function Chatting() {
  const { messages, addMessage, prependMessages, clearMessages } =
    useChatting();
  const { setEditMode } = useCoffeeChatModal();
  const { resetSelections } = useCoffeeChat();
  const nav = useNavigate();
  const { chattingRoomId } = useParams();
  const numericRoomId = Number(chattingRoomId);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useChatMessageInfiniteQuery(numericRoomId);
  const location = useLocation();
  const targetServiceId = location.state?.targetServiceId;

  useEffect(() => {
    if (data) {
      const allMessages = data.pages
        .flatMap((page) =>
          Array.isArray(page.result.messages) ? page.result.messages : []
        )
        .reverse();
      clearMessages();
      prependMessages(allMessages);
    }
  }, [data]);
  const { mutate: sendMessage } = useSendChatMessageMutation(numericRoomId);

  const handleSend = (text: string) => {
    sendMessage({
      detail_message: text,
      type: "TEXT",
    });
  };
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
          <span className="text-h2 text-ct-black-100">김기업</span>
          <img
            src="/assets/chatting/calender.svg"
            alt="캘린더 아이콘"
            className="absolute right-[28px] "
            onClick={() => {
              resetSelections();
              setEditMode(false);
              nav(`/chatting/coffeechatrequest/${numericRoomId}`);
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
