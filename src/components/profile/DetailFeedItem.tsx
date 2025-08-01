import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import FeedTagContainer from "./FeedTagContainer";
import { useEffect, useRef, useState } from "react";

import { FeedItem } from "../../apis/mypageAPI";
function DetailFeedItem({ item }: { item: FeedItem }) {
  const [_, setIsReady] = useState(false);
  const paginationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 그냥 paginationRef를 가지는 Div가 생성된 뒤에 리렌더링 시켜서 el: paginationRef.current가 제대로 작동하게끔 함
    setIsReady(true);
  }, []);

  return (
    <div className="w-full h-auto bg-ct-white rounded-[10px] p-[16px] flex flex-col gap-[10px] items-center">
      <div className="w-full h-[30px] px-[5px] py-[14px] flex items-center justify-between">
        <span className="text-ct-main-blue-100 text-body1">활동 카드 1</span>
        <img src="/assets/profile/settingIcon.svg" alt="설정" />
      </div>
      <Swiper
        modules={[Pagination]}
        pagination={{
          el: paginationRef.current,
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 4,
        }}
        className="mySwiper w-[343px] h-[359px]"
      >
        {item.images.map((img) => (
          <SwiperSlide key={img}>
            <img
              className="w-[343px] h-[359px] rounded-[5px] object-cover"
              src={img}
              alt="활동 카드 이미지"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="w-full h-[10px] relative">
        <div ref={paginationRef} className="absolute" />
      </div>
      <div className="w-full flex justify-between items-center">
        <div>
          <span className="text-ct-gray-200 text-sub2">30분 전</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <img
              src="/assets/profile/heart.svg"
              alt="좋아요"
              className="w-[20px] h-[20px]"
            />
            <span className="text-ct-black-300 text-body2">10</span>
          </div>
          <div className="flex items-center gap-1">
            <img
              src="/assets/profile/chat_white.svg"
              alt="댓글"
              className="w-[20px] h-[20px]"
            />
            <span className="text-ct-black-300 text-body2">10</span>
          </div>
        </div>
      </div>
      <div className="w-full">
        <p className="text-ct-black-300 text-body2">{item.feed_text}</p>
      </div>
      <FeedTagContainer />
    </div>
  );
}

export default DetailFeedItem;
