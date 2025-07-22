import React from "react";
import { BottomSheetProvider } from "./ui/bottomSheetContext";
import { ModalProvider } from "./ui/modalContext";
import { ProfileImgModalProvider } from "./ui/profileImgModalContext";
import { CoffeeChatProvider } from "./coffeeChatContext";
import { CoffeeChatModalProvider } from "./CoffeeChatModalContext";
import { UserProvider } from "./UserContext";
import { ChattingProvider } from "./ChattingContext";
import { AuthProvider } from "./AuthContext";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <CoffeeChatProvider>
          <BottomSheetProvider>
            <UserProvider>
              <ModalProvider>
                <ChattingProvider>
                  <CoffeeChatModalProvider>
                    <ProfileImgModalProvider>
                      {children}
                    </ProfileImgModalProvider>
                  </CoffeeChatModalProvider>
                </ChattingProvider>
              </ModalProvider>
            </UserProvider>
          </BottomSheetProvider>
        </CoffeeChatProvider>
      </AuthProvider>
    </>
  );
}
