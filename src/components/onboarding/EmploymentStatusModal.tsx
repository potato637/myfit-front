import { useState } from "react";
import Picker from "react-mobile-picker";
import { employmentStatus } from "../../data/employment";
import { useModal } from "../../contexts/ui/modalContext";

function EmploymentStatusModal({
  onConfirm,
}: {
  onConfirm: (val: string) => void;
}) {
  const { closeModal } = useModal();
  const [pickerValue, setPickerValue] = useState({
    employment: employmentStatus[3],
  });
  const handleConfirm = () => {
    onConfirm(pickerValue.employment);
    closeModal();
  };
  return (
    <div className="flex flex-col ct-center w-full h-full relative">
      <div className="absolute w-full top-[146px] left-0 h-[36px] bg-[#EAF6FF] z-10 pointer-events-none rounded-[6px]" />
      <span className="text-h2 text-ct-black-200 mt-[19px]">
        구인/구직 상태
      </span>
      <div className="mt-[15px] border-t border-[#A8A8A8] w-full">
        <Picker
          value={pickerValue}
          onChange={(newVal) => setPickerValue(newVal)}
          onClick={handleConfirm}
          wheelMode="natural"
          className="text-[21px] font-[500] z-10"
        >
          <Picker.Column name="employment">
            {employmentStatus.map((item) => (
              <Picker.Item
                key={item}
                value={item}
                className={`${
                  pickerValue.employment === item
                    ? "text-ct-gray-500"
                    : "text-ct-gray-300 opacity-50"
                }`}
              >
                {item}
              </Picker.Item>
            ))}
          </Picker.Column>
        </Picker>
      </div>
    </div>
  );
}
export default EmploymentStatusModal;
