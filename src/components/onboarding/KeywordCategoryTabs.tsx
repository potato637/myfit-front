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
    <div className="border-b border-ct-gray-200 pb-2">
      <div className="flex justify-center">
        <div className="flex gap-[34px] w-fit">
          {categories.map((category) => (
            <button
              key={category}
              className={`${
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
    </div>
  );
}
export default KeywordCategoryTabs;
