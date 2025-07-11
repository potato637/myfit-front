type CategoryType = "프로그래밍" | "디자인" | "데이터 분석" | "마케팅";

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
  ];

  return (
    <div className="flex gap-3 ml-3 mr-[10px] border-b border-ct-gray-200 pb-3">
      {categories.map((category) => (
        <button
          key={category}
          className={`text-sub2 ${
            activeCategory === category ? "font-bold" : "text-ct-gray-300"
          }`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default KeywordCategoryTabs;
