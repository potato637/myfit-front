import React, { useState } from "react";

interface ChatInputFieldProps {
  onSend: (text: string) => void;
}

function ChatInputField({ onSend }: ChatInputFieldProps) {
  const [text, setText] = useState("");
  const handleSubmit = () => {
    if (text.trim() == "") return;
    onSend(text);
    setText("");
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };
  return (
    <div
      className="fixed bottom-[15px] left-0 right-0 w-full bg-white
                    px-4 z-10"
    >
      <div className="relative">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-[54px] rounded-[1000px] border border-ct-gray-200
                     pl-5 pr-12 text-sub2 placeholder:text-ct-gray-300"
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
}
export default ChatInputField;
