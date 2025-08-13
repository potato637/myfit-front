import React, { useRef } from "react";
import { useModal } from "../../contexts/ui/modalContext";

function Modal({ children }: { children: React.ReactNode }) {
  const { isModalOpen, setIsModalOpen } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsModalOpen(false);
  };
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed left-0 right-0 bottom-0 top-0 bg-ct-black-100/50 z-[9999] ct-center"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="w-[333px] h-[auto] ct-center bg-ct-white rounded-[30px]"
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
