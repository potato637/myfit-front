import { useLocation } from "react-router-dom";
import {
  usePostInterest,
  useDeleteInterest,
  usePostNetwork,
  useDeleteNetwork,
  useGetIsNetworking,
} from "../../hooks/relationQueries";

function NetworkingBar() {
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  //네트워크 NO_RELATION, PENDING_SENT, CONNECTED
  const { data: networkStatusData, isLoading: networkStatusLoading } =
    useGetIsNetworking({ service_id: id });
  const networkStatus = networkStatusData?.result.status;
  const { mutate: postNetwork } = usePostNetwork();
  const { mutate: deleteNetwork } = useDeleteNetwork();

  const handleNetworkClick = () => {
    if (networkStatusLoading) return;
    if (networkStatus === "NO_RELATION") {
      postNetwork({ service_id: id });
      sendInterest({ service_id: id });
    } else if (
      networkStatus === "PENDING_SENT" ||
      networkStatus === "CONNECTED"
    ) {
      deleteNetwork({ network_id: id });
      deleteInterest({ service_id: id });
    }
  };

  // 관심
  const { mutate: sendInterest } = usePostInterest();
  const { mutate: deleteInterest } = useDeleteInterest();

  const handleInterestClick = () => {};

  return (
    <div className="w-[335px] flex items-center justify-between mt-[20px] gap-2">
      {networkStatus === "CONNECTED" ? (
        <div className="flex-[2] h-[29px] ct-center">
          <div
            className="w-full h-full ct-center gap-1 bg-ct-main-blue-200 rounded-[3px]"
            onClick={handleNetworkClick}
          >
            <img
              src="/assets/profile/networkingIcon-white.svg"
              alt="네트워킹"
              className="w-[20px] h-[20px]"
            />
            <span className="text-sub1 text-ct-white">네트워크</span>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 h-[29px] ct-center">
            <div
              className="w-full h-full ct-center gap-1 bg-ct-gray-100 rounded-[3px]"
              onClick={handleNetworkClick}
            >
              <img
                src="/assets/profile/networkingIcon.svg"
                alt="네트워킹"
                className="w-[20px] h-[20px]"
              />
              <span className="text-sub1 text-ct-main-blue-200">네트워크</span>
            </div>
          </div>
          <div className="flex-1 h-[29px] ct-center">
            <div
              className="w-full h-full ct-center gap-1 bg-ct-gray-100 rounded-[3px]"
              onClick={handleInterestClick}
            >
              <img
                src="/assets/profile/follow.svg"
                alt="관심"
                className="w-[11px] h-[11px]"
              />
              <span className="text-sub1 text-ct-main-blue-200">관심</span>
            </div>
          </div>
        </>
      )}
      <div className="flex-1 h-[29px] ct-center">
        <div className="w-full h-full ct-center gap-1 bg-ct-main-blue-100 rounded-[3px]">
          <img
            src="/assets/profile/chat.svg"
            alt="메세지"
            className="w-[12px] h-[12px]"
          />
          <span className="text-sub1 text-ct-white">메세지</span>
        </div>
      </div>
    </div>
  );
}

export default NetworkingBar;
