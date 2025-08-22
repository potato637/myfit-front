import { useNavigate } from "react-router-dom";

function ProfileAddCard() {
  const navigate = useNavigate();
  const screenWidth = window.innerWidth;
  const feedWidth = screenWidth * 0.49;
  return (
    <div
      className={`rounded-[5px] bg-ct-gray-100 ct-center`}
      onClick={() => navigate("/mypage/create-card")}
      style={{
        width: `${feedWidth}px`,
        height: "216px",
      }}
    >
      <img src="/assets/onboarding/plus.svg" alt="plus" />
    </div>
  );
}

export default ProfileAddCard;
