import { useRef } from "react";

function ModalPortal({ children }: { children: React.ReactNode }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };
  return (
    <div
      className="fixed inset-0 w-full h-full bg-ct-black-100/50 z-[9999] flex justify-center items-center overflow-y-auto"
      onClick={handleOutsideClick}
    >
      <div ref={modalRef} className="w-[333px] my-8 bg-ct-white rounded-[30px]">
        {children}
      </div>
    </div>
  );
}

export default ModalPortal;
