import React from "react";
import { BottomSheetProvider } from "./ui/bottomSheetContext";
import { ModalProvider } from "./ui/modalContext";
import { ProfileImgModalProvider } from "./ui/profileImgModalContext";
import { CoffeeChatProvider } from "./coffeeChatContext";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CoffeeChatProvider>
        <BottomSheetProvider>
          <ModalProvider>
            <ProfileImgModalProvider>{children}</ProfileImgModalProvider>
          </ModalProvider>
        </BottomSheetProvider>
      </CoffeeChatProvider>
    </>
  );
}
