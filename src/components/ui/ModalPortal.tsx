import { createPortal } from "react-dom";
import { useRef, ReactNode, MouseEvent, useCallback } from "react";
import { useModal } from "../../contexts/ui/modalContext";

interface ModalPortalProps {
  children: ReactNode;
  onClose: () => void;
}

const ModalPortal = ({ children, onClose }: ModalPortalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { closeModal } = useModal();

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
        closeModal();
      }
    },
    [onClose, closeModal]
  );

  return createPortal(
    <div
      className="fixed inset-0 w-screen h-[100dvh] bg-ct-black-100/50 z-[9999] ct-center p-[env(safe-area-inset-top,0px)_env(safe-area-inset-right,0px)_env(safe-area-inset-bottom,0px)_env(safe-area-inset-left,0px)]"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="w-[333px] my-8 bg-ct-white rounded-[30px]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalPortal;
