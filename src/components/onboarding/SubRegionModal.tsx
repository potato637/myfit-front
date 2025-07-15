import Picker from "react-mobile-picker";
import { regions } from "../../data/regions";
import { useState } from "react";
import { useModal } from "../../contexts/ui/modalContext";

interface subRegiontype {
  value: string;
  onConfirm: (val: string) => void;
}

function SubRegionModal({ value, onConfirm }: subRegiontype) {
  const { setIsModalOpen } = useModal();
  const [pickerValue, setPickerValue] = useState({
    subRegion: regions[value][4],
  });
  const handleConfirm = () => {
    onConfirm(pickerValue.subRegion);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative">
      <div className="absolute w-[302px] top-[152px] h-[36px] -translate-y-1/2 bg-[#EAF6FF] z-10 pointer-events-none rounded-[6px]" />
      <span className="text-h2 text-ct-black-200">세부 활동 지역</span>
      <div className="mt-[15px] border-t border-[#A8A8A8] w-full">
        <Picker
          value={pickerValue}
          onChange={(newVal) => setPickerValue(newVal)}
          onClick={handleConfirm}
          wheelMode="natural"
          className="text-[21px] font-[500] z-10"
        >
          <Picker.Column name="subRegion">
            {regions[value].map((subRegion) => (
              <Picker.Item
                key={subRegion}
                value={subRegion}
                className={`${
                  pickerValue.subRegion === subRegion
                    ? "text-ct-gray-500"
                    : "text-[#909397]"
                }`}
              >
                {subRegion}
              </Picker.Item>
            ))}
          </Picker.Column>
        </Picker>
      </div>
    </div>
  );
}
export default SubRegionModal;
