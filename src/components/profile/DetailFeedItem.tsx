import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import FeedTagContainer from "./FeedTagContainer";
import { useEffect, useRef, useState } from "react";
import { FeedItem } from "../../apis/mypageAPI";
import { useBottomSheet } from "../../contexts/ui/bottomSheetContext";
import { useItemContext } from "../../contexts/ItemContext";
import { formatTimeAgo } from "../../utils/date";
import { useLocation } from "react-router-dom";
import { useAddFeedLike, useDeleteFeedLike } from "../../hooks/relationQueries";
import { useAuth } from "../../contexts/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createComment, deleteComment, getFeedComments } from "../../apis/feed";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import CommentModal from "../feed/CommentModal";
import BottomSheetContent from "./BottomSheetContent";

const bulletStyles = `
  .swiper-pagination-bullet {
    width: 12px;
    height: 4px;
    border-radius: 2px;
    background: #E5E7EB;
    opacity: 1;
    transition: all 0.3s ease;
    margin: 0 2px !important;
  }
  .swiper-pagination-bullet-active {
    width: 20px;
    background: #3B82F6;
  }
`;

function DetailFeedItem({ item }: { item: FeedItem }) {
  const swiperRef = useRef<any>(null);
  const { openBottomSheet } = useBottomSheet();
  const { setItemId } = useItemContext();
  const location = useLocation();
  const isMine = location.pathname.startsWith("/mypage");
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const handleClick = () => {
    openBottomSheet(<BottomSheetContent type="feed" />);
    setItemId(item.feed_id);
  };

  const { mutate: addFeedLike } = useAddFeedLike({
    service_id: user?.id?.toString() || "",
  });
  const { mutate: deleteFeedLike } = useDeleteFeedLike({
    service_id: user?.id?.toString() || "",
  });
  const handleHeartClick = () => {
    if (item.is_liked) {
      deleteFeedLike({ feed_id: item.feed_id });
    } else {
      addFeedLike({ feed_id: item.feed_id });
    }
  };

  // 댓글 작성 mutation
  const createCommentMutation = useMutation({
    mutationFn: ({
      feedId,
      commentText,
    }: {
      feedId: number;
      commentText: string;
    }) =>
      createComment(feedId, {
        comment_text: commentText,
        high_comment_id: null,
      }),
    onSuccess: () => {
      // 댓글 작성 성공 시 댓글 목록과 피드 목록 모두 새로고침
      queryClient.invalidateQueries({ queryKey: ["comments", item.feed_id] });
      queryClient.invalidateQueries({ queryKey: ["feeds"] }); // 댓글 개수 업데이트
    },
    onError: (error) => {
      console.error("댓글 작성 실패:", error);
    },
  });

  // 대댓글 작성 mutation
  const createReplyMutation = useMutation({
    mutationFn: ({
      feedId,
      commentText,
      parentCommentId,
    }: {
      feedId: number;
      commentText: string;
      parentCommentId: number;
    }) =>
      createComment(feedId, {
        comment_text: commentText,
        high_comment_id: parentCommentId,
      }),
    onSuccess: () => {
      // 대댓글 작성 성공 시 댓글 목록과 피드 목록 모두 새로고침
      queryClient.invalidateQueries({ queryKey: ["comments", item.feed_id] });
      queryClient.invalidateQueries({ queryKey: ["feeds"] }); // 댓글 개수 업데이트
    },
    onError: (error) => {
      console.error("대댓글 작성 실패:", error);
    },
  });

  // 댓글 작성 핸들러
  const handleCommentCreate = (commentText: string) => {
    if (item.feed_id && commentText.trim()) {
      createCommentMutation.mutate({
        feedId: Number(item.feed_id),
        commentText: commentText.trim(),
      });
    }
  };

  // 대댓글 작성 핸들러
  const handleReplyCreate = (commentText: string, parentCommentId: number) => {
    if (item.feed_id && commentText.trim()) {
      createReplyMutation.mutate({
        feedId: Number(item.feed_id),
        commentText: commentText.trim(),
        parentCommentId,
      });
    }
  };

  // 댓글 삭제 mutation
  const deleteCommentMutation = useMutation({
    mutationFn: ({ commentId }: { commentId: number }) =>
      deleteComment(Number(item.feed_id), commentId),
    onSuccess: () => {
      // 댓글 삭제 성공 시 댓글 목록과 피드 목록 모두 새로고침
      queryClient.invalidateQueries({ queryKey: ["comments", item.feed_id] });
      queryClient.invalidateQueries({ queryKey: ["feeds"] }); // 댓글 개수 업데이트
    },
    onError: (error) => {
      console.error("댓글 삭제 실패:", error);
    },
  });

  // 댓글 삭제 핸들러
  const handleCommentDelete = (commentId: number) => {
    deleteCommentMutation.mutate({ commentId });
  };

  // 활성화된 댓글 모달의 댓글 데이터
  const { data: commentsData } = useQuery({
    queryKey: ["comments", item.feed_id],
    queryFn: () => getFeedComments({ feedId: Number(item.feed_id) }),
    enabled: !!item.feed_id, // activePostId가 있을 때만 실행
  });

  const paginationRef = useRef<HTMLDivElement>(null);
  const [paginationConfig, setPaginationConfig] = useState<any>(null);

  useEffect(() => {
    // 컴포넌트가 마운트된 후에만 pagination 설정
    if (paginationRef.current) {
      setPaginationConfig({
        clickable: true,
        el: paginationRef.current,
        bulletClass: "swiper-pagination-bullet",
        bulletActiveClass: "swiper-pagination-bullet-active",
        type: "bullets" as const,
        dynamicBullets: true,
        dynamicMainBullets: 4,
        renderBullet: function (_: number, className: string) {
          return '<span class="' + className + '"></span>';
        },
      });
    }
  }, [item.images]); // item.images가 변경될 때마다 다시 설정

  return (
    <div className="w-full h-auto bg-ct-white rounded-[10px] p-[16px] flex flex-col gap-[10px] items-center">
      <div className="w-full h-[30px] px-[5px] py-[14px] flex items-center justify-between">
        <span className="text-ct-main-blue-100 text-body1">활동 피드</span>
        {isMine && (
          <img
            src="/assets/profile/settingIcon.svg"
            alt="설정"
            onClick={handleClick}
          />
        )}
      </div>
      <div className="w-full flex flex-col items-center">
        <style>{bulletStyles}</style>
        <div className="w-full relative pb-8">
          {" "}
          <Swiper
            ref={swiperRef}
            modules={[Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            centeredSlides={true}
            pagination={paginationConfig || false}
          >
            {item.images.map((img) => (
              <SwiperSlide key={img} className="!h-auto">
                <img
                  className="w-[353px] h-[359px] rounded-[5px] object-cover"
                  src={img}
                  alt="활동 카드 이미지"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            ref={paginationRef}
            className="swiper-pagination absolute bottom-2 left-0 right-0"
          ></div>
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <div>
          <span className="text-ct-gray-200 text-sub2">
            {formatTimeAgo(item.created_at)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1" onClick={handleHeartClick}>
            <img
              src={
                item.is_liked
                  ? "/assets/profile/heart.svg"
                  : "/assets/profile/heart-white.svg"
              }
              alt="좋아요"
              className="w-[20px] h-[20px]"
            />
            <span className="text-ct-black-300 text-body2">{item.heart}</span>
          </div>
          <div
            className="flex items-center gap-1"
            onClick={() => setActivePostId(item.feed_id.toString())}
          >
            <img
              src="/assets/profile/chat_white.svg"
              alt="댓글"
              className="w-[20px] h-[20px]"
            />
            <span className="text-ct-black-300 text-body2">
              {item.comment_count}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full">
        <p className="text-ct-black-300 text-body2">{item.feed_text}</p>
      </div>
      <FeedTagContainer tags={item.hashtags} />

      <AnimatePresence>
        {activePostId && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePostId(null)}
            />
            <CommentModal
              postId={activePostId}
              comments={commentsData?.result?.feeds || []}
              onClose={() => setActivePostId(null)}
              onCommentCreate={handleCommentCreate}
              onReplyCreate={handleReplyCreate}
              onCommentDelete={handleCommentDelete}
              currentUserId={user?.id}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DetailFeedItem;
