import Picker from "react-mobile-picker";
import { regions } from "../../data/regions";
import { useState } from "react";
import { useModal } from "../../contexts/ui/modalContext";

function RegionModal({ onConfirm }: { onConfirm: (val: string) => void }) {
  const { setIsModalOpen } = useModal();
  const [pickerValue, setPickerValue] = useState({
    region: "대구광역시",
  });
  const handleConfirm = () => {
    onConfirm(pickerValue.region);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative">
      <div className="absolute w-[302px] top-[152px] h-[36px] -translate-y-1/2 bg-[#EAF6FF] z-10 pointer-events-none rounded-[6px]" />
      <span className="text-h2 text-ct-black-200">주 활동 지역</span>
      <div className="mt-[15px] border-t border-[#A8A8A8] w-full">
        <Picker
          value={pickerValue}
          onChange={(newVal) => setPickerValue(newVal)}
          onClick={handleConfirm}
          wheelMode="natural"
          className="text-[21px] font-[500] z-10"
        >
          <Picker.Column name="region">
            {Object.keys(regions).map((region) => (
              <Picker.Item
                key={region}
                value={region}
                className={`${
                  pickerValue.region === region
                    ? "text-ct-gray-500"
                    : "text-[#909397]"
                }`}
              >
                {region}
              </Picker.Item>
            ))}
          </Picker.Column>
        </Picker>
      </div>
    </div>
  );
}
export default RegionModal;
