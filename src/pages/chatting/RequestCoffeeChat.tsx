import Calendar from "../../components/chatting/Calendar";
import TimePicker from "../../components/chatting/TimePicker";
import PlacePicker from "../../components/chatting/PlacePicker";
import TopBarContainer from "../../components/common/TopBarContainer";

const TopBarContent = () => {
  return <span className="text-h2 text-ct-black-100">커피챗 요청</span>;
};

function RequestCoffeeChat() {
  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="w-full h-auto ct-center flex-col">
        <Calendar />
        <TimePicker />
        <PlacePicker />
        <button className="mb-[57px] w-[168px] h-[42px] rounded-[100px] border-[1px] border-ct-main-blue-200 ct-center text-ct-black-100 text-sub1">
          수락 요청
        </button>
      </div>
    </TopBarContainer>
  );
}

export default RequestCoffeeChat;
