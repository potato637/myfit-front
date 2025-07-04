import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBottomSheet } from "../../contexts/ui/bottomSheetContext";

function BottomSheet({ children }: { children: React.ReactNode }) {
  const { isBottomSheetOpen, setIsBottomSheetOpen } = useBottomSheet();
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsBottomSheetOpen(false);
  };
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (
      bottomSheetRef.current &&
      !bottomSheetRef.current.contains(e.target as Node)
    ) {
      handleClose();
    }
  };

  if (!isBottomSheetOpen) return null;

  return (
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
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default BottomSheet;
