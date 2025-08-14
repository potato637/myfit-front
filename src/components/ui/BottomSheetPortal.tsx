import { useRef, MouseEvent, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface BottomSheetPortalProps {
  children: ReactNode;
  onClose: () => void;
}

const BottomSheetPortal = ({ children, onClose }: BottomSheetPortalProps) => {
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      bottomSheetRef.current &&
      !bottomSheetRef.current.contains(e.target as Node)
    ) {
      onClose();
    }
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-ct-black-100/50 z-[9999]"
        onClick={handleOutsideClick}
      >
        <motion.div
          ref={bottomSheetRef}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 min-h-[300px] rounded-t-[30px] bg-ct-white ct-center px-[30px] py-[45px]"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default BottomSheetPortal;
