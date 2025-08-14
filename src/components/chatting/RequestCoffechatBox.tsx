import { useChatting } from "../../contexts/ChattingContext";
import { useModal } from "../../contexts/ui/modalContext";
import { useGetCoffeeChatDetailQuery } from "../../hooks/chatting/coffeechat";
import AcceptModal from "./Modal/AcceptModal";
import EditPendingModal from "./Modal/EditPendingModal";
import PendingModal from "./Modal/PendingModal";
import { useAuth } from "../../contexts/AuthContext";
import { useCoffeeChatModal } from "../../contexts/CoffeeChatModalContext";
import { Status } from "../../apis/chatting/coffeechat";
import { JSX } from "react";

interface RequestCoffeeChatProps {
  text: string;
  name: string;
  isLast: boolean;
  coffeechat_id: number;
  status: Status;
}

function RequestCoffeeChatBox({
  text = "",
  name = "",
  isLast,
  coffeechat_id,
  status,
}: RequestCoffeeChatProps) {
  const { openModal } = useModal();
  const { roomId } = useChatting();
  const { user } = useAuth();
  const { setRequestStatus } = useCoffeeChatModal();

  const { refetch } = useGetCoffeeChatDetailQuery(roomId!, coffeechat_id, {
    enabled: false,
  });

  const handleClick = async () => {
    if (!roomId) return;
    const response = await refetch();
    const chatDetail = response.data?.result;
    if (!chatDetail) return;

    setRequestStatus(chatDetail.status);

    const isMeSender = chatDetail.sender.id === user?.id;

    let modal: JSX.Element | null = null;
    if (chatDetail.status === "PENDING") {
      modal = isMeSender ? (
        <PendingModal data={chatDetail} />
      ) : (
        <AcceptModal data={chatDetail} />
      );
    } else if (chatDetail.status === "ACCEPTED") {
      modal = <EditPendingModal data={chatDetail} />;
    }

    if (modal) openModal(modal);
  };

  return (
    <div className="w-full h-[41px] rounded-[15px] text-[15px] font-[400] text-[#121212] border border-ct-main-blue-200 px-[20px] relative flex items-center ">
      <span className=" text-ct-main-blue-200">{name}</span>
      {text}
      {isLast && status !== "REJECTED" && status !== "CANCELED" && (
        <img
          src="/assets/chatting/bluearrow.svg"
          alt="화살표"
          className="absolute top-1/2 -translate-y-1/2 right-[20px] "
          onClick={handleClick}
        />
      )}
    </div>
  );
}

export default RequestCoffeeChatBox;
