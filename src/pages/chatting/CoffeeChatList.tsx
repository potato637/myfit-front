import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/layouts/BottomNav";
import CoffeeChatCard from "../../components/chatting/CoffeeChatCard";
import CoffeeChatStorageBox from "../../components/chatting/CoffeeChatStorageBox";
import { useCoffeeChatListInfiniteQuery } from "../../hooks/chatting/coffeechat";
import CoffeeChatCardSkeleton from "../../components/skeletons/chatting/CoffeeChatCardSkeleton";
import ChatTabsTopBarContainer from "../../components/chatting/ChatTabsTopBarContainer";

function CoffeeChatList() {
  const nav = useNavigate();
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useCoffeeChatListInfiniteQuery();
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

  const isEmpty = !data?.pages?.length;

  return (
    <div className="flex flex-col">
      <ChatTabsTopBarContainer
        TopBarContent={
          <div className="flex w-full h-[39px]">
            <button
              className="flex-1 border-b-[3px] border-[#D9D9D9] text-ct-gray-200 text-[18px] font-[600]"
              onClick={() => nav("/chatting")}
            >
              대화
            </button>
            <button className="flex-1 border-b-[3px] border-ct-main-blue-200 text-ct-black-300 text-[18px] font-[600]">
              커피챗
            </button>
          </div>
        }
      >
        <div className="-mt-[15px] px-[18px] flex flex-col pb-[90px]">
          <div className="flex flex-col gap-[9px] text-[17px] font-[600] text-ct-black-100">
            지난 커피챗은 이곳에서 보관해요!
            <div className="flex justify-center">
              <CoffeeChatStorageBox />
            </div>
          </div>

          <div className="flex gap-[6px] mt-[31px]">
            <img src="/assets/chatting/coffeechat.svg" alt="커피챗로고" />
            <span className="text-h1 text-ct-black-100">예정된 커피챗</span>
          </div>
          <span className="text-[15px] text-ct-gray-300 mt-[13px]">
            다가오는 커피챗 일정이에요!
          </span>

          {isLoading ? (
            <div className="flex flex-col gap-[17px] mt-[13px]">
              {[...Array(3)].map((_, i) => (
                <CoffeeChatCardSkeleton key={i} />
              ))}
            </div>
          ) : isEmpty ? (
            <div className="h-[160px] w-full text-[15px] font-[400] text-ct-gray-300 flex ct-center">
              예정된 커피챗이 없습니다
            </div>
          ) : (
            <div className="flex flex-col gap-[17px] mt-[13px]">
              {data?.pages.map((page) =>
                page.result.coffeechats.map((coffeechat) => (
                  <CoffeeChatCard
                    key={coffeechat.coffeechat_id}
                    data={coffeechat}
                  />
                ))
              )}
              <div ref={observerRef} className="h-5" />
            </div>
          )}
        </div>

        <BottomNav />
      </ChatTabsTopBarContainer>
    </div>
  );
}
export default CoffeeChatList;
