import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import socket from "../libs/socket";
import { ChatMessage } from "../apis/chatting/chatting";

interface ChattingContextType {
  roomId: number | null;
  messages: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  prependMessages: (msgs: ChatMessage[]) => void;
  clearMessages: () => void;
  replaceMessage: (tempId: number, newMsg: ChatMessage) => void;
  removeMessage: (tempId: number) => void;
}

const ChattingContext = createContext<ChattingContextType | undefined>(
  undefined
);

export const ChattingProvider = ({
  roomId,
  children,
}: {
  roomId: number;
  children: ReactNode;
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const addMessage = (msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  };
  console.log("📤 emitting join to:", `chat:${roomId}`);
  useEffect(() => {
    if (!roomId) return;

    const roomName = `chat:${roomId}`;
    console.log("📤 emitting join to:", roomName);
    socket.emit("join", roomName);

    const handler = (msg: ChatMessage) => {
      setMessages((prev) => {
        const tempIdx = prev.findIndex(
          (p) => p.isTemp && p.sender_id === msg.sender_id
        );
        if (tempIdx !== -1) {
          const next = [...prev];
          next[tempIdx] = msg;
          return next;
        }
        return [...prev, msg];
      });
    };

    socket.on("receiveMessage", handler);

    return () => {
      console.log("👋 leaving room:", roomName);
      socket.emit("leave", roomName);
      socket.off("receiveMessage", handler);
    };
  }, [roomId]);

  const prependMessages = (msgs: ChatMessage[]) => {
    setMessages((prev) => {
      const ids = new Set(prev.map((m) => m.id));
      const unique = msgs.filter((m) => !ids.has(m.id));
      return [...unique, ...prev];
    });
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const replaceMessage = (tempId: number, newMsg: ChatMessage) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === tempId ? newMsg : msg))
    );
  };

  const removeMessage = (tempId: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
  };

  return (
    <ChattingContext.Provider
      value={{
        roomId,
        messages,
        addMessage,
        prependMessages,
        clearMessages,
        replaceMessage,
        removeMessage,
      }}
    >
      {children}
    </ChattingContext.Provider>
  );
};

export const useChatting = () => {
  const context = useContext(ChattingContext);
  if (!context)
    throw new Error("useChatting must be used within ChattingProvider");
  return context;
};
