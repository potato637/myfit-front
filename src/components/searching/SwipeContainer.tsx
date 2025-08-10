import { SectorBaseSearchingItem } from "../../apis/searchingAPI";
import SearchingSwipeItem from "./SearchingSwipeItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useRef } from "react";

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

function SwipeContainer({
  cards,
  isLoading,
  hasNextPage,
  fetchNextPage,
}: {
  cards: SectorBaseSearchingItem[];
  isLoading: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}) {
  const swiperRef = useRef<any>(null);

  // 마지막 3번째 아이템에 도달했을 때 새로운 데이터 요청
  const handleSlideChange = (swiper: any) => {
    const currentIndex = swiper.activeIndex;
    const totalSlides = cards.length;

    // 마지막 3번째 아이템에 도달했고, 다음 페이지가 있고, 로딩 중이 아닐 때
    if (currentIndex >= totalSlides - 3 && hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  // 최대 4개의 bullet만 표시
  const paginationConfig = {
    clickable: true,
    el: ".swiper-pagination",
    bulletClass: "swiper-pagination-bullet",
    bulletActiveClass: "swiper-pagination-bullet-active",
    type: "bullets" as const,
    dynamicBullets: true,
    dynamicMainBullets: 4, // 최대 4개의 bullet만 표시
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '"></span>';
    },
  };

  return (
    <div className="w-full flex flex-col items-center">
      <style>{bulletStyles}</style>
      <div className="w-[320px] relative pb-8">
        {" "}
        {/* pb-8 추가로 bullet을 위한 공간 확보 */}
        <Swiper
          ref={swiperRef}
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          centeredSlides={true}
          pagination={paginationConfig}
          onSlideChange={handleSlideChange}
        >
          {cards.map((card) => (
            <SwiperSlide key={card.card_id} className="!h-auto">
              <div className="p-[10px]">
                <SearchingSwipeItem card={card} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Bullet pagination을 Swiper 바로 아래에 배치 */}
        <div
          className="swiper-pagination absolute bottom-2 left-0 right-0"
          style={{ position: "absolute" }}
        ></div>
      </div>
    </div>
  );
}

export default SwipeContainer;
