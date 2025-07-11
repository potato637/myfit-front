type SelectedKeywordsProps = {
  keywords: string[];
  onRemove: (keyword: string) => void;
};

const SelectedKeywords = ({ keywords, onRemove }: SelectedKeywordsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mt-3 mx-3">
      {keywords.map((keyword) => (
        <div
          key={keyword}
          className="flex items-center px-3 py-1 border border-ct-main-blue-100 rounded-full text-ct-main-blue-100 text-body3"
        >
          {keyword}
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
