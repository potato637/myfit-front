import React from "react";

function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-ct-black-100/50 z-[9999] ct-center">
      <div className="w-[333px] h-[auto] px-[24px] py-[22px] ct-center bg-ct-white rounded-[30px]">
        {children}
      </div>
    </div>
  );
}

export default Modal;
