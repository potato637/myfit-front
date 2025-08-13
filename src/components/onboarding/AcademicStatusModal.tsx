import { useState } from "react";
import Picker from "react-mobile-picker";
import { statusOptions } from "../../data/academic";
import { useModal } from "../../contexts/ui/modalContext";

function AcademicStatusModal({
  onConfirm,
}: {
  onConfirm: (val: string) => void;
}) {
  const { closeModal } = useModal();
  const [pickerValue, setPickerValue] = useState({
    Academic: statusOptions[4],
  });
  const handleConfirm = () => {
    onConfirm(pickerValue.Academic);
    closeModal();
  };

  return (
    <div className="flex flex-col ct-center w-full h-full relative">
      <div className="absolute w-full top-[146px] left-0 h-[36px] bg-[#EAF6FF] z-10 pointer-events-none rounded-[6px]" />
      <span className="text-h2 text-ct-black-200 mt-[19px]">재학 상태</span>
      <div className="mt-[15px] border-t border-[#A8A8A8] w-full">
        <Picker
          value={pickerValue}
          onChange={(newVal) => setPickerValue(newVal)}
          onClick={handleConfirm}
          wheelMode="natural"
          className="text-[21px] font-[500] z-10"
        >
          <Picker.Column name="Academic">
            {statusOptions.map((item) => (
              <Picker.Item
                key={item}
                value={item}
                className={`${
                  pickerValue.Academic === item
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
export default AcademicStatusModal;
