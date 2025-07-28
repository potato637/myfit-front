import { useModal } from "../../contexts/ui/modalContext";
import { ChatBoxStatus } from "../../types/chatting/ChatBoxStatus";
import Modal from "../ui/Modal";
import AcceptModal from "./Modal/AcceptModal";
import EditPendingModal from "./Modal/EditPendingModal";
import PendingModal from "./Modal/PendingModal";

interface RequestCoffeeChatProps {
  status: ChatBoxStatus;
  name: string;
  isLast: boolean;
  sender: "me" | "you";
}

function RequestCoffeeChatBox({
  status,
  name = "장예솔",
  isLast,
  sender,
}: RequestCoffeeChatProps) {
  const { setIsModalOpen } = useModal();

  let message = "";
  let ModalComponent: React.ReactNode = null;

  if (status === "requested") {
    ModalComponent = sender === "me" ? <PendingModal /> : <AcceptModal />;
    message = "님이 커피챗을 요청하였습니다!";
  } else if (status === "edited") {
    ModalComponent = <EditPendingModal />;
    message = "님이 커피챗을 수정하였습니다!";
  } else if (status === "accepted") {
    ModalComponent = <EditPendingModal />;
    message = "님이 커피챗을 수락하였습니다!";
  } else if (status === "rejected") {
    ModalComponent = null;
    message = "님이 커피챗을 거절하였습니다!";
  }

  if (status === "none") return null;
  return (
    <div className="w-full h-[41px] rounded-[15px] text-[15px] font-[400] text-[#121212] border border-ct-main-blue-200 px-[20px] relative flex items-center ">
      <span className=" text-ct-main-blue-200">{name}</span>
      {message}
      {isLast && status !== "rejected" && (
        <img
          src="/assets/chatting/bluearrow.svg"
          alt="화살표"
          className="absolute top-1/2 -translate-y-1/2 right-[20px] "
          onClick={() => setIsModalOpen(true)}
        />
      )}
      <Modal>{ModalComponent}</Modal>
    </div>
  );
}
export default RequestCoffeeChatBox;
