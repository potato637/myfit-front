import { useState } from "react";

interface Props {
  onSubmit: (text: string) => void;
}

function CommentInput({ onSubmit }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };

  return (
    <div className="w-full px-3 py-2 bg-gray-100 rounded-full flex items-center">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="댓글을 작성해보세요!"
        className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500"
      />
      <button onClick={handleSubmit} type="button" className="ml-2">
        <img src="/assets/feed/send.svg" alt="전송" />
      </button>
    </div>
  );
}

export default CommentInput;
