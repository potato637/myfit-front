import { createContext, useContext, useState, ReactNode } from "react";
import { Message } from "../types/chatting/Message";

interface ChattingContextType {
  messages: Message[];
  addMessage: (msg: Message) => void;
  clearMessages: () => void;
}

const ChattingContext = createContext<ChattingContextType | undefined>(
  undefined
);

export const ChattingProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <ChattingContext.Provider value={{ messages, addMessage, clearMessages }}>
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
