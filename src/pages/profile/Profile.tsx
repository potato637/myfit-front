import BottomNav from "../../components/layouts/BottomNav";
import Introduction from "../../components/profile/Introduction";
import { useState } from "react";
import ProfileCardContainer from "../../components/profile/ProfileCardContainer";
import ProfileFeedContainer from "../../components/profile/ProfileFeedContainer";
import CreateItemButton from "../../components/profile/CreateItemButton";
import NetworkingBar from "../../components/profile/NetworkingBar";
import CompanyLink from "../../components/profile/CompanyLink";

function Profile() {
  const [selectedTab, setSelectedTab] = useState<"card" | "feed">("card");

  return (
    <div className="w-full h-full ct-center flex-col mt-5 mb-[89px]">
      <Introduction />
      <div className="mt-[20px] w-[335px]">
        <span className="text-ct-black-100 text-body1">
          성과로 증명하는 디지털 광고 전략가입니다. 🤩
        </span>
      </div>
      <CompanyLink />
      <NetworkingBar />
      <div className="w-full h-[40px] bg-ct-gray-100 flex sticky top-0 mt-[17px] mb-[17px]">
        <div
          className="flex-1 ct-center relative"
          onClick={() => setSelectedTab("card")}
        >
          <span
            className={`text-body2 ${
              selectedTab === "card" ? "text-ct-black-100" : "text-ct-gray-300"
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
              selectedTab === "feed" ? "text-ct-black-100" : "text-ct-gray-300"
            }`}
          >
            피드
          </span>
          {selectedTab === "feed" && (
            <div className="absolute bottom-0 left-1/2 w-[74px] h-[3px] bg-ct-main-blue-200 translate-x-[-50%]"></div>
          )}
        </div>
      </div>
      {selectedTab === "card" && <ProfileCardContainer />}
      {selectedTab === "feed" && <ProfileFeedContainer />}
      <CreateItemButton />
      <BottomNav />
    </div>
  );
}

export default Profile;
