type SelectedKeywordsProps = {
  keywords: string[];
  onRemove: (keyword: string) => void;
};

const SelectedKeywords = ({ keywords, onRemove }: SelectedKeywordsProps) => {
  return (
    <div className="flex flex-wrap gap-2 pb-2 mx-3">
      {keywords.map((keyword) => (
        <div
          key={keyword}
          // ✅ 피그마에 맞춰 border/텍스트 컬러는 ct-main-blue -100, 배경은 transparent
          className="flex items-center px-[10px] py-1 border border-ct-main-blue-100 rounded-full text-ct-main-blue-100 text-body1 bg-transparent"
        >
          #{keyword}
          <button
            onClick={() => onRemove(keyword)}
            className="ml-1 focus:outline-none"
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
};
export default SelectedKeywords;
