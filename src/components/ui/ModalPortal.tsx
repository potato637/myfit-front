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

  // 오버레이 역할을 하는 div의 클릭 이벤트를 처리
  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      // 모달 내용(modalRef)을 클릭하지 않았을 때만 모달 닫기
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
        closeModal();
      }
    },
    [onClose, closeModal]
  );

  return createPortal(
    // 이 div가 오버레이 역할을 함
    <div
      className="fixed inset-0 z-[9999] ct-center"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="w-[333px] my-8 bg-ct-white rounded-[30px]"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 버블링 방지
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalPortal;
