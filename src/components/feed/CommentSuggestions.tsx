interface Suggestion {
  icon: string; // 이미지 경로
  label: string;
}

const SUGGESTIONS: Suggestion[] = [
  { icon: "/assets/feed/work.svg", label: "함께 일 해보고싶어요!" },
  {
    icon: "/assets/feed/routine.svg",
    label: "비슷한 루틴을 갖고있어요!",
  },
  {
    icon: "/assets/feed/curious.svg",
    label: "더 많은 활동이 궁금해요!",
  },
  {
    icon: "/assets/feed/shake.svg",
    label: "함께 활동을 만들고 싶어요!",
  },
  { icon: "/assets/feed/grow.svg", label: "동기부여가 되었어요!" },
];

function CommentSuggestions() {
  return (
    <div className="overflow-x-auto w-full">
      <div className="flex gap-2 w-max">
        {SUGGESTIONS.map((sug, idx) => (
          <button
            key={idx}
            className="whitespace-nowrap border border-blue-500 rounded-full py-2 px-4 text-sm font-semibold flex items-center gap-2"
          >
            <img src={sug.icon} alt={sug.label} className="w-4 h-4" />
            <span>{sug.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CommentSuggestions;
