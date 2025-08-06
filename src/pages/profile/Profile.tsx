import Introduction from "../../components/profile/Introduction";
import { useState } from "react";
import ProfileCardContainer from "../../components/profile/ProfileCardContainer";
import ProfileFeedContainer from "../../components/profile/ProfileFeedContainer";
import CompanyLink from "../../components/profile/CompanyLink";
import BottomNavContainer from "../../components/layouts/BottomNavContainer";
import EditProfile from "./EditProfile";
import IntroductionSkeleton from "../../components/skeletons/mypage/IntroductionSkeleton";
import IntroductionDescriptionSkeleton from "../../components/skeletons/mypage/IntroductionDescriptionSkeleton";
import CompanyLinkSkeleton from "../../components/skeletons/mypage/CompanyLinkSkeleton";
import NetworkingBarSkeleton from "../../components/skeletons/mypage/NetworkingBarSkeleton";
import ProfileCardSkeleton from "../../components/skeletons/mypage/ProfileCardSkeleton";
import { useGetProfile } from "../../hooks/mypageQueries";
import { useAuth } from "../../contexts/AuthContext";

function ProfileItem({
  editProfile,
  setEditProfile,
}: {
  editProfile: boolean;
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [selectedTab, setSelectedTab] = useState<"card" | "feed">("card");

  const { user } = useAuth();
  const { data: profile, isLoading } = useGetProfile({
    service_id: user?.id?.toString() || "",
  });

  if (isLoading) {
    return (
      <>
        <IntroductionSkeleton />
        <IntroductionDescriptionSkeleton />
        <CompanyLinkSkeleton />
        <NetworkingBarSkeleton />
      </>
    );
  }

  return (
    <>
      <div
        className={`w-full h-full ct-center flex-col mt-5 ${
          editProfile ? "blur-sm" : ""
        }`}
      >
        <Introduction setEditProfile={setEditProfile} />
        <div className="mt-[20px] w-[335px]">
          <span className="text-ct-black-100 text-body1">
            {profile?.result.user.one_line_profile}
          </span>
        </div>
        {profile?.result.user.link && (
          <CompanyLink link={profile?.result.user.link} />
        )}
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
            <ProfileCardContainer />
          )
        ) : (
          <ProfileFeedContainer />
        )}
      </div>
      {editProfile && profile && (
        <EditProfile
          setEditProfile={setEditProfile}
          imageUrl={profile.result.service.profile_img}
        />
      )}
    </>
  );
}

function Profile() {
  const [editProfile, setEditProfile] = useState<boolean>(false);

  return editProfile ? (
    <ProfileItem editProfile={editProfile} setEditProfile={setEditProfile} />
  ) : (
    <BottomNavContainer>
      <ProfileItem editProfile={editProfile} setEditProfile={setEditProfile} />
    </BottomNavContainer>
  );
}

export default Profile;
