import { useState } from "react";
import { useChatting } from "../../contexts/ChattingContext";
import { useModal } from "../../contexts/ui/modalContext";
import { useGetCoffeeChatDetailQuery } from "../../hooks/chatting/coffeechat";
import Modal from "../ui/Modal";
import AcceptModal from "./Modal/AcceptModal";
import EditPendingModal from "./Modal/EditPendingModal";
import PendingModal from "./Modal/PendingModal";
import { useAuth } from "../../contexts/AuthContext";
import { useCoffeeChatModal } from "../../contexts/CoffeeChatModalContext";

interface RequestCoffeeChatProps {
  text: string;
  name: string;
  isLast: boolean;
  coffeechat_id: number;
}

function RequestCoffeeChatBox({
  text = "",
  name = "",
  isLast,
  coffeechat_id,
}: RequestCoffeeChatProps) {
  const { setIsModalOpen } = useModal();
  const { roomId } = useChatting();
  const { user } = useAuth();
  const { data, refetch } = useGetCoffeeChatDetailQuery(
    roomId!,
    coffeechat_id,
    { enabled: false }
  );
  const { setRequestStatus } = useCoffeeChatModal();
  const [modalComponent, setModalComponent] = useState<React.ReactNode>(null);
  const handleClick = async () => {
    const response = await refetch();
    console.log("📦 refetch 응답:", response);
    const ChatDetail = response.data?.result;
    if (!ChatDetail) return;
    const isMeSender = ChatDetail.sender.id === user?.id;
    console.log("👤 현재 사용자 ID (user?.id):", user?.id);
    console.log("📤 커피챗 sender_id:", ChatDetail.sender_id);
    console.log("✅ isMeSender 판단 결과:", isMeSender);
    if (ChatDetail.status === "PENDING") {
      if (isMeSender) {
        setRequestStatus("PENDING");
        setModalComponent(<PendingModal data={response.data.result} />);
      } else {
        setRequestStatus("PENDING");
        setModalComponent(<AcceptModal data={response.data.result} />);
      }
    } else if (ChatDetail.status === "ACCEPTED") {
      setRequestStatus("ACCEPTED");
      setModalComponent(<EditPendingModal data={response.data.result} />);
    }

    setIsModalOpen(true);

    setIsModalOpen(true);
  };
  return (
    <div className="w-full h-[41px] rounded-[15px] text-[15px] font-[400] text-[#121212] border border-ct-main-blue-200 px-[20px] relative flex items-center ">
      <span className=" text-ct-main-blue-200">{name}</span>
      {text}

      {isLast && (
        <img
          src="/assets/chatting/bluearrow.svg"
          alt="화살표"
          className="absolute top-1/2 -translate-y-1/2 right-[20px] "
          onClick={() => {
            handleClick();
          }}
        />
      )}
      <Modal>{modalComponent}</Modal>
    </div>
  );
}

export default RequestCoffeeChatBox;
