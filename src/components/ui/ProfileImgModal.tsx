import React from "react";
import { useProfileImgModal } from "../../contexts/ui/profileImgModalContext";

function ProfileImgModal({ children }: { children: React.ReactNode }) {
  const { isProfileImgModalOpen, setIsProfileImgModalOpen } =
    useProfileImgModal();

  const handleClose = () => {
    setIsProfileImgModalOpen(false);
  };

  if (!isProfileImgModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-ct-black-100/50 z-[9999] ct-center">
      <div className="w-full h-full ct-center relative">
        <div className="absolute top-0 left-0 right-0 h-[66px] flex justify-between items-center">
          <span onClick={handleClose}>취소</span>
          <span>프로필</span>
          <span onClick={handleClose}>완료</span>
        </div>
        <div className="w-full h-[auto] ct-center flex-col">
          <img
            src="/assets/profile/profileImgChange.svg"
            alt="프로필 이미지 변경"
          />
          <div className="flex items-center gap-2">
            <img
              src="/assets/profile/profileImgChange.svg"
              alt="프로필 이미지"
            />
            <span>수정</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default ProfileImgModal;
