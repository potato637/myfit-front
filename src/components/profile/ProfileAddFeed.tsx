import { useNavigate } from "react-router-dom";

function ProfileAddFeed() {
  const navigate = useNavigate();
  const screenWidth = window.innerWidth;
  const feedWidth = screenWidth * 0.32;
  return (
    <div
      className={`w-[${feedWidth}px] h-[128px] rounded-[5px] bg-ct-gray-100 ct-center`}
      onClick={() => navigate("/feed/post")}
    >
      <img src="/assets/onboarding/plus.svg" alt="plus" />
    </div>
  );
}

export default ProfileAddFeed;
