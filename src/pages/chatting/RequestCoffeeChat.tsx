import Calendar from "../../components/chatting/Calendar";
import TimePicker from "../../components/chatting/TimePicker";
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
      </div>
    </TopBarContainer>
  );
}

export default RequestCoffeeChat;
