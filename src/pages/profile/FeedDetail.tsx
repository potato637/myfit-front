import TopBarContainer from "../../components/common/TopBarContainer";
import DetailIntroduction from "../../components/profile/DetailIntroduction";
import DetailFeedItem from "../../components/profile/DetailFeedItem";
import DetailIntroductionSkeleton from "../../components/skeletons/mypage/DetailIntroductionSkeleton";
import DetailFeedItemSkeleton from "../../components/skeletons/mypage/DetailFeedItemSkeleton";
import { useGetFeeds } from "../../hooks/mypageQueries";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import BottomSheet from "../../components/ui/BottomSheet";
import BottomSheetContent from "../../components/profile/BottomSheetContent";

const TopBarContent = () => {
  return (
    <img
      src="/assets/common/headerLogo.svg"
      alt="로고"
      className="w-[68px] h-[30px]"
    />
  );
};

function FeedDetail() {
  const location = useLocation();
  const isMine = location.pathname.startsWith("/mypage");
  const { user } = useAuth();
  const service_id = isMine
    ? user?.id?.toString()
    : location.pathname.split("/")[3];
  const { data: feed, isLoading } = useGetFeeds({
    service_id: service_id || "",
  });

  const feedsData = feed?.pages.flatMap((page) => page.result.feeds);
  const feedRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { feed_id } = useParams();

  // Handle scrolling to a specific feed from URL hash
  useEffect(() => {
    if (!feedsData || feedsData.length === 0) return;

    const targetFeedId = window.location.hash.replace("#", "") || feed_id;
    if (!targetFeedId) return;

    const timer = setTimeout(() => {
      const feedElement = feedRefs.current[targetFeedId];
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
  }, [feedsData, feed_id]);

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="w-full h-full bg-ct-gray-100 flex flex-col gap-[7px] relative">
        {isLoading ? (
          <>
            <DetailIntroductionSkeleton />
            <DetailFeedItemSkeleton />
          </>
        ) : (
          <>
            <DetailIntroduction />
            {feedsData?.map((feed) => (
              <div
                key={feed.feed_id}
                ref={(el) => {
                  feedRefs.current[feed.feed_id] = el;
                }}
              >
                <DetailFeedItem item={feed} />
              </div>
            ))}
          </>
        )}
      </div>
      <BottomSheet>
        <BottomSheetContent type="feed" />
      </BottomSheet>
    </TopBarContainer>
  );
}

export default FeedDetail;
