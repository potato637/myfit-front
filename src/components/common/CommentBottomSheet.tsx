import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function CommentBottomSheet({ isOpen, onClose, children }: Props) {
  useEffect(() => {
    const preventScroll = (e: TouchEvent) => e.preventDefault();

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", preventScroll, { passive: false });
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("touchmove", preventScroll);
    };
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 오버레이 */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* 바텀시트 */}
          <motion.div
            drag="y"
            dragConstraints={{ top: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) onClose();
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 w-full h-[85vh] max-h-[85vh] bg-white rounded-t-[20px] flex flex-col"
          >
            {/* 핸들 */}
            <div className="w-full flex justify-center pt-2">
              <div className="w-[40px] h-[4px] bg-gray-300 rounded-full" />
            </div>
            {/* 헤더 */}
            <div className="text-center py-3 border-b border-gray-200">
              <h2 className="text-h2 text-ct-black-100">댓글</h2>
            </div>
            {/* 스크롤 영역 */}
            <div
              className="flex-1 overflow-y-auto px-4 pt-[23px] pb-[20px]" // <-- pb 감소
              style={{
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
              }}
            >
              {children}
            </div>{" "}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CommentBottomSheet;
