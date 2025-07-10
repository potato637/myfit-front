import { useState } from "react";

function KeywordInput() {
  const [inputValue, setInputValue] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setError(""); // 입력 시 에러 초기화

    if (value.endsWith(" ")) {
      const newKeyword = value.trim();

      if (!newKeyword) {
        setInputValue("");
        return;
      }

      if (keywords.includes(newKeyword)) {
        setError("이미 추가된 키워드입니다.");
      } else if (keywords.length >= 5) {
        setError("키워드는 최대 5개까지 입력할 수 있어요.");
      } else {
        setKeywords([...keywords, newKeyword]);
      }

      setInputValue("");
    } else {
      setInputValue(value);
    }
  };

  const handleDelete = (keyword: string) => {
    setKeywords((prev) => prev.filter((k) => k !== keyword));
  };

  return (
    <div>
      <p className="text-sub1 font-semibold text-ct-black-300">해시태그 추가</p>
      <p className="text-body2 text-ct-gray-200 mt-[2px]">
        최대 5개까지 추가가 가능합니다.
      </p>

      <div className="mt-[8px] flex flex-wrap gap-[8px]">
        {keywords.map((tag) => (
          <div
            key={tag}
            className="flex items-center gap-1 px-[10px] py-[6px] bg-blue-100 rounded-full text-blue-500 text-body2"
          >
            #{tag}
            <button
              type="button"
              onClick={() => handleDelete(tag)}
              className="ml-1 text-[14px] leading-none"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {keywords.length < 5 && (
        <>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            className="mt-[10px] w-full border-b border-ct-gray-100 outline-none text-body2"
            placeholder="키워드를 입력해주세요"
          />
          {error && (
            <p className="text-caption text-red-500 mt-[6px]">{error}</p>
          )}
        </>
      )}
    </div>
  );
}

export default KeywordInput;
