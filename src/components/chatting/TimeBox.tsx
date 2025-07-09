import { useCoffeeChat } from "../../contexts/coffeeChatContext";

function TimeBox({ time }: { time: string }) {
  const { selectedTime, setSelectedTime } = useCoffeeChat();

  return (
    <div
      className={`w-[60px] h-[37px] rounded-[11px] ct-center ${
        selectedTime === time
          ? "bg-ct-main-blue-200 text-ct-white"
          : "bg-ct-gray-100 text-ct-black-300"
      }`}
      onClick={() => setSelectedTime(time)}
    >
      <span className="text-sub3">{time}</span>
    </div>
  );
}

export default TimeBox;
