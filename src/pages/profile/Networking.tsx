import TopBarContainer from "../../components/common/TopBarContainer";
import { useState } from "react";
import BottomNavContainer from "../../components/layouts/BottomNavContainer";
import ProfileResult from "../../components/feed/ProfileResult";

function Networking() {
  const [selectedTab, setSelectedTab] = useState<
    "network" | "request" | "send" | "receive"
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
              onClick={() => setSelectedTab("request")}
            >
              <span
                className={`text-body2 ${
                  selectedTab === "request"
                    ? "text-ct-black-300"
                    : "text-ct-gray-300"
                }`}
              >
                받은 요청
              </span>
              {selectedTab === "request" && (
                <div className="absolute bottom-0 left-1/2 w-[74px] h-[3px] bg-ct-main-blue-200 translate-x-[-50%]"></div>
              )}
            </div>
            <div
              className="flex-1 h-full ct-center relative"
              onClick={() => setSelectedTab("send")}
            >
              <span
                className={`text-body2 ${
                  selectedTab === "send"
                    ? "text-ct-black-300"
                    : "text-ct-gray-300"
                }`}
              >
                보낸 관심
              </span>
              {selectedTab === "send" && (
                <div className="absolute bottom-0 left-1/2 w-[74px] h-[3px] bg-ct-main-blue-200 translate-x-[-50%]"></div>
              )}
            </div>
            <div
              className="flex-1 h-full ct-center relative"
              onClick={() => setSelectedTab("receive")}
            >
              <span
                className={`text-body2 ${
                  selectedTab === "receive"
                    ? "text-ct-black-300"
                    : "text-ct-gray-300"
                }`}
              >
                받은 관심
              </span>
              {selectedTab === "receive" && (
                <div className="absolute bottom-0 left-1/2 w-[74px] h-[3px] bg-ct-main-blue-200 translate-x-[-50%]"></div>
              )}
            </div>
          </div>
          <div className="w-[350px] mx-auto mt-[30px]">
            <ProfileResult keyword="" />
          </div>
        </div>
      </BottomNavContainer>
    </TopBarContainer>
  );
}

export default Networking;
