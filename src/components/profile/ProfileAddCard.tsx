import { useNavigate } from "react-router-dom";

function ProfileAddCard() {
  const navigate = useNavigate();

  return (
    <div
      className="w-[174px] h-[216px] rounded-[5px] bg-ct-gray-100 ct-center"
      onClick={() => navigate("/mypage/create-card")}
    >
      <img src="/assets/onboarding/plus.svg" alt="plus" />
    </div>
  );
}

export default ProfileAddCard;
