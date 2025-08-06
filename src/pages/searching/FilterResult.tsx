import { useState } from "react";
import TopBarContainer from "../../components/common/TopBarContainer";

function TopBarContent() {
  return (
    <div>
      <span className="text-h2 text-ct-black-100">검색 결과</span>
    </div>
  );
}

function FilterResult() {
  const [viewType, setViewType] = useState<"swipe" | "list">("swipe");

  const handleTypeClick = () => {
    setViewType(viewType === "swipe" ? "list" : "swipe");
  };

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="w-full ct-center border-t-[0.7px] border-ct-gray-200 pt-[30px]">
        <div className="w-[320px] ct-center flex-col">
          <div className="w-full flex justify-end gap-2 mb-[20px]">
            <span
              className="text-sub2 text-ct-black-200 cursor-pointer"
              onClick={handleTypeClick}
            >
              {viewType === "swipe" ? "스와이프" : "리스트"}
            </span>
            <span className="text-sub2 text-ct-main-blue-100">총 10장</span>
          </div>
        </div>
      </div>
    </TopBarContainer>
  );
}

export default FilterResult;
