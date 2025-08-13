import { createPortal } from "react-dom";
import { useEffect, useRef, ReactNode, MouseEvent, useCallback } from "react";
import { useModal } from "../../contexts/ui/modalContext";

interface ModalPortalProps {
  children: ReactNode;
  onClose: () => void;
}

const ModalPortal = ({ children, onClose }: ModalPortalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { closeModal } = useModal();

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        closeModal();
      }
    },
    [onClose, closeModal]
  );

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
        closeModal();
      }
    },
    [onClose, closeModal]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);
    
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handleEscape]);

  return createPortal(
    <div
      className="fixed inset-0 w-full h-full bg-ct-black-100/50 z-[9999] flex justify-center items-center overflow-y-auto"
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
