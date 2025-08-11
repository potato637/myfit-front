import ProfileFeedItem from "./ProfileFeedItem";
import { useGetFeeds } from "../../hooks/mypageQueries";
import { useAuth } from "../../contexts/AuthContext";
import ProfileAddFeed from "./ProfileAddFeed";

function ProfileFeedContainer({ serviceId }: { serviceId?: string }) {
  const { user } = useAuth();

  const { data: feeds, isLoading: feedsLoading } = useGetFeeds({
    service_id: serviceId ? serviceId : user?.id?.toString() || "",
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
      <ProfileAddFeed />
      {feedsData?.map((feed) => (
        <ProfileFeedItem key={feed.feed_id} feed={feed} serviceId={serviceId} />
      ))}
    </div>
  );
}

export default ProfileFeedContainer;
