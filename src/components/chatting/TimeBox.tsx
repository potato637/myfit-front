import { useCoffeeChat } from "../../contexts/coffeeChatContext";

interface TimeBoxProps {
  time: string;
  period: "AM" | "PM";
}

function TimeBox({ time, period }: TimeBoxProps) {
  const { selectedTime, setSelectedTime } = useCoffeeChat();

  const formattedTime = `${period} ${time.padStart(5, "0")}`;
  return (
    <div
      className={`w-[60px] h-[37px] rounded-[11px] ct-center ${
        selectedTime === formattedTime
          ? "bg-ct-main-blue-200 text-ct-white"
          : "bg-ct-gray-100 text-ct-black-300"
      }`}
      onClick={() => setSelectedTime(formattedTime)}
    >
      <span className="text-sub3">{time}</span>
    </div>
  );
}

export default TimeBox;
