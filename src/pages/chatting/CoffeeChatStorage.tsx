import CoffeeChatStorageCard from "../../components/chatting/CoffeeChatStorageCard";
import TopBarContainer from "../../components/common/TopBarContainer";

function CoffeeChatStorage() {
  const TopBarContent = () => {
    return (
      <span className="text-h2 font-Pretendard text-ct-black-300">
        커피챗 보관함
      </span>
    );
  };
  const nothing = false;
  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      {nothing ? (
        <div className="h-[680px] w-full flex flex-col gap-[8px] ct-center">
          <img src="assets/chatting/coffeechat" alt="임시로고" />
          <span className="text-[17px] font-[400] text-ct-gray-300">
            지난 커피챗 기록이 없습니다.
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-[17px] items-center">
          <CoffeeChatStorageCard />
        </div>
      )}
    </TopBarContainer>
  );
}
export default CoffeeChatStorage;
