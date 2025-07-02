import { useNavigate } from "react-router-dom";

function ProfileFeedItem() {
  // navigate
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/mypage/feed");
  };

  return (
    <div className="w-[122px] h-[128px]" onClick={handleClick}>
      <img
        src="/assets/profile/feed.jpg"
        alt="피드 이미지"
        className="w-full h-full object-cover rounded-[5px]"
      />
    </div>
  );
}

export default ProfileFeedItem;
