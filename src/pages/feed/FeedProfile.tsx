import { useState, useEffect } from "react";
import ProfileCardContainer from "../../components/profile/ProfileCardContainer";
import ProfileFeedContainer from "../../components/profile/ProfileFeedContainer";
import NetworkingBar from "../../components/profile/NetworkingBar";
import CompanyLink from "../../components/profile/CompanyLink";
import BottomNavContainer from "../../components/layouts/BottomNavContainer";
import IntroductionSkeleton from "../../components/skeletons/mypage/IntroductionSkeleton";
import IntroductionDescriptionSkeleton from "../../components/skeletons/mypage/IntroductionDescriptionSkeleton";
import CompanyLinkSkeleton from "../../components/skeletons/mypage/CompanyLinkSkeleton";
import NetworkingBarSkeleton from "../../components/skeletons/mypage/NetworkingBarSkeleton";
import ProfileCardSkeleton from "../../components/skeletons/mypage/ProfileCardSkeleton";
import FeedIntroduction from "../../components/feed/FeedIntroduction";
import { useGetProfile } from "../../hooks/mypageQueries";
import { useParams, useSearchParams } from "react-router-dom";

function ProfileItem() {
  const [selectedTab, setSelectedTab] = useState<"card" | "feed">("card");
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const { data: profile, isLoading } = useGetProfile({
    service_id: id as string,
  });

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "feed") {
      setSelectedTab("feed");
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="w-full h-full ct-center flex-col mt-5">
        <IntroductionSkeleton />
        <IntroductionDescriptionSkeleton />
        <CompanyLinkSkeleton />
        <NetworkingBarSkeleton />
      </div>
    );
  }

  return (
    <>
      <div className={`w-full h-full ct-center flex-col mt-5`}>
        <FeedIntroduction />
        <div className="mt-[20px] w-[335px]">
          <span className="text-ct-black-100 text-body1">
            {profile?.result.user.one_line_profile}
          </span>
        </div>
        <div className="w-[335px]">
          {profile?.result.user.link && (
            <CompanyLink link={profile?.result.user.link} />
          )}
        </div>
        <NetworkingBar />
        <div className="w-full h-[40px] bg-ct-gray-100 flex sticky top-0 mt-[17px] mb-[17px]">
          <div
            className="flex-1 ct-center relative"
            onClick={() => setSelectedTab("card")}
          >
            <span
              className={`text-body2 ${
                selectedTab === "card"
                  ? "text-ct-black-100"
                  : "text-ct-gray-300"
              }`}
            >
              이력/활동
            </span>
            {selectedTab === "card" && (
              <div className="absolute bottom-0 left-1/2 w-[74px] h-[3px] bg-ct-main-blue-200 translate-x-[-50%]"></div>
            )}
          </div>
          <div
            className="flex-1 ct-center relative"
            onClick={() => setSelectedTab("feed")}
          >
            <span
              className={`text-body2 ${
                selectedTab === "feed"
                  ? "text-ct-black-100"
                  : "text-ct-gray-300"
              }`}
            >
              피드
            </span>
            {selectedTab === "feed" && (
              <div className="absolute bottom-0 left-1/2 w-[74px] h-[3px] bg-ct-main-blue-200 translate-x-[-50%]"></div>
            )}
          </div>
        </div>
        {selectedTab === "card" ? (
          isLoading ? (
            <ProfileCardSkeleton />
          ) : (
            <ProfileCardContainer serviceId={id} />
          )
        ) : (
          <ProfileFeedContainer serviceId={id} />
        )}
      </div>
    </>
  );
}

function FeedProfile() {
  return (
    <BottomNavContainer>
      <ProfileItem />
    </BottomNavContainer>
  );
}

export default FeedProfile;
