import { useState } from "react";
import TopBarContainer from "../../components/common/TopBarContainer";
import KeywordCategoryTabs from "../../components/onboarding/KeywordCategoryTabs";
import SelectedKeywords from "../../components/onboarding/SelectedKeywords";
import KeywordList from "../../components/onboarding/KeywordList";

function KeywordSelectorPage() {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<
    "프로그래밍" | "디자인" | "데이터 분석" | "마케팅"
  >("프로그래밍");

  const handleSelectKeyword = (keyword: string) => {
    if (!selectedKeywords.includes(keyword) && selectedKeywords.length < 5) {
      setSelectedKeywords((prev) => [...prev, keyword]);
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setSelectedKeywords((prev) => prev.filter((k) => k !== keyword));
  };

  const TopBarContent = () => {
    return (
      <div className="relative w-full ct-center">
        <span className="text-ct-black-100 text-h1">키워드 </span>
        <div className="absolute right-[22px]">
          <span className="text-sub2 text-ct-gray-200">완료</span>
        </div>
      </div>
    );
  };

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="px-[16px] flex flex-col gap-5">
        <SelectedKeywords
          keywords={selectedKeywords}
          onRemove={handleRemoveKeyword}
        />
        <KeywordCategoryTabs
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
        <KeywordList
          category={activeCategory}
          selectedKeywords={selectedKeywords}
          onSelect={handleSelectKeyword}
        />
      </div>
    </TopBarContainer>
  );
}

export default KeywordSelectorPage;
