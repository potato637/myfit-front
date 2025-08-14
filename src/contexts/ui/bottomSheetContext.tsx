import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
  useMemo,
} from "react";
import BottomSheetPortal from "../../components/ui/BottomSheetPortal";

interface BottomSheetContextType {
  openBottomSheet: (node: ReactNode) => void;
  closeBottomSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined
);

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<ReactNode | null>(null);

  const openBottomSheet = useCallback((node: ReactNode) => {
    setContent(node);
    document.body.classList.add("bottom-sheet-open");
  }, []);

  const closeBottomSheet = useCallback(() => {
    setContent(null);
    document.body.classList.remove("bottom-sheet-open");
  }, []);

  const contextValue = useMemo(
    () => ({
      openBottomSheet,
      closeBottomSheet,
    }),
    [openBottomSheet, closeBottomSheet]
  );

  return (
    <BottomSheetContext.Provider value={contextValue}>
      {children}
      {content && (
        <BottomSheetPortal onClose={closeBottomSheet}>
          {content}
        </BottomSheetPortal>
      )}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = (): BottomSheetContextType => {
  const context = useContext(BottomSheetContext);

  if (!context) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }

  return context;
};
