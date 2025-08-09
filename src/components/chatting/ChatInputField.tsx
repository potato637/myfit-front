import React, { useState } from "react";

interface ChatInputFieldProps {
  onSend: (text: string) => void;
}

function ChatInputField({ onSend }: ChatInputFieldProps) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = () => {
    if (sending || text.trim() === "") return;
    setSending(true);
    onSend(text);
    setText("");
    setTimeout(() => setSending(false), 100); // debounce 방지
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      const trimmed = text.trim();
      if (trimmed) {
        onSend(trimmed);
        setText("");
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-white px-4 pt-3 h-[80px] max-w-[480px] mx-auto pb-[env(safe-area-inset-bottom,15px)]">
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
