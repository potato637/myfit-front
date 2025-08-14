import { SectorBaseSearchingItem } from "../../apis/searchingAPI";
import { useNavigate } from "react-router-dom";
import { getActivityCard } from "../../apis/mypageAPI";
import { useState } from "react";

function SearchingListItem({ card }: { card: SectorBaseSearchingItem }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleCardClick = async () => {
    console.log("🎯 카드 클릭됨!", { card_id: card.card_id, author_name: card.author_name });
    
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      console.log("📡 API 호출 시작:", card.card_id);
      
      // 카드 상세 정보 조회해서 작성자 ID 획득
      const cardDetail = await getActivityCard(card.card_id);
      console.log("✅ API 응답 성공:", cardDetail);
      
      const authorId = cardDetail.result.card.writer.id;
      const targetUrl = `/feed/profile/${authorId}/card#${card.card_id}`;
      
      console.log("🚀 네비게이션:", targetUrl);
      
      // 해당 유저의 프로필 페이지 카드 탭으로 이동, 해시로 특정 카드 지정
      navigate(targetUrl);
    } catch (error) {
      console.error("❌ 카드 상세 정보 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={`w-[160px] h-[220px] rounded-[5px] cursor-pointer transition-opacity relative ${
        isLoading ? 'opacity-50' : 'hover:opacity-80'
      }`}
      onClick={handleCardClick}
    >
      <img
        src={card.card_img}
        alt="카드 이미지"
        className="w-full h-full object-cover"
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-ct-main-blue-200 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

export default SearchingListItem;
