type CategoryType = "프로그래밍" | "디자인" | "데이터 분석" | "마케팅" | "제품&서비스" | "협업&조직문화" | "성과" | "창업&리더십" | "콘텐츠" | "프로젝트" | "외부경험&대외활동" | "자격&교육";

interface KeywordCategoryTabsProps {
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
}

function KeywordCategoryTabs({
  activeCategory,
  onSelectCategory,
}: KeywordCategoryTabsProps) {
  const categories: CategoryType[] = [
    "프로그래밍",
    "디자인",
    "데이터 분석",
    "마케팅",
    "제품&서비스",
    "협업&조직문화",
    "성과",
    "창업&리더십",
    "콘텐츠",
    "프로젝트",
    "외부경험&대외활동",
    "자격&교육",
  ];

  return (
    <div className="border-b border-ct-gray-200 pb-2">
      <div className="overflow-x-scroll whitespace-nowrap scrollbar-hide px-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`inline-block px-[17px] ${
              activeCategory === category
                ? "text-sub1 text-ct-black-200"
                : "text-sub2 text-ct-gray-300"
            }`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
export default KeywordCategoryTabs;
