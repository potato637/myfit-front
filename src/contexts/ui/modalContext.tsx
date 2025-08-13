import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import ModalPortal from "../../components/ui/ModalPortal";

interface ModalContextType {
  openModal: (node: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<ReactNode | null>(null);

  const openModal = useCallback((node: ReactNode) => {
    setContent(node);
  }, []);

  const closeModal = useCallback(() => {
    setContent(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [openModal, closeModal]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {content && <ModalPortal onClose={closeModal}>{content}</ModalPortal>}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
