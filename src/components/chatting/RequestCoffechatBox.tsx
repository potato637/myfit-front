import { useState } from "react";
import { Status } from "../../apis/chatting/coffeechat";
import { useChatting } from "../../contexts/ChattingContext";
import { useModal } from "../../contexts/ui/modalContext";
import { useGetCoffeeChatDetailQuery } from "../../hooks/chatting/coffeechat";
import Modal from "../ui/Modal";
import AcceptModal from "./Modal/AcceptModal";
import EditPendingModal from "./Modal/EditPendingModal";
import PendingModal from "./Modal/PendingModal";

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
  const { data } = useGetCoffeeChatDetailQuery(roomId!, coffeechat_id);
  const [modalComponent, setModalComponent] = useState<React.ReactNode>(null);

  const handleClick = () => {
    if (!data?.result) return;

    switch (data.result.status) {
      case "PENDING":
        setModalComponent(<PendingModal data={data.result} />);
        break;
      case "ACCEPTED":
        setModalComponent(<AcceptModal />);
        break;
      case "REJECTED":
        setModalComponent(<EditPendingModal />);
        break;
    }

    setIsModalOpen(true);
  };
  return (
    <div className="w-full h-[41px] rounded-[15px] text-[15px] font-[400] text-[#121212] border border-ct-main-blue-200 px-[20px] relative flex items-center ">
      <span className=" text-ct-main-blue-200">{name}</span>
      {text}
      <img
        src="/assets/chatting/bluearrow.svg"
        alt="화살표"
        className="absolute top-1/2 -translate-y-1/2 right-[20px] "
        onClick={() => handleClick()}
      />
      <Modal>{modalComponent}</Modal>
    </div>
  );
}

export default RequestCoffeeChatBox;
