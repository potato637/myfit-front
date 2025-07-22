import { useState } from "react";
import Picker from "react-mobile-picker";
import { useModal } from "../../contexts/ui/modalContext";

function BirthModal({ onConfirm }: { onConfirm: (val: string) => void }) {
  const { setIsModalOpen } = useModal();
  const [pickerValue, setPickerValue] = useState({
    year: `${2000}`,
    month: `${10}`,
    day: `${10}`,
  });

  const currentYear = new Date().getFullYear();

  const yearOptions = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => `${1900 + i}`
  );
  const monthOptions = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const dayOptions = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
  const handleConfirm = () => {
    const formattedDate = `${pickerValue.year}-${pickerValue.month.padStart(
      2,
      "0"
    )}-${pickerValue.day.padStart(2, "0")}`;
    onConfirm(formattedDate);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col ct-center w-full h-full relative">
      <div className="absolute w-[302px] top-[145px] left-[12px] h-[36px] bg-[#EAF6FF] z-10 pointer-events-none rounded-[6px]" />

      <span className="text-h2 text-ct-black-200 mt-[19px]">생년월일</span>
      <div className="w-full border-y border-[#A8A8A8] h-[208px] mt-[18px]">
        <Picker
          value={pickerValue}
          onChange={(newVal) => {
            setPickerValue(newVal);
          }}
          className="text-h1 z-10"
          itemHeight={36}
          height={208}
          wheelMode="natural"
        >
          <Picker.Column name="year">
            {yearOptions.map((y) => (
              <Picker.Item
                key={y}
                value={y}
                className={`${
                  pickerValue.year === y
                    ? "text-ct-gray-500"
                    : "text-[#909397] opacity-[50%]"
                }`}
              >
                {y}년
              </Picker.Item>
            ))}
          </Picker.Column>
          <Picker.Column name="month">
            {monthOptions.map((m) => (
              <Picker.Item
                key={m}
                value={m}
                className={`${
                  pickerValue.month === m
                    ? "text-ct-gray-500"
                    : "text-[#909397] opacity-[50%]"
                }`}
              >
                {m}월
              </Picker.Item>
            ))}
          </Picker.Column>
          <Picker.Column name="day">
            {dayOptions.map((d) => (
              <Picker.Item
                key={d}
                value={d}
                className={`${
                  pickerValue.day === d
                    ? "text-ct-gray-500"
                    : "text-[#909397] opacity-[50%]"
                }`}
              >
                {d}일
              </Picker.Item>
            ))}
          </Picker.Column>
        </Picker>
      </div>
      <div className="flex">
        <button
          className="w-[166.5px] h-[60px] bg-[#D9D9D9] rounded-bl-[30px] text-h2 text-ct-gray-400"
          onClick={() => setIsModalOpen(false)}
        >
          취소
        </button>
        <button
          className="w-[166.5px] h-[60px] bg-ct-sub-blue-200 rounded-br-[30px] text-h2 text-ct-white"
          onClick={handleConfirm}
        >
          확인
        </button>
      </div>
    </div>
  );
}
export default BirthModal;
