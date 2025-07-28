import { useState } from "react";
import { getCalendarData } from "../../utils/date";
import Month from "./Month";
import { useCoffeeChat } from "../../contexts/coffeeChatContext";

function Calendar() {
  const { selectedTitle, setSelectedTitle } = useCoffeeChat();
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const calendarData = getCalendarData();
  const monthArray = Array.from(calendarData.keys());

  const handleChevronLeft = () => {
    setSelectedMonth((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const handleChevronRight = () => {
    setSelectedMonth((prev) => (prev === 2 ? 0 : prev + 1));
  };

  return (
    <div className="w-[330px] ct-center flex-col">
      <div className="w-full flex flex-col gap-[10px] mb-[57px]">
        <span className="text-sub1 text-ct-black-100">커피챗 제목</span>
        <input
          className="w-full h-[40px] bg-ct-gray-100 rounded-[10px] px-[14px] py-[12px] placeholder-ct-gray-200 placeholder:text-body1"
          placeholder="자유롭게 작성해보세요!"
          value={selectedTitle}
          onChange={(e) => setSelectedTitle(e.target.value)}
        />
      </div>
      <div className="w-full h-auto ct-center gap-2 mb-[50px]">
        <img
          src="/assets/chatting/chevronLeft.svg"
          alt="chevronLeft"
          className="w-[6px] h-[10px]"
          onClick={handleChevronLeft}
        />
        <div>
          <span className="text-sub1 text-ct-black-200">
            {monthArray[selectedMonth]}
          </span>
        </div>
        <img
          src="/assets/chatting/chevronRight.svg"
          alt="chevronRight"
          className="w-[6px] h-[10px]"
          onClick={handleChevronRight}
        />
      </div>
      <Month data={calendarData.get(monthArray[selectedMonth]) || []} />
    </div>
  );
}

export default Calendar;
