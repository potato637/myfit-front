import ProfileResultSkeleton from "../skeletons/common/ProfileResultSkeleton";
import {
  useGetMyNetwork,
  useGetReceivedNetwork,
  useGetPeopleWhoInterestMe,
  useGetMyInterest,
} from "../../hooks/relationQueries";
import { useNavigate } from "react-router-dom";

type NetworkingResultProps = {
  selectedTab:
    | "network"
    | "receivedNetwork"
    | "sendInterest"
    | "receivedInterest";
};
function NetworkingResult({ selectedTab }: NetworkingResultProps) {
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
      name: "other_service_name",
      profile_img: "other_service_profile_img",
      sector: "other_service_sector",
    },
    receivedNetwork: {
      data: receivedNetwork,
      message: "받은 요청이 없습니다.",
      name: "sender_service_name",
      profile_img: "sender_service_profile_img",
      sector: "sender_service_sector",
    },
    sendInterest: {
      data: myInterestsData,
      message: "보낸 관심이 없습니다.",
      name: "recipient_service_name",
      profile_img: "recipient_service_profile_img",
      sector: "recipient_service_sector",
    },
    receivedInterest: {
      data: receivedInterests,
      message: "받은 관심이 없습니다.",
      name: "sender_id",
      profile_img: "sender_profile_img",
      sector: "sender_sector",
    },
  };

  return (
    <>
      <div className="w-full h-auto">
        {matchingData[selectedTab].data?.length ? (
          matchingData[selectedTab].data.map((user) => {
            const { name, profile_img, sector } = matchingData[selectedTab];

            return (
              <div
                key={user.id}
                className="ml-2 flex items-center gap-4"
                onClick={() => navigate(`/feed/profile/${user.id}`)}
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
            {matchingData[selectedTab].message}
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
