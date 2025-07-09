import { morningTimes, afternoonTimes } from "../../utils/date";
import TimeBox from "./TimeBox";

function TimePicker() {
  return (
    <div className="w-[330px] mb-[52px]">
      <div className="mb-[10px]">
        <span className="text-body1 text-ct-gray-400">오전</span>
        <div className="grid grid-cols-5 gap-2 mt-[13px]">
          {morningTimes.map((time, index) => (
            <TimeBox key={index} time={time} />
          ))}
        </div>
      </div>

      <div>
        <span className="text-body1 text-ct-gray-400">오후</span>
        <div className="grid grid-cols-5 gap-2 mt-[13px]">
          {afternoonTimes.map((time, index) => (
            <TimeBox key={index} time={time} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimePicker;
