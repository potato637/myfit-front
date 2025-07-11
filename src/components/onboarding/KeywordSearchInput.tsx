import { useState } from "react";

function KeywordSearchInput() {
  const [search, setSearch] = useState("");

  return (
    <div className="relative w-full mt-4 pl-3 pr-2">
      <input
        type="text"
        placeholder="키워드를 검색해보세요!"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border-b border-ct-gray-200 text-body1 placeholder:text-ct-gray-300 py-2 pr-10 pl-2 focus:outline-none"
      />
      <img
        src="/assets/feed/searchfeed.svg"
        alt="검색 아이콘"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-[20px] h-[20px]"
      />
    </div>
  );
}

export default KeywordSearchInput;
