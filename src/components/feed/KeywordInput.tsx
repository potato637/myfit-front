import { useState } from "react";

interface KeywordInputProps {
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
}

function KeywordInput({ keywords, setKeywords }: KeywordInputProps) {
  const [inputValue, setInputValue] = useState("");
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
    setKeywords(keywords.filter((k) => k !== keyword));
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
            className="flex items-center gap-1 px-[10px] py-[6px] bg-[#E5F0FF] rounded-full text-ct-sub-blue-200 text-body1"
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
            className="mt-[10px] w-full border-b border-ct-gray-200 outline-none  placeholder:text-ct-gray-200 placeholder:text-body1"
            placeholder="키워드를 입력해주세요"
          />
          {error && (
            <p className="text-body1 text-[#FF3535] mt-[8px]">{error}</p>
          )}
        </>
      )}
    </div>
  );
}

export default KeywordInput;
