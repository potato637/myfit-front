// CommentModal.tsx - 바텀시트 스타일 모달 컴포넌트
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommentList from "../feed/CommentList";
import { Comment } from "../../types/feed/comment";
// import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import CommentInputField, { CommentInputFieldRef } from "./CommentInputField";

interface CommentModalProps {
  postId: string;
  comments: Comment[];
  onClose: () => void;
  onCommentCreate: (commentText: string) => void;
  onReplyCreate: (commentText: string, parentCommentId: number) => void;
  onCommentDelete?: (commentId: number) => void;
  currentUserId?: number;
  postOwnerId?: number;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export default function CommentModal({
  comments,
  onClose,
  onCommentCreate,
  onReplyCreate,
  onCommentDelete,
  currentUserId,
  postOwnerId,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: CommentModalProps) {
  const navigate = useNavigate();
  const [closing, setClosing] = useState(false);
  const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);
  const [replyToUserName, setReplyToUserName] = useState<string>("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const handleRequestClose = () => setClosing(true);

  // 프로필 클릭 핸들러
  const handleProfileClick = (userId: number) => {
    // 내 프로필이라면 마이페이지로, 다른 사람 프로필이라면 해당 사용자 프로필로 이동
    const isMyProfile = userId === currentUserId;
    const targetPath = isMyProfile ? "/mypage" : `/feed/profile/${userId}`;
    navigate(targetPath);
  };

  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<CommentInputFieldRef>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 스크롤바 너비 계산
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // body 스크롤 차단 및 레이아웃 시프트 방지
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  // 키보드 높이 감지 (모바일용)
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const vh = window.visualViewport?.height || window.innerHeight;
        const windowHeight = window.screen.height;
        const keyboardHeight = Math.max(0, windowHeight - vh - 100); // 100px 여유값
        setKeyboardHeight(keyboardHeight);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      return () => window.visualViewport?.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleRequestClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 무한스크롤 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (
          target.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          fetchNextPage
        ) {
          console.log("🔄 댓글 무한스크롤: 다음 페이지 로드");
          fetchNextPage();
        }
      },
      {
        root: modalRef.current,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <motion.section
      key="comment-modal-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleRequestClose} // 👈 배경 누르면 닫
      className={`fixed inset-0 z-50 flex justify-center ${keyboardHeight > 0 ? 'items-start pt-8' : 'items-end'}`}
    >
      <motion.div
        key="comment-modal"
        initial={{ y: keyboardHeight > 0 ? "-100%" : "100%", opacity: 0 }}
        animate={closing 
          ? { y: keyboardHeight > 0 ? "-100%" : "100%", opacity: 0 } 
          : { y: 0, opacity: 1 }}
        transition={{
          y: { type: "spring", damping: 25, stiffness: 300, mass: 0.5 },
          opacity: { duration: 0.25, ease: "easeOut" },
        }}
        onAnimationComplete={() => {
          if (closing) onClose();
        }}
        onClick={(e) => e.stopPropagation()} // 👈 모달 내부 클릭은 전파 방지
        className="w-full bg-white rounded-t-[20px] flex flex-col"
        style={{
          height: keyboardHeight > 0 
            ? `calc(100vh - ${keyboardHeight}px - 60px)` 
            : '75vh',
          maxHeight: keyboardHeight > 0 
            ? `calc(100vh - ${keyboardHeight}px - 60px)` 
            : '65vh'
        }}
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
          <CommentList
            comments={comments}
            onReplyClick={(commentId, userName) => {
              setReplyToCommentId(commentId);
              setReplyToUserName(userName);
              // 답글 대상 사용자명을 입력 필드에 미리 채우기
              inputRef.current?.setText(`@${userName} `);
              // 입력 필드에 포커스
              inputRef.current?.focus();
            }}
            onDeleteClick={onCommentDelete}
            onProfileClick={handleProfileClick}
            currentUserId={currentUserId}
            postOwnerId={postOwnerId}
          />

          {/* 무한스크롤 트리거 */}
          <div
            ref={loadMoreRef}
            className="h-4 flex items-center justify-center py-4"
          >
            {isFetchingNextPage && (
              <div className="text-gray-400 text-sm">
                댓글을 더 불러오는 중...
              </div>
            )}
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white px-4 pt-2 pb-4 space-y-2 border-t border-gray-200">
          <CommentInputField
            ref={inputRef}
            onSend={(text) => {
              if (replyToCommentId) {
                onReplyCreate(text, replyToCommentId);
                setReplyToCommentId(null);
                setReplyToUserName("");
              } else {
                onCommentCreate(text);
              }
              // 전송 후 입력 필드 초기화 (CommentInputField에서 이미 처리되지만 명시적으로)
              inputRef.current?.setText("");
            }}
          />
          {replyToCommentId && (
            <div className="flex items-center justify-between text-sm text-ct-gray-300 mb-2">
              <span>{replyToUserName}님에게 답글 작성 중...</span>
              <button
                onClick={() => {
                  setReplyToCommentId(null);
                  setReplyToUserName("");
                  inputRef.current?.setText("");
                }}
                className="text-ct-main-blue-100 hover:underline"
              >
                취소
              </button>
            </div>
          )}
        </div>{" "}
      </motion.div>
    </motion.section>
  );
}
