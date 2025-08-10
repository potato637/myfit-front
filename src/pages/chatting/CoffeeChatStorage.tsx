import { useState } from "react";
import CoffeeChatStorageCard from "../../components/chatting/CoffeeChatStorageCard";
import TopBarContainer from "../../components/common/TopBarContainer";
import { useCoffeeChatStorageQuery } from "../../hooks/chatting/coffeechat";
import CoffeeChatCardSkeleton from "../../components/skeletons/chatting/CoffeeChatCardSkeleton";

function CoffeeChatStorage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useCoffeeChatStorageQuery(page);

  const chats = data?.result.chats ?? [];
  const totalPage = data?.result.totalpages ?? 1;

  const TopBarContent = () => (
    <span className="text-h2 font-Pretendard text-ct-black-300">
      커피챗 보관함
    </span>
  );

  const coffeeChatCardData = (chat: any) => {
    const date = new Date(chat.scheduled_at);
    const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")} ${
      ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
    } PM ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;

    return {
      id: chat.coffeechat_id,
      formattedDate,
      name: chat.opponent.name,
      date: formattedDate,
      age: chat.opponent.age,
      job: chat.opponent.job,
      location: chat.place,
      profileImageUrl: chat.opponent.profile_img,
      chatting_room_id: chat.chatting_room_id,
    };
  };

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="flex flex-col gap-[17px] items-center w-full px-4 pt-[20px] pb-[89px]">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <CoffeeChatCardSkeleton key={idx} />
          ))
        ) : chats.length === 0 ? (
          <div className="h-[680px] w-full flex flex-col gap-[17px] ct-center">
            <img
              src="/assets/chatting/nocoffeechaticon.svg"
              alt="커피챗없음로고"
            />
            <span className="text-[17px] font-[400] text-ct-gray-300">
              지난 커피챗 기록이 없습니다.
            </span>
          </div>
        ) : (
          <>
            {chats.map((chat) => (
              <CoffeeChatStorageCard
                key={chat.coffeechat_id}
                chat={coffeeChatCardData(chat)}
              />
            ))}

            {totalPage >= 1 && (
              <div className="flex justify-center gap-2 mt-4">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  className="px-3 py-1 text-sm rounded border disabled:text-ct-gray-200"
                >
                  {"<"}
                </button>
                {Array.from({ length: totalPage }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-1 text-sm rounded border ${
                      page === i + 1
                        ? "bg-ct-main-blue-200 text-white"
                        : "text-ct-black-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={page === totalPage}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-3 py-1 text-sm rounded border disabled:text-ct-gray-200"
                >
                  {">"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </TopBarContainer>
  );
}

export default CoffeeChatStorage;
