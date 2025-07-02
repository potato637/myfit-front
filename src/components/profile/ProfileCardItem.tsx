import { useNavigate } from "react-router-dom";

function ProfileCardItem() {
  // navigate
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/mypage/card");
  };

  return (
    <div className="w-[174px] h-[216px]" onClick={handleClick}>
      <img
        src="/assets/profile/card.jpg"
        alt="카드 이미지"
        className="w-full h-full object-cover rounded-[5px]"
      />
    </div>
  );
}

export default ProfileCardItem;
