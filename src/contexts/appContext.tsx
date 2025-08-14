import React from "react";
import { BottomSheetProvider } from "./ui/bottomSheetContext";
import { ModalProvider } from "./ui/modalContext";
import { ProfileImgModalProvider } from "./ui/profileImgModalContext";
import { CoffeeChatProvider } from "./coffeeChatContext";
import { CoffeeChatModalProvider } from "./CoffeeChatModalContext";
import { UserProvider } from "./UserContext";
import { AuthProvider } from "./AuthContext";
import { SignupProvider } from "./SignupContext";
import { ItemContextProvider } from "./ItemContext";
import { ChattingProvider } from "./ChattingContext";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <ChattingProvider roomId={null}>
          <ItemContextProvider>
            <SignupProvider>
              <CoffeeChatProvider>
                <BottomSheetProvider>
                  <UserProvider>
                    <CoffeeChatModalProvider>
                      <ProfileImgModalProvider>
                        <ModalProvider>{children}</ModalProvider>
                      </ProfileImgModalProvider>
                    </CoffeeChatModalProvider>
                  </UserProvider>
                </BottomSheetProvider>
              </CoffeeChatProvider>
            </SignupProvider>
          </ItemContextProvider>
        </ChattingProvider>
      </AuthProvider>
    </>
  );
}
