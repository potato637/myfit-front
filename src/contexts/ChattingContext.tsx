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

  const sortByTime = (a: ChatMessage, b: ChatMessage) =>
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime();

  const upsert = (prev: ChatMessage[], msg: ChatMessage) => {
    const map = new Map(prev.map((m) => [m.id, m]));
    const old = map.get(msg.id);
    const created_at = old?.isTemp ? old.created_at : msg.created_at; // temp가 있던 시간 우선
    map.set(msg.id, { ...msg, created_at, isTemp: false });
    return Array.from(map.values()).sort(sortByTime);
  };

  const upsertMany = (prev: ChatMessage[], msgs: ChatMessage[]) => {
    const map = new Map(prev.map((m) => [m.id, m]));
    for (const m of msgs) map.set(m.id, { ...m });
    return Array.from(map.values()).sort(sortByTime);
  };

  const addMessage = (msg: ChatMessage) => {
    setMessages((prev) => upsert(prev, msg));
  };

  useEffect(() => {
    if (!roomId) return;

    const roomName = `chat:${roomId}`;
    socket.emit("joinRoom", roomId);

    const handler = (msg: ChatMessage & { tempId?: number }) => {
      setMessages((prev) => {
        let base = prev;
        if (msg.tempId !== undefined) {
          base = base.filter((m) => m.id !== msg.tempId);
        }
        return upsert(base, { ...msg, isTemp: false });
      });
    };

    socket.on("receiveMessage", handler);

    return () => {
      socket.emit("leave", roomName);
      socket.off("receiveMessage", handler);
    };
  }, [roomId]);

  const prependMessages = (msgs: ChatMessage[]) => {
    setMessages((prev) => upsertMany(prev, msgs));
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const replaceMessage = (tempId: number, newMsg: ChatMessage) => {
    setMessages((prev) => {
      const prevTemp = prev.find((m) => m.id === tempId);
      const keepCreatedAt = prevTemp?.created_at ?? newMsg.created_at;
      const filtered = prev.filter((m) => m.id !== tempId);
      return upsert(filtered, {
        ...newMsg,
        created_at: keepCreatedAt,
        isTemp: false,
      });
    });
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
