import TopBarContainer from "../../components/common/TopBarContainer";
import DetailIntroduction from "../../components/profile/DetailIntroduction";
import DetailFeedItem from "../../components/profile/DetailFeedItem";
import DetailIntroductionSkeleton from "../../components/skeletons/mypage/DetailIntroductionSkeleton";
import DetailFeedItemSkeleton from "../../components/skeletons/mypage/DetailFeedItemSkeleton";
import { useGetFeeds } from "../../hooks/mypageQueries";
import { useAuth } from "../../contexts/AuthContext";
import BottomSheet from "../../components/ui/BottomSheet";
import BottomSheetContent from "../../components/profile/BottomSheetContent";
import Modal from "../../components/ui/Modal";
import ModalContent from "../../components/profile/ModalContent";

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
  const { user } = useAuth();
  const { data: feed, isFetching } = useGetFeeds({
    service_id: user?.id?.toString() || "",
  });

  const feedsData = feed?.pages.flatMap((page) => page.result.feeds);

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="w-full h-full bg-ct-gray-100 flex flex-col gap-[7px]">
        {isFetching ? (
          <>
            <DetailIntroductionSkeleton />
            <DetailFeedItemSkeleton />
          </>
        ) : (
          <>
            <DetailIntroduction />
            {feedsData?.map((feed) => (
              <DetailFeedItem key={feed.feed_id} item={feed} />
            ))}
          </>
        )}
      </div>
      <BottomSheet>
        <BottomSheetContent />
      </BottomSheet>
      <Modal>
        <ModalContent />
      </Modal>
    </TopBarContainer>
  );
}

export default FeedDetail;
