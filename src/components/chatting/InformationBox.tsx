interface InformationProps {
  date?: string;
  time?: string;
  place?: string;
}

function InformationBox({ date, time, place }: InformationProps) {
  return (
    <div className="relative w-[298px] min-h-[109px] rounded-[15px] border border-ct-gray-100 bg-ct-white px-[45px] py-1 flex items-center">
      <div className="flex flex-col gap-[11px]">
        <div className="flex gap-[28px]">
          <span className="text-sub2 text-ct-black-200">날짜</span>
          <span className="text-sub2 text-ct-black-200">{date}</span>
        </div>
        <div className="flex gap-[28px]">
          <span className="text-sub2 text-ct-black-200">시간</span>
          <span className="text-sub2 text-ct-black-200">{time}</span>
        </div>
        <div className="flex gap-[28px]">
          <span className="text-sub2 text-ct-black-200  whitespace-nowrap">
            장소
          </span>
          <span className="text-sub2 text-ct-black-200">{place}</span>
        </div>
      </div>
    </div>
  );
}
export default InformationBox;
