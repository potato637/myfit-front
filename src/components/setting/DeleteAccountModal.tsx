import { useNavigate } from "react-router-dom";
import { useModal } from "../../contexts/ui/modalContext";

function DeleteAccountModal() {
  const nav = useNavigate();
  const { setIsModalOpen } = useModal();
  return (
    <div className="w-full h-full flex flex-col mx-[24px] my-[19px]">
      <img
        src="/assets/setting/face.svg"
        alt="얼굴 아이콘"
        className="w-[25px] h-[25px] ml-[10px]"
      />
      <span className="mt-[15px] ml-[10px] text-sub1 text-ct-black-100">
        정말 탈퇴하시겠어요?
      </span>
      <span className="mt-[23px] ml-[10px] text-body1 text-ct-gray-300">
        회원 탈퇴 시 계정 정보 및 보유중인
        <br />
        활동카드와 피드는 삭제되어 복구가 불가해요.
      </span>
      <div className="flex gap-[12px] mt-[33px]">
        <button
          className="w-[142px] h-[42px] rounded-[100px] bg-ct-gray-200 text-ct-white text-sub2"
          onClick={() => nav("/onboarding")}
        >
          탈퇴 할래요
        </button>
        <button
          className="w-[142px] h-[42px] rounded-[100px] bg-ct-main-blue-200 text-ct-white text-sub2"
          onClick={() => setIsModalOpen(false)}
        >
          안 할래요
        </button>
      </div>
    </div>
  );
}
export default DeleteAccountModal;
