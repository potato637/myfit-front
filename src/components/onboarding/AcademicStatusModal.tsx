import { useState } from "react";
import Picker from "react-mobile-picker";
import { statusOptions } from "../../data/academic";
import { useModal } from "../../contexts/ui/modalContext";

function AcademicStatusModal({
  onConfirm,
}: {
  onConfirm: (val: string) => void;
}) {
  const { setIsModalOpen } = useModal();
  const [pickerValue, setPickerValue] = useState({
    Academic: statusOptions[4],
  });
  const handleConfirm = () => {
    onConfirm(pickerValue.Academic);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative">
      <div className="absolute w-[302px] top-[146px] h-[36px] -translate-y-1/2 bg-[#EAF6FF] z-10 pointer-events-none rounded-[6px]" />
      <span className="text-h2 text-ct-black-200">재학 상태</span>
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
