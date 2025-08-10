import ProfileResultSkeleton from "../skeletons/common/ProfileResultSkeleton";
import {
  useGetMyNetwork,
  useGetReceivedNetwork,
  useGetPeopleWhoInterestMe,
  useGetMyInterest,
} from "../../hooks/relationQueries";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

type NetworkingResultProps = {
  selectedTab:
    | "network"
    | "receivedNetwork"
    | "sendInterest"
    | "receivedInterest";
  searchTerm: string;
};
function NetworkingResult({ selectedTab, searchTerm }: NetworkingResultProps) {
  const [isFiltering, setIsFiltering] = useState(false);

  // Debounce the filtering effect
  useEffect(() => {
    if (searchTerm.trim()) {
      setIsFiltering(true);
      const timerId = setTimeout(() => {
        setIsFiltering(false);
      }, 300);
      return () => clearTimeout(timerId);
    } else {
      setIsFiltering(false);
    }
  }, [searchTerm]);
  const navigate = useNavigate();

  const {
    data: { result: network } = { result: [] },
    isLoading: networkLoading,
  } = useGetMyNetwork();
  const {
    data: { result: receivedNetwork } = { result: [] },
    isLoading: receivedNetworkLoading,
  } = useGetReceivedNetwork();
  const {
    data: { result: receivedInterests } = { result: [] },
    isLoading: receivedInterestsLoading,
  } = useGetPeopleWhoInterestMe();
  const { data: myInterests, isFetching: myInterestsFetching } =
    useGetMyInterest();

  const isReady =
    !networkLoading &&
    !receivedNetworkLoading &&
    !receivedInterestsLoading &&
    !myInterestsFetching;

  const myInterestsData = myInterests?.pages.flatMap(
    (page) => page?.result?.interests
  );

  // matching what to show if no data exist
  const matchingData = {
    network: {
      data: network,
      message: "새로운 네트워크 관계를 만들어 보세요!",
      id: "other_service_id",
      name: "other_service_name",
      profile_img: "other_service_profile_img",
      sector: "other_service_sector",
    },
    receivedNetwork: {
      data: receivedNetwork,
      message: "받은 요청이 없습니다.",
      id: "sender_id",
      name: "sender_name",
      profile_img: "sender_profile_img",
      sector: "sender_service_sector",
    },
    sendInterest: {
      data: myInterestsData,
      message: "보낸 관심이 없습니다.",
      id: "recipient_id",
      name: "recipient_service_name",
      profile_img: "recipient_profile_img",
      sector: "recipient_sector",
    },
    receivedInterest: {
      data: receivedInterests,
      message: "받은 관심이 없습니다.",
      id: "sender_id",
      name: "sender_name",
      profile_img: "sender_profile_img",
      sector: "sender_sector",
    },
  };

  // Filter users based on search term
  const filteredUsers =
    matchingData[selectedTab].data?.filter((user) => {
      if (!searchTerm.trim()) return true;

      const { name, sector } = matchingData[selectedTab];
      const userName = user[name]?.toLowerCase() || "";
      const userSector = user[sector]?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();

      return userName.includes(search) || userSector.includes(search);
    }) || [];

  return (
    <>
      <div className="w-full h-auto flex flex-col gap-[20px]">
        {isFiltering ? (
          <div className="flex flex-col gap-[20px]">
            <ProfileResultSkeleton />
            <ProfileResultSkeleton />
            <ProfileResultSkeleton />
          </div>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            const { name, profile_img, sector, id } = matchingData[selectedTab];

            return (
              <div
                key={user[id]}
                className="ml-2 flex items-center gap-4"
                onClick={() => navigate(`/feed/profile/${user[id]}`)}
              >
                <img
                  src={user[profile_img]}
                  alt="프로필 이미지"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-base text-black">
                    {user[name]}
                  </span>
                  <span className="text-sm text-gray-500">{user[sector]}</span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-body2 text-ct-gray-200 text-center">
            {searchTerm.trim()
              ? "검색 결과가 없습니다."
              : matchingData[selectedTab].message}
          </p>
        )}
      </div>
      {!isReady && (
        <>
          <div className="flex flex-col gap-[20px]">
            <ProfileResultSkeleton />
            <ProfileResultSkeleton />
            <ProfileResultSkeleton />
            <ProfileResultSkeleton />
            <ProfileResultSkeleton />
          </div>
        </>
      )}
    </>
  );
}

export default NetworkingResult;
