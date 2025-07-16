import TopBarContainer from "../../components/common/TopBarContainer";
import DetailIntroduction from "../../components/profile/DetailIntroduction";
import DetailFeedItem from "../../components/profile/DetailFeedItem";
import { useState, useEffect } from "react";
import DetailIntroductionSkeleton from "../../components/skeletons/mypage/DetailIntroductionSkeleton";
import DetailFeedItemSkeleton from "../../components/skeletons/mypage/DetailFeedItemSkeleton";

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
  const createList = Array.from({ length: 10 }, (_, i) => i + 1);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 3000);
  }, []);

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="w-full h-full bg-ct-gray-100 flex flex-col gap-[7px]">
        {isReady ? (
          <>
            <DetailIntroduction />
            {createList.map((_, index) => (
              <DetailFeedItem key={index} />
            ))}
          </>
        ) : (
          <>
            <DetailIntroductionSkeleton />
            <DetailFeedItemSkeleton />
          </>
        )}
      </div>
    </TopBarContainer>
  );
}

export default FeedDetail;
