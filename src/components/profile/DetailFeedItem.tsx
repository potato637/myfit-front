import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import FeedTagContainer from "./FeedTagContainer";
import { useEffect, useRef, useState } from "react";

const imgList = [
  "/assets/profile/feed.jpg",
  "/assets/profile/profileImage.png",
  "/assets/profile/feed.jpg",
];

function DetailFeedItem() {
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
        }}
        className="mySwiper w-[343px] h-[359px]"
      >
        {imgList.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              className="w-[343px] h-[359px] rounded-[5px] object-cover"
              src={img}
              alt="활동 카드 이미지"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div ref={paginationRef} className="flex justify-center gap-1" />
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
        <p className="text-ct-black-300 text-body2">
          아침엔 트렌드 체크, 점심 전엔 경쟁 서비스 분석,오후엔 사용자 리서치
          인터뷰. 집중하려면 역시 인사동 카페 자유로운
        </p>
      </div>
      <FeedTagContainer />
    </div>
  );
}

export default DetailFeedItem;
