import { useLocation, useNavigate } from "react-router-dom";
import TopBarContainer from "../../components/common/TopBarContainer";
import BottomNav from "../../components/layouts/BottomNav";
import { useModal } from "../../contexts/ui/modalContext";
import DeleteAccountModal from "../../components/setting/DeleteAccountModal";
import { usePostLogout } from "../../hooks/settingQueries";
import { useAuth } from "../../contexts/AuthContext";

function Account() {
  const nav = useNavigate();
  const { openModal } = useModal();
  const location = useLocation();
  const { user } = useAuth();

  const { mutate: logout } = usePostLogout();

  const handleLogoutClick = () => {
    logout();
  };

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
            이메일 {user?.email}
          </button>
          <button
            className="w-full h-[47.97px] text-left pl-[32px] text-sub1 font-Pretendard text-ct-black-100 border-b border-ct-gray-100"
            onClick={() => nav(`${location.pathname}/reset-password`)}
          >
            비밀번호 재설정
          </button>
          <button
            className="w-full h-[47.97px] text-left pl-[32px] text-sub1 font-Pretendard text-ct-black-100 border-b border-ct-gray-100"
            onClick={() => openModal(
              <DeleteAccountModal 
                onDeleteSuccess={() => nav("/onboarding")} 
              />
            )}
          >
            회원 탈퇴
          </button>
          <button
            className="w-full h-[47.97px] text-left pl-[32px] text-sub1 font-Pretendard text-ct-red-100 border-none"
            onClick={handleLogoutClick}
          >
            로그아웃
          </button>
        </div>
        <BottomNav />
      </div>
    </TopBarContainer>
  );
}
export default Account;
