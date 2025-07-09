interface MessageBubbleProps {
  text: string;
  sender: "me" | "you";
}
function MessageBubble({ text, sender }: MessageBubbleProps) {
  const isMe = sender === "me";
  return (
    <div
      className={`text-body1 max-w-[305px] px-[15px] py-[11px] ${
        isMe
          ? " rounded-[10px] rounded-br-none bg-ct-main-blue-200 text-ct-white"
          : "rounded-[10px] rounded-bl-none bg-gray-100 text-ct-black-300"
      }`}
    >
      {text}
    </div>
  );
}
export default MessageBubble;
