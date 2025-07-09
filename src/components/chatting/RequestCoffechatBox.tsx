import { useModal } from "../../contexts/ui/modalContext";
import Modal from "../ui/Modal";
import CoffeChatModal from "./CoffeeChatModal";

function RequestCoffeeChatBox() {
  const { setIsModalOpen } = useModal();
  return (
    <div className="w-[349px] h-[41px] rounded-[15px] my-[20px] text-[15px] font-[400] text-[#121212] border border-ct-main-blue-200 px-[20px] relative flex items-center ">
      <span className=" text-ct-main-blue-200">장예솔 </span>님이 커피챗을
      수정하셨습니다 !
      <img
        src="/assets/chatting/bluearrow.svg"
        alt="화살표"
        className="absolute top-1/2 -translate-y-1/2 right-[20px] "
        onClick={() => setIsModalOpen(true)}
      />
      <Modal>
        <CoffeChatModal />
      </Modal>
    </div>
  );
}
export default RequestCoffeeChatBox;
