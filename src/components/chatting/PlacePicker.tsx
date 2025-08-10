import { useState } from "react";

function PlacePicker() {
  const [value, setValue] = useState<string>("");

  const handleClick = () => {
    if (value.trim()) return;
  };

  return (
    <div className="w-[330px] border-b-[1px] border-ct-gray-300 mb-[40px] p-[6px]">
      <div className="w-full flex justify-between items-center">
        <input
          className="w-full h-[31px] placeholder-ct-gray-300 placeholder:text-sub2 focus:outline-none pr-[6px]"
          placeholder="약속 장소를 입력해 주세요"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="w-[86px] h-[31px] bg-ct-main-blue-200 text-ct-white rounded-[5px] ct-center text-body1"
          onClick={handleClick}
        >
          위치 검색
        </button>
      </div>
    </div>
  );
}

export default PlacePicker;
