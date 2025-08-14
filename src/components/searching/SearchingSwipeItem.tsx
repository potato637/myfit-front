import { SectorBaseSearchingItem } from "../../apis/searchingAPI";
import { useNavigate } from "react-router-dom";
import { getActivityCard } from "../../apis/mypageAPI";
import { useState } from "react";

function SearchingSwipeItem({ card }: { card: SectorBaseSearchingItem }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleCardClick = async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      // 카드 상세 정보 조회해서 작성자 ID 획득
      const cardDetail = await getActivityCard(card.card_id);
      const authorId = cardDetail.result.card.writer.id;
      
      // 해당 유저의 프로필 페이지 카드 탭으로 이동, 해시로 특정 카드 지정
      navigate(`/feed/profile/${authorId}/card#${card.card_id}`);
    } catch (error) {
      console.error("카드 상세 정보 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={`w-[300px] h-[570px] flex flex-col items-center rounded-[16px] py-[16px] px-[10px] shadow-find-card cursor-pointer transition-opacity relative ${
        isLoading ? 'opacity-50' : 'hover:opacity-95'
      }`}
      onClick={handleCardClick}
    >
      <div className="w-full flex flex-col gap-[8px]">
        <div className="flex justify-start items-end">
          <span className="text-h1 text-ct-black-100">{card.author_name}</span>
          <span className="text-sub1 font-bold text-ct-black-100 ml-[5px]">
            {`(${card.recruiting_status})`}
          </span>
        </div>
        <div className="w-full flex gap-[4px] justify-start items-center flex-wrap">
          {card.keywords.map((keyword, index) => (
            <div
              key={index}
              className="px-[9px] py-[2px] bg-ct-gray-100 rounded-[5px]"
            >
              <span className="text-body2 text-ct-main-blue-100">
                #{keyword}
              </span>
            </div>
          ))}
        </div>
        <img
          src={card.card_img}
          className="w-full h-[430px] object-cover rounded-[8px]"
          alt="card"
        />
        <div className="w-full p-[12px] bg-ct-gray-100 flex flex-col rounded-[5px] gap-2">
          <span className="text-sub1 text-ct-black-100">한줄 소개</span>
          <span className="text-body3 text-ct-black-200">
            {card.one_line_profile}
          </span>
        </div>
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-[16px]">
          <div className="w-8 h-8 border-2 border-ct-main-blue-200 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

export default SearchingSwipeItem;
