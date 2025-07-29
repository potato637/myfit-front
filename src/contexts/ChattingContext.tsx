import { createContext, useContext, useState, ReactNode } from "react";
import { Message } from "../types/chatting/Message";
import { ChatMessage } from "../apis/chatting/chatting";

interface ChattingContextType {
  roomId: number | null;
  setRoomId: (id: number | null) => void;
  messages: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  prependMessages: (msgs: ChatMessage[]) => void;
  clearMessages: () => void;
}

const ChattingContext = createContext<ChattingContextType | undefined>(
  undefined
);

export const ChattingProvider = ({ children }: { children: ReactNode }) => {
  const [roomId, setRoomId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const addMessage = (msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  };

  const prependMessages = (msgs: ChatMessage[]) => {
    setMessages((prev) => [...msgs, ...prev]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <ChattingContext.Provider
      value={{
        roomId,
        setRoomId,
        messages,
        addMessage,
        prependMessages,
        clearMessages,
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
