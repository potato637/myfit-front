import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";

interface ModalContextType {
  openModal: (node: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<ReactNode | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = useCallback((node: ReactNode) => {
    setContent(node);
  }, []);

  const closeModal = useCallback(() => {
    setContent(null);
  }, []);
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <div
        className="fixed inset-0 w-full h-full bg-ct-black-100/50 z-[9999] flex justify-center items-center overflow-y-auto"
        onClick={handleOutsideClick}
      >
        <div
          ref={modalRef}
          className="w-[333px] my-8 bg-ct-white rounded-[30px]"
        >
          {content}
        </div>
      </div>
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
