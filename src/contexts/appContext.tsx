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

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <ItemContextProvider>
          <SignupProvider>
            <CoffeeChatProvider>
              <BottomSheetProvider>
                <UserProvider>
                  <ModalProvider>
                    <CoffeeChatModalProvider>
                      <ProfileImgModalProvider>
                        {children}
                      </ProfileImgModalProvider>
                    </CoffeeChatModalProvider>
                  </ModalProvider>
                </UserProvider>
              </BottomSheetProvider>
            </CoffeeChatProvider>
          </SignupProvider>
        </ItemContextProvider>
      </AuthProvider>
    </>
  );
}
