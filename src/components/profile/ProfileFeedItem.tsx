import { useNavigate } from "react-router-dom";
import { FeedItem } from "../../apis/mypageAPI";

function ProfileFeedItem({ feed }: { feed: FeedItem }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/mypage/feed#${feed.feed_id}`);
  };

  return (
    <div className="w-[122px] h-[128px]" onClick={handleClick}>
      <img
        src={feed.images[0]}
        alt="피드 이미지"
        className="w-full h-full object-cover rounded-[5px]"
      />
    </div>
  );
}

export default ProfileFeedItem;
