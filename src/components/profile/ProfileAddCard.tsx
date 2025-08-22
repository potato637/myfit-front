import { useNavigate } from "react-router-dom";

function ProfileAddCard() {
  const navigate = useNavigate();
  const screenWidth = window.innerWidth;
  const feedWidth = screenWidth * 0.43;
  return (
    <div
      className={`w-[${feedWidth}px] h-[216px] rounded-[5px] bg-ct-gray-100 ct-center`}
      onClick={() => navigate("/mypage/create-card")}
    >
      <img src="/assets/onboarding/plus.svg" alt="plus" />
    </div>
  );
}

export default ProfileAddCard;
