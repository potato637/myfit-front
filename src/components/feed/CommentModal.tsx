// CommentModal.tsx - 바텀시트 스타일 모달 컴포넌트
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CommentList from "../feed/CommentList";
import { Comment } from "../../types/feed/comment";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import CommentSuggestions from "./CommentSuggestions";
import CommentInputField, { CommentInputFieldRef } from "./CommentInputField";

interface CommentModalProps {
  postId: string;
  comments: Comment[];
  onClose: () => void;
}

export default function CommentModal({
  postId,
  comments,
  onClose,
}: CommentModalProps) {
  const [closing, setClosing] = useState(false);

  const handleRequestClose = () => setClosing(true);

  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<CommentInputFieldRef>(null);

  useEffect(() => {
    const target = modalRef.current;
    if (target) disableBodyScroll(target);
    return () => {
      if (target) enableBodyScroll(target);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleRequestClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <motion.section
      key="comment-modal-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleRequestClose} // 👈 배경 누르면 닫
      className="fixed inset-0 z-50 flex items-end justify-center"
    >
      <motion.div
        key="comment-modal"
        initial={{ y: "100%", opacity: 0 }}
        animate={closing ? { y: "100%", opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{
          y: { type: "spring", damping: 25, stiffness: 300, mass: 0.5 },
          opacity: { duration: 0.25, ease: "easeOut" },
        }}
        onAnimationComplete={() => {
          if (closing) onClose();
        }}
        onClick={(e) => e.stopPropagation()} // 👈 모달 내부 클릭은 전파 방지
        className="w-full h-[75vh] max-h-[65vh] bg-white rounded-t-[20px] flex flex-col"
      >
        {/* 핸들바 */}
        <div className="w-full flex justify-center py-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>
        {/* 헤더 */}
        <div className="text-center py-3 border-b border-gray-200 relative">
          <h2 className="text-base font-semibold">댓글</h2>
          <button
            onClick={handleRequestClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400"
          >
            닫기
          </button>
        </div>
        {/* 댓글 목록 */}
        <div
          ref={modalRef}
          className="flex-1 overflow-y-auto px-4 pt-6 pb-[160px] scrollbar-hide"
        >
          <CommentList comments={comments} />
        </div>
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white px-4 pt-2 pb-4 space-y-2 border-t border-gray-200">
          <CommentSuggestions
            onSelect={(label) => inputRef.current?.setText(label)}
          />
          <CommentInputField
            ref={inputRef}
            onSend={(text) => console.log(`[${postId}] 댓글 작성:`, text)}
          />
        </div>{" "}
      </motion.div>
    </motion.section>
  );
}
