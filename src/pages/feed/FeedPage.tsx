import { useEffect, useState } from "react";
import FeedCard from "../../components/feed/FeedCard";
import FixedHeader from "../../components/feed/FixedHeader";
import BottomNavContainer from "../../components/layouts/BottomNavContainer";
import FeedCardSkeleton from "../../components/skeletons/feed/FeedCardSkeleton";
import CommentBottomSheet from "../../components/common/CommentBottomSheet";
import CommentList from "../../components/feed/CommentList";
import { mockComments } from "../../mocks/comments";
import { mockFeeds } from "../../mocks/feed";
import CommentInput from "../../components/feed/CommentInput";

function FeedPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (text: string) => {
    console.log("댓글 작성:", text);
  };

  return (
    <BottomNavContainer showBottomNav={!isBottomSheetOpen}>
      <FixedHeader />
      <div className="pt-[66px] pb-[89px] px-[10px] bg-ct-white min-h-screen flex flex-col gap-6">
        {isLoading
          ? Array.from({ length: mockFeeds.length }).map((_, idx) => (
              <FeedCardSkeleton key={`skeleton-${idx}`} />
            ))
          : mockFeeds.map((feed) => (
              <FeedCard
                key={feed.feed_id}
                user={{
                  name: feed.user.name,
                  job: feed.user.sector,
                  profileImage: feed.user.profile_img,
                }}
                post={{
                  images: feed.images,
                  timeAgo: feed.created_at,
                  likes: feed.heart,
                  comments: feed.comment_count,
                  content: feed.feed_text,
                  tags: feed.hashtags.map((tag) => tag.replace("#", "")),
                }}
                onCommentClick={() => setIsBottomSheetOpen(true)}
              />
            ))}

        {/* 댓글 바텀시트 */}
        {isBottomSheetOpen && (
          <CommentBottomSheet
            isOpen={isBottomSheetOpen}
            onClose={() => setIsBottomSheetOpen(false)}
          >
            <div className="flex flex-col h-full">
              {/* 댓글 목록 */}
              <div className="flex-1 overflow-y-auto">
                <CommentList comments={mockComments} />
              </div>

              {/* 고정 입력창 + 버튼 */}
              <div className="sticky bottom-0 bg-white px-4 pt-2 pb-4 border-t border-gray-200">
                <div className="flex gap-2 mb-2">
                  <button className="flex-1 border rounded-full py-2 px-4 text-sm font-semibold">
                    🧳 함께 일 해보고싶어요!
                  </button>
                  <button className="flex-1 border rounded-full py-2 px-4 text-sm font-semibold">
                    ⏱ 비슷한 루틴을 원해요!
                  </button>
                </div>
                <CommentInput onSubmit={handleSubmit} />
              </div>
            </div>
          </CommentBottomSheet>
        )}
      </div>
    </BottomNavContainer>
  );
}
export default FeedPage;
