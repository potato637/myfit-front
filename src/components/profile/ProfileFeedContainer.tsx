import ProfileFeedItem from "./ProfileFeedItem";
import { useGetFeeds } from "../../hooks/mypageQueries";
import { useAuth } from "../../contexts/AuthContext";

function ProfileFeedContainer() {
  const { user } = useAuth();

  const { data: feeds, isLoading: feedsLoading } = useGetFeeds({
    service_id: user?.id?.toString() || "",
  });

  if (feedsLoading) {
    return null;
  }

  const feedsData = feeds?.pages.flatMap((page) => page.result.feeds);

  return (
    <div
      className={`${
        feedsData?.length === 0
          ? "ct-center h-[calc(100vh-450px)]"
          : "grid grid-cols-3 gap-1"
      }`}
    >
      {feedsData?.length === 0 ? (
        <p className="text-body1 text-ct-gray-200 text-center">
          피드를 추가하여
          <br />
          프로필을 꾸며보세요!
        </p>
      ) : (
        feedsData?.map((feed) => (
          <ProfileFeedItem key={feed.feed_id} feed={feed} />
        ))
      )}
    </div>
  );
}

export default ProfileFeedContainer;
