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
      className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-ct-black-100/50 z-[9999] flex justify-center items-center overflow-y-auto"
      onClick={handleOutsideClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'auto'
      }}
    >
      <div
        ref={modalRef}
        className="w-[333px] my-8 bg-ct-white rounded-[30px]"
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
