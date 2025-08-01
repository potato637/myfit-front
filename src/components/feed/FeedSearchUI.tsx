import { useState } from "react";
import ProfileResult from "./ProfileResult";
import PostResult from "./PostResult";
import HashtagResult from "./HashtagResult";

const TABS = ["프로필", "게시글", "해시태그"] as const;
type TabType = (typeof TABS)[number];

function FeedSearchUI() {
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState<TabType | null>("프로필");

  const handleSearch = () => {
    if (searchText.trim()) {
      setSearchText("");
    }
  };

  const renderTabContent = () => {
    if (!activeTab) return null;

    switch (activeTab) {
      case "프로필":
        return <ProfileResult keyword={searchText} />;
      case "게시글":
        return <PostResult keyword={searchText} />;
      case "해시태그":
        return <HashtagResult keyword={searchText} />;
    }
  };

  return (
    <div className="flex flex-col gap-[19px] px-[22px] pt-[30px]">
      {/* 검색 입력 */}
      <div className="border-b border-ct-gray-300 flex items-center px-1 py-2">
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          className="flex-1 bg-transparent placeholder-ct-gray-200 text-sub2 outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch} className="text-gray-500 px-2">
          <img src="/assets/feed/searchfeed.svg" alt="검색 아이콘" />
        </button>
      </div>

      {/* 탭 버튼 */}
      <div className="flex justify-between px-3">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-body1 ${
              activeTab === tab ? "text-ct-black-200" : "text-ct-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 (선택된 경우에만) */}
      {renderTabContent()}
    </div>
  );
}

export default FeedSearchUI;
