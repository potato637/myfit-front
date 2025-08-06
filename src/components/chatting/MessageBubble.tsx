import { useAuth } from "../../contexts/AuthContext";

interface MessageBubbleProps {
  text: string;
  sender_id: number;
}

function MessageBubble({ text, sender_id }: MessageBubbleProps) {
  const { user } = useAuth();
  const isMine = sender_id === user?.id;
  return (
    <div
      className={`text-[14px] font-[400] max-w-[305px] px-[15px] py-[11px] ${
        isMine
          ? " rounded-[10px] rounded-br-none bg-ct-main-blue-200 text-ct-white"
          : "rounded-[10px] rounded-bl-none bg-gray-100 text-ct-black-300"
      }`}
    >
      {text}
    </div>
  );
}
export default MessageBubble;
