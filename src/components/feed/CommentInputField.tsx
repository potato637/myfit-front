import React, { useImperativeHandle, useState, forwardRef } from "react";

export interface CommentInputFieldRef {
  setText: (value: string) => void;
  focus: () => void;
}

interface CommentInputFieldProps {
  onSend: (text: string) => void;
}

const CommentInputField = forwardRef<
  CommentInputFieldRef,
  CommentInputFieldProps
>(({ onSend }, ref) => {
  const [text, setText] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (text.trim() === "") return;
    onSend(text);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  useImperativeHandle(ref, () => ({
    setText: (value: string) => setText(value),
    focus: () => inputRef.current?.focus(),
  }));

  return (
    <div className="w-full bg-white px-0">
      <div className="relative">
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          className="w-full h-[54px] rounded-[1000px] border border-ct-gray-200 pl-5 pr-12 text-sub2 placeholder:text-ct-gray-300"
          placeholder="메시지를 입력하세요"
        />
        <img
          src="/assets/chatting/sendbutton.svg"
          alt="보내기"
          className="absolute top-1/2 right-[10px] -translate-y-1/2 cursor-pointer"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
});

export default CommentInputField;
