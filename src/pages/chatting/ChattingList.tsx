import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/layouts/BottomNav";
import ChatUserCard from "../../components/chatting/ChatUserCard";
import { useChattingListInfiniteQuery } from "../../hooks/chatting/chatting";
import { useEffect, useRef } from "react";
import ChatUserCardSkeleton from "../../components/skeletons/chatting/ChatUserCardSkeleton";
import ChatTabsTopBarContainer from "../../components/chatting/ChatTabsTopBarContainer";

function ChattingList() {
  const nav = useNavigate();
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useChattingListInfiniteQuery();
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1.0 }
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="flex flex-col">
      <ChatTabsTopBarContainer
        TopBarContent={
          <div className="flex w-full h-[39px]">
            <button className="flex-1 border-b-[3px] border-ct-main-blue-200 text-ct-black-300 text-[18px] font-[600]">
              대화
            </button>
            <button
              className="flex-1 border-b-[3px] border-[#D9D9D9] text-ct-gray-200 text-[18px] font-[600]"
              onClick={() => nav("/chatting/coffeechatlist")}
            >
              커피챗
            </button>
          </div>
        }
      >
        {isLoading ? (
          <div className="flex flex-col mt-[12px] pl-[20px]">
            {[...Array(5)].map((_, idx) => (
              <ChatUserCardSkeleton key={idx} />
            ))}
          </div>
        ) : data?.pages.length === 0 ||
          data?.pages.every(
            (page) => page.result.chatting_rooms.length === 0
          ) ? (
          <div className="h-[680px] w-full flex flex-col gap-[8px] ct-center">
            <img
              src="/assets/chatting/nochattingicon.svg"
              alt="채팅없음아이콘"
            />
            <span className="text-[17px] font-[400] text-ct-gray-300">
              현재 진행중인 대화가 없습니다.
            </span>
          </div>
        ) : (
          <div className="flex-1 flex-col w-full mt-[12px] px-[20px]">
            {data?.pages.map((page) =>
              page.result.chatting_rooms.map((room) => (
                <ChatUserCard key={room.chatting_room_id} data={room} />
              ))
            )}
            <div ref={observerRef} className="h-5" />
          </div>
        )}

        <BottomNav />
      </ChatTabsTopBarContainer>
    </div>
  );
}
export default ChattingList;
