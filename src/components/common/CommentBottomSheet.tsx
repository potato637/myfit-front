import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function CommentBottomSheet({ isOpen, onClose, children }: Props) {
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = scrollableRef.current;

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as Node;

      if (
        scrollableRef.current &&
        (target === scrollableRef.current ||
          scrollableRef.current.contains(target))
      ) {
        // 내부 스크롤 영역이면 그대로 진행
        return;
      }

      e.preventDefault(); // 외부 스크롤 막기
    };
    if (isOpen && target) {
      disableBodyScroll(scrollableRef.current!);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    }

    return () => {
      enableBodyScroll(target!);
      document.removeEventListener("touchmove", handleTouchMove);
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

          {/* 바텀시트 본체 */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 w-full h-[85vh] max-h-[85vh] bg-white rounded-t-[20px] flex flex-col"
          >
            {/* 드래그 핸들 */}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100) onClose();
              }}
              className="cursor-grab py-2"
            >
              <div className="w-full flex justify-center">
                <div className="w-[40px] h-[4px] bg-gray-300 rounded-full" />
              </div>
            </motion.div>

            {/* 헤더 */}
            <div className="text-center py-3 border-b border-gray-200">
              <h2 className="text-h2 text-ct-black-100">댓글</h2>
            </div>

            {/* 내부 콘텐츠 (스크롤 가능) */}
            <div
              ref={scrollableRef}
              className="flex-1 overflow-y-auto px-4 pt-[23px] pb-[20px]"
              style={{
                position: "relative",
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
                touchAction: "pan-y",
              }}
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CommentBottomSheet;
