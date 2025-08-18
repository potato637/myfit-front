import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommentList from "../feed/CommentList";
import { Comment } from "../../types/feed/comment";
import CommentInputField, { CommentInputFieldRef } from "./CommentInputField";
import { createPortal } from "react-dom";
import useElementFreeze from "../../hooks/useElementFreeze";
import useKeyboardInset from "../../hooks/useKeyboardInset";

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
  freezeRootRef?: React.RefObject<HTMLElement | null>;
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
  freezeRootRef,
}: CommentModalProps) {
  const navigate = useNavigate();
  const [closing, setClosing] = useState(false);
  const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);
  const [replyToUserName, setReplyToUserName] = useState<string>("");

  // 열려있는 동안만 FeedPage 스크롤 루트를 얼림 (ref가 있을 때만)
  useElementFreeze(freezeRootRef ?? null, !closing);
  
  // 키보드 높이를 CSS 변수로 관리
  useKeyboardInset();

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
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleRequestClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const scrollableElement = modalRef.current;
    if (!scrollableElement) return;

    const handleWheel = (e: WheelEvent) => {
      const { deltaY } = e;
      const { scrollTop, scrollHeight, clientHeight } = scrollableElement;

      if (scrollTop === 0 && deltaY < 0) {
        e.preventDefault();
      }
      if (scrollTop + clientHeight >= scrollHeight - 1 && deltaY > 0) {
        // -1 to account for potential float values
        e.preventDefault();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.targetTouches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = scrollableElement;
      const touchCurrentY = e.targetTouches[0].clientY;
      const isScrollingUp = touchCurrentY > touchStartY;
      const isScrollingDown = touchCurrentY < touchStartY;

      if (scrollTop === 0 && isScrollingUp) {
        e.preventDefault();
      }

      if (scrollTop + clientHeight >= scrollHeight - 1 && isScrollingDown) {
        // -1 to account for potential float values
        e.preventDefault();
      }
    };

    scrollableElement.addEventListener("wheel", handleWheel, {
      passive: false,
    });
    scrollableElement.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    scrollableElement.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      scrollableElement.removeEventListener("wheel", handleWheel);
      scrollableElement.removeEventListener("touchstart", handleTouchStart);
      scrollableElement.removeEventListener("touchmove", handleTouchMove);
    };
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


  return createPortal(
    <AnimatePresence>
      <motion.div
        key="comment-modal-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleRequestClose}
        className="fixed z-[9999] flex items-end justify-center bg-black/50"
        style={{
          top: 0,
          left: 0,
          width: "100vw",
          height: "calc(var(--vh, 1vh) * 100)",
          overflow: "hidden",
          touchAction: "none",
        }}
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
          onClick={(e) => e.stopPropagation()}
          className="w-full bg-red-500 rounded-t-[20px] flex flex-col relative min-h-0"
          style={{
            maxHeight: "calc(var(--vh, 1vh) * 80)",
            minHeight: "calc(var(--vh, 1vh) * 50)",
            overflow: "hidden",
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
            className="flex-1 min-h-0 overflow-y-auto scrollbar-hide px-4 pt-6"
            style={{
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
              paddingBottom: "calc(80px + env(safe-area-inset-bottom, 0px) + var(--keyboard-inset, 0px))"
            }}
          >
            <CommentList
              comments={[...comments].reverse()}
              onReplyClick={(commentId, userName) => {
                setReplyToCommentId(commentId);
                setReplyToUserName(userName);
                inputRef.current?.setText(`@${userName} `);
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

          {/* 인풋바: 하단 고정 */}
          <div
            ref={footerRef}
            className="absolute left-0 right-0 bg-white px-4 pt-2 pb-4 space-y-2 border-t border-gray-200 z-[120]"
            style={{
              bottom: "calc(env(safe-area-inset-bottom, 0px) + var(--keyboard-inset, 0px))",
              transform: "translateZ(0)"
            }}
          >
            <CommentInputField
              ref={inputRef}
              onFocus={() => {
                const el = modalRef.current;
                if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
              }}
              onSend={(text) => {
                if (replyToCommentId) {
                  onReplyCreate(text, replyToCommentId);
                  setReplyToCommentId(null);
                  setReplyToUserName("");
                } else {
                  onCommentCreate(text);
                }
                inputRef.current?.setText("");
                requestAnimationFrame(() => {
                  const el = modalRef.current;
                  if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
                });
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
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
