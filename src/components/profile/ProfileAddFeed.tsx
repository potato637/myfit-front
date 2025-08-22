import { useNavigate } from "react-router-dom";

function ProfileAddFeed() {
  const navigate = useNavigate();
  const screenWidth = window.innerWidth;
  const feedWidth = screenWidth * 0.32;
  return (
    <div
      className={`rounded-[5px] bg-ct-gray-100 ct-center`}
      onClick={() => navigate("/feed/post")}
      style={{
        width: `${feedWidth}px`,
        height: "128px",
      }}
    >
      <img src="/assets/onboarding/plus.svg" alt="plus" />
    </div>
  );
}

export default ProfileAddFeed;
