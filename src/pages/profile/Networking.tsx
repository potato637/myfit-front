import TopBarContainer from "../../components/common/TopBarContainer";
import { useState } from "react";
import BottomNavContainer from "../../components/layouts/BottomNavContainer";
import NetworkingResult from "../../components/profile/NetworkingResult";

function Networking() {
  const [selectedTab, setSelectedTab] = useState<
    "network" | "receivedNetwork" | "sendInterest" | "receivedInterest"
  >("network");

  return (
    <TopBarContainer>
      <BottomNavContainer>
        <div className="w-full h-full">
          <div className="w-[349px] mx-auto border-b-[1px] border-ct-gray-200 relative mt-[15px]">
            <input
              placeholder="네이밍, 회사, 직무를 검색해보세요!"
              className="w-full pl-[12px] pr-[30px] py-[7px] placeholder:text-body2 placeholder:text-ct-gray-200 focus:outline-none"
            />
            <img
              alt="search"
              className="absolute right-0 top-[50%] translate-y-[-50%]"
              src="/assets/common/search.svg"
            />
          </div>
          <div className="w-full h-[40px] bg-ct-gray-100 mt-[24px] flex items-center">
            <div
              className="flex-1 h-full ct-center relative"
              onClick={() => setSelectedTab("network")}
            >
              <span
                className={`text-body2 ${
                  selectedTab === "network"
                    ? "text-ct-black-300"
                    : "text-ct-gray-300"
                }`}
              >
                네트워크
              </span>
              {selectedTab === "network" && (
                <div className="absolute bottom-0 left-1/2 w-[74px] h-[3px] bg-ct-main-blue-200 translate-x-[-50%]"></div>
              )}
            </div>
            <div
              className="flex-1 h-full ct-center relative"
              onClick={() => setSelectedTab("receivedNetwork")}
            >
              <span
                className={`text-body2 ${
                  selectedTab === "receivedNetwork"
                    ? "text-ct-black-300"
                    : "text-ct-gray-300"
                }`}
              >
                받은 네트워크
              </span>
              {selectedTab === "receivedNetwork" && (
                <div className="absolute bottom-0 left-1/2 w-[74px] h-[3px] bg-ct-main-blue-200 translate-x-[-50%]"></div>
              )}
            </div>
            <div
              className="flex-1 h-full ct-center relative"
              onClick={() => setSelectedTab("sendInterest")}
            >
              <span
                className={`text-body2 ${
                  selectedTab === "sendInterest"
                    ? "text-ct-black-300"
                    : "text-ct-gray-300"
                }`}
              >
                보낸 관심
              </span>
              {selectedTab === "sendInterest" && (
                <div className="absolute bottom-0 left-1/2 w-[74px] h-[3px] bg-ct-main-blue-200 translate-x-[-50%]"></div>
              )}
            </div>
            <div
              className="flex-1 h-full ct-center relative"
              onClick={() => setSelectedTab("receivedInterest")}
            >
              <span
                className={`text-body2 ${
                  selectedTab === "receivedInterest"
                    ? "text-ct-black-300"
                    : "text-ct-gray-300"
                }`}
              >
                받은 관심
              </span>
              {selectedTab === "receivedInterest" && (
                <div className="absolute bottom-0 left-1/2 w-[74px] h-[3px] bg-ct-main-blue-200 translate-x-[-50%]"></div>
              )}
            </div>
          </div>
          <div className="w-[350px] mx-auto mt-[30px]">
            <NetworkingResult selectedTab={selectedTab} />
          </div>
        </div>
      </BottomNavContainer>
    </TopBarContainer>
  );
}

export default Networking;
