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
  usePartnerProfileQuery,
  useSendChatMessageMutation,
} from "../../hooks/chatting/chatting";
import { useModal } from "../../contexts/ui/modalContext";

function Chatting() {
  const { messages, addMessage, prependMessages, clearMessages } =
    useChatting();
  const { setEditMode, setModalType } = useCoffeeChatModal();
  const { resetSelections } = useCoffeeChat();
  const { setIsModalOpen } = useModal();
  const nav = useNavigate();
  const { chattingRoomId } = useParams();
  const numericRoomId = Number(chattingRoomId);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data: parnterProfile } = usePartnerProfileQuery(numericRoomId);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useChatMessageInfiniteQuery(numericRoomId);

  useEffect(() => {
    setIsModalOpen(false);
    setModalType("none");
  }, []);

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
        <div className="flex flex-col gap-[3px] ct-center">
          <img
            src={parnterProfile?.result.profile_img}
            alt="프로필 사진"
            className="w-[49px] h-[49px] rounded-full"
          />
          <span className="text-h2 text-ct-black-100">
            {parnterProfile?.result.name}
          </span>
          <img
            src="/assets/chatting/calender.svg"
            alt="캘린더 아이콘"
            className="absolute right-[28px]"
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
