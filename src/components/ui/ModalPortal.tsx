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
      className="fixed inset-0 w-screen min-h-[100dvh] bg-ct-black-100/50 z-[9999] ct-center"
      style={{
        minHeight: 'calc(100dvh + env(safe-area-inset-top, 0px) + env(safe-area-inset-bottom, 0px))',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        marginTop: 'calc(-1 * env(safe-area-inset-top, 0px))',
        marginBottom: 'calc(-1 * env(safe-area-inset-bottom, 0px))'
      }}
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
