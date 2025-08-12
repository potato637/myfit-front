import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useRef, useState } from "react";

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

interface User {
  name: string;
  profileImage: string;
  job: string;
  serviceId?: number;
}

interface Post {
  images: string[];
  timeAgo: string;
  likes: number;
  comments: number;
  content: string;
  tags: string[];
  isLiked: boolean;
}

function FeedTagContainer({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1 text-ct-sub-blue-200 text-body1">
      {tags.map((tag, idx) => (
        <span key={idx}>#{tag}</span>
      ))}
    </div>
  );
}

function FeedCard({
  user,
  post,
  onCommentClick,
  onLikeClick,
  onProfileClick,
}: {
  user: User;
  post: Post;
  onCommentClick?: () => void;
  onLikeClick?: () => void;
  onProfileClick?: () => void;
}) {
  const swiperRef = useRef<any>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const [paginationConfig, setPaginationConfig] = useState<any>(null);

  useEffect(() => {
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
  }, [post.images]);

  return (
    <div className="w-full bg-white rounded-[10px] flex flex-col gap-[12px]">
      {/* 사용자 정보 */}
      <div className="flex items-center gap-3">
        <img
          src={user.profileImage}
          alt="프로필 이미지"
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          onClick={onProfileClick}
        />
        <div className="flex gap-3">
          <span
            className="text-sub1 text-ct-black-100 cursor-pointer"
            onClick={onProfileClick}
          >
            {user.name}
          </span>
          <span className="text-sub2 text-ct-blue-gray-100">{user.job}</span>
        </div>
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
            {post.images.map((img, index) => (
              <SwiperSlide key={index} className="!h-auto">
                <img
                  src={img}
                  alt={`피드 이미지 ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
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
      {/* 좋아요 / 댓글 */}
      <div className="flex justify-between items-center px-3">
        <span className="text-body2 text-ct-gray-300">{post.timeAgo}</span>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <button type="button" onClick={onLikeClick}>
              <img
                src={
                  post.isLiked
                    ? "/assets/feed/filled-heart.svg"
                    : "/assets/feed/empty-heart.svg"
                }
                alt={post.isLiked ? "좋아요 취소" : "좋아요"}
                className="w-5 h-5"
              />
            </button>
            <span className="text-body2 text-ct-black-300">{post.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <button type="button" onClick={onCommentClick}>
              <img
                src="/assets/profile/chat_white.svg"
                alt="댓글"
                className="w-5 h-5"
              />
            </button>
            <span className="text-body2 text-ct-black-300">
              {post.comments}
            </span>
          </div>{" "}
        </div>
      </div>
      {/* 본문 */}
      <p className="text-body2 text-ct-black-300 px-3">{post.content}</p>
      {/* 해시태그 */}
      <div className="px-3">
        <FeedTagContainer tags={post.tags} />
      </div>
    </div>
  );
}

export default FeedCard;
