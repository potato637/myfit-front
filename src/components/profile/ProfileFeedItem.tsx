import { useNavigate, useLocation } from "react-router-dom";
import { FeedItem } from "../../apis/mypageAPI";

function ProfileFeedItem({
  feed,
  serviceId,
}: {
  feed: FeedItem;
  serviceId?: string;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const handleClick = () => {
    if (serviceId) {
      navigate(`/${path}/profile/${serviceId}/feed#${feed.feed_id}`);
    } else {
      navigate(`/${path}/feed#${feed.feed_id}`);
    }
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
