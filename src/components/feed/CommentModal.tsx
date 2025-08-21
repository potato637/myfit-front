import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommentList from "../feed/CommentList";
import { Comment } from "../../types/feed/comment";
import CommentInputField, { CommentInputFieldRef } from "./CommentInputField";
import CommentSkeleton from "../skeletons/feed/CommentSkeleton";
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
  isLoading?: boolean;
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
  isLoading,
  freezeRootRef,
}: CommentModalProps) {
  const navigate = useNavigate();
  const [closing, setClosing] = useState(false);
  const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);
  const [replyToUserName, setReplyToUserName] = useState<string>("");
  const [keyboardActive, setKeyboardActive] = useState(false);
  const [modalHeight, setModalHeight] = useState(70); // 초기 높이 70vh
  const [preKeyboardHeight, setPreKeyboardHeight] = useState<number | null>(null); // 키보드 활성화 전 높이 저장
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(70);
  const [dragStartTime, setDragStartTime] = useState(0);
  const [lastMoveY, setLastMoveY] = useState(0);
  
  // 스냅포인트 정의
  const SNAP_POINTS = {
    MEDIUM: 60,  // 중간 높이
    LARGE: 85,   // 큰 높이 (키보드 비활성화시 90)
    CLOSE_THRESHOLD: 40  // 이 높이 이하로 내려가면 모달 닫기
  };

  // 키보드가 활성화되면 freeze 해제, 아니면 모달 열려있는 동안 freeze
  useElementFreeze(freezeRootRef ?? null, !closing && !keyboardActive);
  
  // 키보드 높이를 CSS 변수로 관리
  useKeyboardInset();

  const handleRequestClose = () => setClosing(true);

  // 드래그 시작
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setLastMoveY(e.touches[0].clientY);
    setStartHeight(modalHeight);
    setDragStartTime(Date.now());
  };

  // 드래그 중
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    setLastMoveY(currentY);
    
    const deltaY = startY - currentY; // 위로 드래그하면 +, 아래로 드래그하면 -
    const deltaVh = (deltaY / window.innerHeight) * 100; // px를 vh로 변환
    
    let newHeight = startHeight + deltaVh;
    // 키보드 활성화 시 safe area를 고려한 최대 높이 제한
    const maxHeight = keyboardActive ? SNAP_POINTS.LARGE : 90;
    newHeight = Math.max(20, Math.min(maxHeight, newHeight)); // 최소값을 20으로 낮춤
    
    setModalHeight(newHeight);
  };

  // 스냅포인트로 이동하는 함수
  const snapToClosestPoint = (currentHeight: number, velocity: number) => {
    // 빠른 아래 스와이프 감지 (velocity가 양수면 아래로 스와이프)
    if (velocity > 500) {
      handleRequestClose();
      return;
    }
    
    // 빠른 위 스와이프는 최대 높이로
    if (velocity < -500) {
      const maxHeight = keyboardActive ? SNAP_POINTS.LARGE : 90;
      setModalHeight(maxHeight);
      return;
    }
    
    // 임계값 이하면 모달 닫기
    if (currentHeight <= SNAP_POINTS.CLOSE_THRESHOLD) {
      handleRequestClose();
      return;
    }
    
    // 가장 가까운 스냅포인트 찾기
    const maxHeight = keyboardActive ? SNAP_POINTS.LARGE : 90;
    const snapPoints = [SNAP_POINTS.MEDIUM, SNAP_POINTS.LARGE];
    if (!keyboardActive) {
      snapPoints.push(90);
    }
    
    let closestPoint = SNAP_POINTS.MEDIUM;
    let minDistance = Math.abs(currentHeight - SNAP_POINTS.MEDIUM);
    
    snapPoints.forEach(point => {
      const distance = Math.abs(currentHeight - point);
      if (distance < minDistance) {
        closestPoint = point;
        minDistance = distance;
      }
    });
    
    setModalHeight(closestPoint);
  };

  // 드래그 종료
  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    // velocity 계산 (px/ms)
    const dragDuration = Date.now() - dragStartTime;
    const dragDistance = lastMoveY - startY; // 아래로 이동하면 양수
    const velocity = dragDistance / Math.max(dragDuration, 1); // 0으로 나누기 방지
    
    snapToClosestPoint(modalHeight, velocity);
    setIsDragging(false);
  };

  // 마우스 이벤트 (데스크톱 지원)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setLastMoveY(e.clientY);
    setStartHeight(modalHeight);
    setDragStartTime(Date.now());
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const currentY = e.clientY;
    setLastMoveY(currentY);
    
    const deltaY = startY - currentY;
    const deltaVh = (deltaY / window.innerHeight) * 100;
    
    let newHeight = startHeight + deltaVh;
    // 키보드 활성화 시 safe area를 고려한 최대 높이 제한
    const maxHeight = keyboardActive ? SNAP_POINTS.LARGE : 90;
    newHeight = Math.max(20, Math.min(maxHeight, newHeight));
    
    setModalHeight(newHeight);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    // velocity 계산 (px/ms)
    const dragDuration = Date.now() - dragStartTime;
    const dragDistance = lastMoveY - startY;
    const velocity = dragDistance / Math.max(dragDuration, 1);
    
    snapToClosestPoint(modalHeight, velocity);
    setIsDragging(false);
  };


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
          height: "100vh",
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
          className="w-full bg-white rounded-t-[20px] flex flex-col relative min-h-0"
          style={{
            height: `${modalHeight}vh`,
            overflow: "hidden",
            transition: isDragging ? "none" : "height 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
          }}
        >
          {/* 핸들바 */}
          <div 
            className="w-full flex justify-center py-2 cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
          </div>
          {/* 헤더 */}
          <div 
            className="text-center py-3 border-b border-gray-200 relative cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
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
              paddingBottom: keyboardActive 
                ? "calc(80px + var(--keyboard-inset, 0px) + env(safe-area-inset-bottom, 0px) + 20px)" // 키보드 활성시 추가 여백
                : "80px" // 키보드 비활성시 기본 여백 (safe-area 고려 안함)
            }}
          >
            {isLoading ? (
              <CommentSkeleton />
            ) : (
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
            )}

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
              bottom: keyboardActive 
                ? "calc(var(--keyboard-inset, 0px) + env(safe-area-inset-bottom, 0px) + 20px)" // 키보드 활성시 20px 더 높이
                : "0px", // 키보드 비활성시 하단 고정 (safe-area 고려 안함)
              transform: "translateZ(0)"
            }}
          >
            <CommentInputField
              ref={inputRef}
              onFocus={() => {
                setKeyboardActive(true);
                
                // 키보드 활성화 전 현재 높이 저장
                setPreKeyboardHeight(modalHeight);
                
                // 키보드 활성화 시 모달 높이를 스마트하게 조정
                // 현재 높이가 80vh보다 크면 적절한 크기로 줄이기
                if (modalHeight > 80) {
                  setModalHeight(75); // 키보드 공간을 고려한 적절한 크기
                } else if (modalHeight > 75) {
                  setModalHeight(70); // 약간 작은 모달도 조금 줄이기
                }
                
                const el = modalRef.current;
                if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
              }}
              onBlur={() => {
                setKeyboardActive(false);
                
                // 키보드 비활성화 시 원래 높이로 복원
                if (preKeyboardHeight !== null) {
                  setModalHeight(preKeyboardHeight);
                  setPreKeyboardHeight(null);
                }
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
