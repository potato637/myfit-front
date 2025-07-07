import React from "react";
import { BottomSheetProvider } from "./ui/bottomSheetContext";
import { ModalProvider } from "./ui/modalContext";
import { ProfileImgModalProvider } from "./ui/profileImgModalContext";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BottomSheetProvider>
        <ModalProvider>
          <ProfileImgModalProvider>{children}</ProfileImgModalProvider>
        </ModalProvider>
      </BottomSheetProvider>
    </>
  );
}
