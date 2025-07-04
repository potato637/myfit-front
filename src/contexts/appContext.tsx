import React from "react";
import { BottomSheetProvider } from "./ui/bottomSheetContext";
import { ModalProvider } from "./ui/modalContext";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BottomSheetProvider>
        <ModalProvider>{children}</ModalProvider>
      </BottomSheetProvider>
    </>
  );
}
