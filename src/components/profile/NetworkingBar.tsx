import { useLocation, useNavigate } from "react-router-dom";
import {
  usePostInterest,
  useDeleteInterest,
  usePostNetwork,
  useDeleteNetwork,
  useGetIsNetworking,
  usePatchAcceptNetwork,
  usePatchRejectNetwork,
  useGetAmIInterestHim,
} from "../../hooks/relationQueries";
import { useCreateChattingRoomMutation } from "../../hooks/recruiting/recruiting";

function NetworkingBar() {
  const location = useLocation();
  const service_id = location.pathname.split("/")[3];
  const nav = useNavigate();

  //네트워크 NO_RELATION, PENDING_SENT, CONNECTED, PENDING_RECEIVED
  const { data: networkStatusData, isLoading: networkStatusLoading } =
    useGetIsNetworking({ service_id });
  const networkStatus = networkStatusData?.result.status;
  const { mutate: postNetwork } = usePostNetwork();
  const { mutate: deleteNetwork } = useDeleteNetwork();

  const handleNetworkClick = () => {
    if (networkStatusLoading) return;
    if (networkStatus === "NO_RELATION") {
      postNetwork({ service_id });
      if (!interestStatus) {
        sendInterest({ service_id });
      }
    } else if (
      networkStatus === "PENDING_SENT" ||
      networkStatus === "CONNECTED"
    ) {
      deleteNetwork({
        network_id: networkStatusData?.result.network_id as string,
      });
      deleteInterest({ service_id });
    }
  };

  const { mutate: acceptNetwork } = usePatchAcceptNetwork();
  const { mutate: rejectNetwork } = usePatchRejectNetwork();
  const handleAcceptNetwork = () => {
    postNetwork({ service_id });
    acceptNetwork({
      network_id: networkStatusData?.result.network_id as string,
    });
  };
  const handleRejectNetwork = () => {
    rejectNetwork({
      network_id: networkStatusData?.result.network_id as string,
    });
  };

  // 관심
  const { data: interestStatusData, isLoading: interestStatusLoading } =
    useGetAmIInterestHim({ service_id });
  const interestStatus = interestStatusData?.result.is_interested;
  const { mutate: sendInterest } = usePostInterest();
  const { mutate: deleteInterest } = useDeleteInterest();
  const { mutate: createChattingRoom } = useCreateChattingRoomMutation();

  const handleInterestClick = () => {
    if (interestStatusLoading) return;
    if (interestStatus) {
      deleteInterest({ service_id });
    } else {
      sendInterest({ service_id });
    }
  };

  const handleChatClick = () => {
    const targetServiceId = Number(service_id);
    if (!targetServiceId) return;
    createChattingRoom(targetServiceId, {
      onSuccess: (res) => {
        nav(`/chatting/${res.result.chatting_room_id}`, {
          state: { isNewRoom: res.result.is_new },
        });
      },
    });
  };

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
      ) : networkStatus === "PENDING_SENT" ? (
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
            <span className="text-sub1 text-ct-white">네트워크 요청 취소</span>
          </div>
        </div>
      ) : networkStatus === "PENDING_RECEIVED" ? (
        <>
          <div className="flex-1 h-[29px] ct-center">
            <div
              className="w-full h-full ct-center gap-1 bg-ct-gray-100 rounded-[3px]"
              onClick={handleAcceptNetwork}
            >
              <img
                src="/assets/profile/networkingIcon.svg"
                alt="네트워킹"
                className="w-[20px] h-[20px]"
              />
              <span className="text-sub1 text-ct-main-blue-200">요청 수락</span>
            </div>
          </div>
          <div className="flex-1 h-[29px] ct-center">
            <div
              className="w-full h-full ct-center gap-1 bg-ct-gray-100 rounded-[3px]"
              onClick={handleRejectNetwork}
            >
              <img
                src="/assets/profile/networkingIcon.svg"
                alt="네트워킹"
                className="w-[20px] h-[20px]"
              />
              <span className="text-sub1 text-ct-main-blue-200">요청 거절</span>
            </div>
          </div>
        </>
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
              className={`w-full h-full ct-center gap-1 rounded-[3px] ${
                interestStatus ? "bg-ct-main-blue-200" : "bg-ct-gray-100"
              }`}
              onClick={handleInterestClick}
            >
              <img
                src={
                  interestStatus
                    ? "/assets/profile/followed.svg"
                    : "/assets/profile/follow.svg"
                }
                alt="관심"
                className="w-[11px] h-[11px]"
              />
              <span
                className={`text-sub1 ${
                  interestStatus ? "text-ct-white" : "text-ct-main-blue-200"
                }`}
              >
                관심
              </span>
            </div>
          </div>
        </>
      )}
      <div className="flex-1 h-[29px] ct-center" onClick={handleChatClick}>
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
