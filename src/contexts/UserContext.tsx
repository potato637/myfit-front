import { createContext, ReactNode, useContext, useState } from "react";

type RequestStatus = "none" | "requested" | "accepted" | "edited" | "rejected";

interface UserContextType {
  myId: number;
  senderId: number;
  name: string;
  status: RequestStatus;
  setMyId: (id: number) => void;
  setSenderId: (id: number) => void;
  setName: (name: string) => void;
  setStatus: (status: RequestStatus) => void;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [myId, setMyId] = useState<number>(1);
  const [senderId, setSenderId] = useState<number>(1);
  const [name, setName] = useState<string>("임호현");
  const [status, setStatus] = useState<RequestStatus>("none");
  return (
    <UserContext.Provider
      value={{
        myId,
        setMyId,
        senderId,
        setSenderId,
        name,
        setName,
        status,
        setStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useChatSession must be used within a ChatSessionProvider");
  return context;
};
