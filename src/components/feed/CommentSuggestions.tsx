import { useState } from "react";

interface Suggestion {
  icon: string;
  label: string;
}

const SUGGESTIONS: Suggestion[] = [
  { icon: "/assets/feed/work.svg", label: "함께 일 해보고싶어요!" },
  { icon: "/assets/feed/routine.svg", label: "비슷한 루틴을 갖고있어요!" },
  { icon: "/assets/feed/curious.svg", label: "더 많은 활동이 궁금해요!" },
  { icon: "/assets/feed/shake.svg", label: "함께 활동을 만들고 싶어요!" },
  { icon: "/assets/feed/grow.svg", label: "동기부여가 되었어요!" },
];

interface CommentSuggestionsProps {
  onSelect: (label: string) => void;
}

function CommentSuggestions({ onSelect }: CommentSuggestionsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + SUGGESTIONS.length) % SUGGESTIONS.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SUGGESTIONS.length);
  };

  const currentSuggestion = SUGGESTIONS[currentIndex];

  return (
    <div className="flex items-center gap-3">
      {/* 이전 버튼 */}
      <button
        type="button"
        onClick={goToPrevious}
        className="p-2 rounded-full text-blue-500 hover:bg-blue-50 hover:text-blue-700 transition"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* 현재 옵션 */}
      <div className="flex-1 min-w-0">
        <button
          type="button"
          onClick={() => onSelect(currentSuggestion.label)}
          className="w-full border border-blue-500 rounded-full py-3 px-4 text-sm font-semibold flex items-center gap-3 hover:bg-blue-500 hover:text-white transition justify-center overflow-hidden"
        >
          <img
            src={currentSuggestion.icon}
            alt={currentSuggestion.label}
            className="w-5 h-5 flex-shrink-0"
          />
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            {currentSuggestion.label}
          </span>
        </button>
      </div>

      {/* 다음 버튼 */}
      <button
        type="button"
        onClick={goToNext}
        className="p-2 rounded-full text-blue-500 hover:bg-blue-50 hover:text-blue-700 transition"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* 인디케이터 */}
      <div className="flex gap-1 ml-2">
        {SUGGESTIONS.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default CommentSuggestions;