import { ReactNode, createContext, useContext, useState } from "react";

interface BottomSheetContextType {
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined
);

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <BottomSheetContext.Provider
      value={{ isBottomSheetOpen, setIsBottomSheetOpen }}
    >
      {children}
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
