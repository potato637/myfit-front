import { useState } from "react";
import { getCalendarData } from "../../utils/date";
import Month from "../chatting/Month";
import { useCoffeeChat } from "../../contexts/coffeeChatContext";
import { useModal } from "../../contexts/ui/modalContext";

function CalendarModal() {
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const calendarData = getCalendarData();
  const monthArray = Array.from(calendarData.keys());

  const handleChevronLeft = () => {
    setSelectedMonth((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const handleChevronRight = () => {
    setSelectedMonth((prev) => (prev === 2 ? 0 : prev + 1));
  };
  const { selectedDate, setSelectedDate } = useCoffeeChat();
  const { closeModal } = useModal();
  const handleSelectDate = () => {
    if (selectedDate) {
      setSelectedDate(selectedDate);
      closeModal();
    }
  };

  return (
    <div className="w-full h-full ct-center flex-col">
      <div className="w-full h-auto ct-center gap-2 mb-[19px] mt-[19px]">
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
      <button
        className="w-full h-[60px] rounded-b-[30px] bg-ct-main-blue-200 text-white text-body1 mt-[24px] hover:bg-ct-main-blue-300 transition-colors duration-200 cursor-pointer"
        onClick={handleSelectDate}
      >
        선택
      </button>
    </div>
  );
}

export default CalendarModal;
