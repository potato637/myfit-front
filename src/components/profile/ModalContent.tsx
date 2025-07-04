import { useModal } from "../../contexts/ui/modalContext";

function ModalContent() {
  const { setIsModalOpen } = useModal();

  return (
    <div className="w-full ct-center flex-col gap-[15px]">
      <div className="ct-center flex-col gap-2">
        <span className="text-ct-black-200 text-h2">
          해당 피드를 삭제하시겠나요?
        </span>
        <p className="text-body1 text-ct-gray-300 w-[170px] text-center">
          삭제한 피드는 24시간 안에만 복원할 수 있어요!
        </p>
      </div>
      <div>
        <img
          src="/assets/profile/deleteFeedOrCard.svg"
          alt="deleteFeedOrCardImg"
          className="w-[148px] h-[148px]"
        />
      </div>
      <div className="ct-center gap-[8px]">
        <div
          className="w-[139px] h-[45px] rounded-[10px] ct-center bg-ct-gray-100"
          onClick={() => setIsModalOpen(false)}
        >
          <span className="text-body1 text-ct-gray-400">취소</span>
        </div>
        <div className="w-[139px] h-[45px] rounded-[10px] ct-center bg-ct-sub-blue-300">
          <span className="text-body1 text-ct-white">삭제</span>
        </div>
      </div>
    </div>
  );
}

export default ModalContent;
