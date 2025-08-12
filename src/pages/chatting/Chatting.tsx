import TopBarContainer from "../../components/common/TopBarContainer";
import ChatMessageList from "../../components/chatting/ChatMessageList";
import ChatInputField from "../../components/chatting/ChatInputField";
import { useEffect, useMemo, useRef, useState } from "react";
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
import { useAuth } from "../../contexts/AuthContext";

function Chatting() {
  const { prependMessages, clearMessages, messages } = useChatting();
  const { setEditMode, setModalType } = useCoffeeChatModal();
  const { resetSelections } = useCoffeeChat();
  const { setIsModalOpen } = useModal();
  const { user } = useAuth();
  const nav = useNavigate();
  const { chattingRoomId } = useParams();
  const numericRoomId = Number(chattingRoomId);

  const scrollRef = useRef<HTMLDivElement>(null);
  const topSentinelRef = useRef<HTMLDivElement>(null);

  const firstRenderRef = useRef(true);
  const prevPageCountRef = useRef(0);
  const isPrependingRef = useRef(false);

  const isAutoScrollingRef = useRef(false);
  const atBottomRef = useRef(true);
  const prevLastIdRef = useRef<any>(null);

  const [isNearBottom, setIsNearBottom] = useState(true);

  const { data: partnerProfile } = usePartnerProfileQuery(numericRoomId);
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } =
    useChatMessageInfiniteQuery(numericRoomId);
  const { mutate: sendMessage } = useSendChatMessageMutation(numericRoomId);

  useEffect(() => {
    refetch().finally(() =>
      requestAnimationFrame(() => scrollToBottom("auto"))
    );
  }, [numericRoomId]);

  useEffect(() => {
    setIsModalOpen(false);
    setModalType("none");
  }, [setIsModalOpen, setModalType]);

  const scrollToBottom = (behavior: ScrollBehavior = "auto") => {
    const el = scrollRef.current;
    if (!el) return;
    isAutoScrollingRef.current = true;
    const end = () => {
      isAutoScrollingRef.current = false;
      atBottomRef.current = true;
    };
    if (behavior === "auto") {
      el.scrollTop = el.scrollHeight;
      requestAnimationFrame(end);
    } else {
      el.scrollTo({ top: el.scrollHeight, behavior });
      setTimeout(end, 180);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      if (isAutoScrollingRef.current) return;
      const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
      setIsNearBottom(nearBottom);
      atBottomRef.current = nearBottom;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!data) return;

    const pages = data.pages;
    const all = pages
      .flatMap((p) =>
        Array.isArray(p.result.messages) ? p.result.messages : []
      )
      .sort(
        (a: any, b: any) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

    if (firstRenderRef.current) {
      const hasTemp = messages.some((m: any) => (m as any).isTemp);
      if (!hasTemp) {
        clearMessages();
      }
      prependMessages(all);
      requestAnimationFrame(() => scrollToBottom("auto"));
      prevPageCountRef.current = pages.length;
      firstRenderRef.current = false;

      setTimeout(() => {
        const el = scrollRef.current;
        if (
          el &&
          hasNextPage &&
          !isFetchingNextPage &&
          el.scrollHeight <= el.clientHeight + 2
        ) {
          fetchNextPage();
        }
      }, 0);
      return;
    }

    if (pages.length > prevPageCountRef.current) {
      isPrependingRef.current = true;
      const newlyFetched = pages[pages.length - 1].result.messages ?? [];
      const olderSorted = [...newlyFetched].sort(
        (a: any, b: any) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

      const el = scrollRef.current;
      const prevH = el?.scrollHeight ?? 0;
      const prevTop = el?.scrollTop ?? 0;

      prependMessages(olderSorted);

      requestAnimationFrame(() => {
        const el2 = scrollRef.current;
        const nextH = el2?.scrollHeight ?? 0;
        if (el2) el2.scrollTop = prevTop + (nextH - prevH);
        isPrependingRef.current = false;
      });

      prevPageCountRef.current = pages.length;
    }
  }, [
    data,
    clearMessages,
    prependMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    messages,
  ]);

  useEffect(() => {
    const root = scrollRef.current;
    const target = topSentinelRef.current;
    if (!root || !target) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root, threshold: 0 }
    );

    obs.observe(target);
    return () => obs.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (!messages.length) return;
    if (isPrependingRef.current) return;

    const el = scrollRef.current;
    const atBottom =
      !el || el.scrollHeight - (el.scrollTop + el.clientHeight) <= 2;

    const last = messages[messages.length - 1];
    const lastId = last?.id;
    const justGotNewLast = lastId !== prevLastIdRef.current;
    const isMineLast = user && last?.sender_id === user.id;

    const hasMyTempCoffee = messages.some(
      (m: any) =>
        (m as any).isTemp && m.type === "COFFEECHAT" && m.sender_id === user?.id
    );

    if (
      hasMyTempCoffee ||
      (justGotNewLast && (isMineLast || isNearBottom || atBottom))
    ) {
      requestAnimationFrame(() => scrollToBottom("smooth"));
    }

    prevLastIdRef.current = lastId;
  }, [messages, user, isNearBottom]);

  const partnerName = useMemo(
    () => partnerProfile?.result?.name ?? "",
    [partnerProfile]
  );

  const handleSend = (text: string) => {
    if (!text.trim() || !user) return;
    const tempId = Date.now();
    sendMessage({
      sender_id: user.id,
      detail_message: text,
      type: "TEXT",
      tempId,
    } as any);
  };

  const TopBarContent = () => (
    <div className="w-full h-[70px] bg-white">
      <div className="flex flex-col gap-[3px] ct-center">
        <img
          src={partnerProfile?.result.profile_img}
          alt="프로필 사진"
          className="w-[49px] h-[49px] rounded-full"
        />
        <span className="text-h2 text-ct-black-100">{partnerName}</span>
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

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="pt-[24px] h-[calc(100vh-42px)] flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4" ref={scrollRef}>
          <div ref={topSentinelRef} className="h-1" />
          <ChatMessageList showStartBanner={!hasNextPage} />
        </div>
        <ChatInputField onSend={handleSend} />
      </div>
    </TopBarContainer>
  );
}

export default Chatting;
