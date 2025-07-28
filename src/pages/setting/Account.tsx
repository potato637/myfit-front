import { useNavigate } from "react-router-dom";
import TopBarContainer from "../../components/common/TopBarContainer";
import BottomNav from "../../components/layouts/BottomNav";
import { useModal } from "../../contexts/ui/modalContext";
import Modal from "../../components/ui/Modal";
import DeleteAccountModal from "../../components/setting/DeleteAccountModal";

function Account() {
  const nav = useNavigate();
  const { setIsModalOpen } = useModal();
  const TopBarContent = () => {
    return (
      <span className="text-h2 font-Pretendard text-ct-black-100">계정</span>
    );
  };
  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="flex flex-col">
        <div className="w-full mt-[28px]">
          <button className="w-full h-[47.97px] text-left pl-[32px] text-sub1 font-Pretendard text-ct-black-100 border-b border-ct-gray-100">
            이메일 joink478@naver.com
          </button>
          <button
            className="w-full h-[47.97px] text-left pl-[32px] text-sub1 font-Pretendard text-ct-black-100 border-b border-ct-gray-100"
            onClick={() => nav("/personalsetting/resetpassword")}
          >
            비밀번호 재설정
          </button>
          <button
            className="w-full h-[47.97px] text-left pl-[32px] text-sub1 font-Pretendard text-ct-black-100 border-b border-ct-gray-100"
            onClick={() => setIsModalOpen(true)}
          >
            회원 탈퇴
          </button>
          <button
            className="w-full h-[47.97px] text-left pl-[32px] text-sub1 font-Pretendard text-ct-red-100 border-none"
            onClick={() => nav("/onboarding")}
          >
            로그아웃
          </button>
        </div>
        <BottomNav />
      </div>
      <Modal>
        <DeleteAccountModal />
      </Modal>
    </TopBarContainer>
  );
}
export default Account;
