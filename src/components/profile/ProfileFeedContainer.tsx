import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import ProfileFeedItem from "./ProfileFeedItem";
import { useGetFeeds } from "../../hooks/mypageQueries";
import { useAuth } from "../../contexts/AuthContext";
import ProfileAddFeed from "./ProfileAddFeed";
import ProfileFeedSkeleton from "../skeletons/mypage/ProfileFeedSkeleton";

function ProfileFeedContainer({ serviceId }: { serviceId?: string }) {
  const { user } = useAuth();
  const location = useLocation();
  const [ref, inView] = useInView();
  const feedsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const {
    data: feeds,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useGetFeeds({
    service_id: serviceId ? serviceId : user?.id?.toString() || "",
  });

  // Handle infinite scroll
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Handle scrolling to a specific feed from URL hash
  useEffect(() => {
    const feedId = window.location.hash.replace("#", "");
    if (!feedId || !feeds) return;

    const timer = setTimeout(() => {
      const feedElement = feedsRef.current[feedId];
      if (feedElement) {
        const headerHeight = 60; // Adjust based on your header height
        const introductionHeight = 80; // Adjust based on introduction height
        const offset = headerHeight + introductionHeight;

        const elementPosition =
          feedElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = Math.max(0, elementPosition - offset);

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Clean up URL without refreshing the page
        const newUrl = window.location.pathname + window.location.search;
        window.history.replaceState({}, "", newUrl);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [feeds]);

  const feedsData = feeds?.pages.flatMap((page) => page.result.feeds);

  return (
    <div className="grid grid-cols-3 gap-0.5">
      {location.pathname.startsWith("/mypage") && <ProfileAddFeed />}
      {feedsData?.map((feed, index) => (
        <div
          key={feed.feed_id}
          ref={(el) => {
            feedsRef.current[feed.feed_id] = el;
            if (index === feedsData?.length - 1) {
              ref(el);
            }
          }}
        >
          <ProfileFeedItem feed={feed} serviceId={serviceId} />
        </div>
      ))}
      {isFetching && (
        <>
          <ProfileFeedSkeleton />
          <ProfileFeedSkeleton />
          <ProfileFeedSkeleton />
        </>
      )}
    </div>
  );
}

export default ProfileFeedContainer;
