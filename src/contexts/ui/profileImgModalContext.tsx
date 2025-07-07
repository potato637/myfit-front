import { ReactNode, createContext, useContext, useState } from "react";

interface ProfileImgModalContextType {
  isProfileImgModalOpen: boolean;
  setIsProfileImgModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileImgModalContext = createContext<
  ProfileImgModalContextType | undefined
>(undefined);

export const ProfileImgModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isProfileImgModalOpen, setIsProfileImgModalOpen] = useState(false);

  return (
    <ProfileImgModalContext.Provider
      value={{ isProfileImgModalOpen, setIsProfileImgModalOpen }}
    >
      {children}
    </ProfileImgModalContext.Provider>
  );
};

export const useProfileImgModal = (): ProfileImgModalContextType => {
  const context = useContext(ProfileImgModalContext);

  if (!context) {
    throw new Error(
      "useProfileImgModal must be used within a ProfileImgModalProvider"
    );
  }

  return context;
};
