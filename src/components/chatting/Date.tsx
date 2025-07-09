import { CalendarDateData, isToday } from "../../utils/date";
import { useCoffeeChat } from "../../contexts/coffeeChatContext";

function Date({ data }: { data?: CalendarDateData }) {
  const { selectedDate, setSelectedDate } = useCoffeeChat();

  if (data === undefined || data === null) {
    return (
      <div className="w-full h-[63px] border-t-[1px] border-ct-gray-200"></div>
    );
  }

  const isSelected =
    data.isValid &&
    selectedDate?.year === data.year &&
    selectedDate?.month === data.month &&
    selectedDate?.date === data.date;

  return (
    <div
      className="w-full h-[63px] flex flex-col items-center border-t-[1px] border-ct-gray-200"
      onClick={() => {
        if (data.isValid) {
          setSelectedDate(data);
        }
      }}
    >
      <span
        className={`mt-[9px] text-sub4 block w-[21px] h-[21px] ct-center ${
          data.isValid ? "text-ct-black-200" : "text-ct-gray-200"
        } ${
          isSelected ? "text-ct-white bg-ct-main-blue-200 rounded-full" : ""
        }`}
      >
        {data.date}
      </span>
      {isToday(data) && (
        <span className="mt-[3px] text-body3 text-ct-black-200">오늘</span>
      )}
    </div>
  );
}

export default Date;
