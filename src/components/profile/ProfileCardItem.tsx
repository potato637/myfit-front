import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CardItem } from "../../apis/mypageAPI";

function ProfileCardItem({
  card,
  serviceId,
}: {
  card: CardItem;
  serviceId?: string;
}) {
  const [isHighlight, _] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const navigate = useNavigate();
  const handleClick = () => {
    if (serviceId) {
      navigate(`/${path}/profile/${serviceId}/card#${card.id}`);
    } else {
      navigate(`/${path}/card#${card.id}`);
    }
  };
  const screenWidth = window.innerWidth;
  const feedWidth = screenWidth * 0.4;

  return (
    <div
      className={`w-[${feedWidth}px] h-[216px] relative`}
      onClick={handleClick}
    >
      {isHighlight && (
        <img
          src="/assets/profile/bestCard.svg"
          alt="하이라이트"
          className="absolute top-0 left-0"
        />
      )}
      <img
        src={card.card_img}
        alt="카드 이미지"
        className="w-full h-full object-cover rounded-[5px]"
      />
    </div>
  );
}

export default ProfileCardItem;
