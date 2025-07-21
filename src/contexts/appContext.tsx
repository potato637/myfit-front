import React from "react";
import { BottomSheetProvider } from "./ui/bottomSheetContext";
import { ModalProvider } from "./ui/modalContext";
import { ProfileImgModalProvider } from "./ui/profileImgModalContext";
import { CoffeeChatProvider } from "./coffeeChatContext";
import { CoffeeChatModalProvider } from "./CoffeeChatModalContext";
import { UserProvider } from "./UserContext";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CoffeeChatProvider>
        <BottomSheetProvider>
          <UserProvider>
            <ModalProvider>
              <CoffeeChatModalProvider>
                <ProfileImgModalProvider>{children}</ProfileImgModalProvider>
              </CoffeeChatModalProvider>
            </ModalProvider>
          </UserProvider>
        </BottomSheetProvider>
      </CoffeeChatProvider>
    </>
  );
}
