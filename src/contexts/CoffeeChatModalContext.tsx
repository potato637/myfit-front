import { createContext, ReactNode, useContext, useState } from "react";

type ModalType =
  | "none"
  | "request"
  | "waiting"
  | "confirm"
  | "edit"
  | "editConfirm";

type RequestStatus = "none" | "requested" | "accepted" | "edited" | "rejected";

interface CoffeeChatModalContextType {
  modalType: ModalType;
  setModalType: (type: ModalType) => void;

  requestStatus: RequestStatus;
  setRequestStatus: (type: RequestStatus) => void;

  editMode: boolean;
  setEditMode: (val: boolean) => void;
}

const CoffeeChatModalContext = createContext<
  CoffeeChatModalContextType | undefined
>(undefined);

export const CoffeeChatModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [modalType, setModalType] = useState<ModalType>("none");
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("none");
  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <CoffeeChatModalContext.Provider
      value={{
        modalType,
        setModalType,
        requestStatus,
        setRequestStatus,
        editMode,
        setEditMode,
      }}
    >
      {children}
    </CoffeeChatModalContext.Provider>
  );
};

export const useCoffeeChatModal = () => {
  const context = useContext(CoffeeChatModalContext);
  if (!context)
    throw new Error(
      "useCoffeeChatModal must be used within CoffeeChatModalProvider"
    );
  return context;
};
