import TopBarContainer from "../../components/common/TopBarContainer";
import BottomNav from "../../components/layouts/BottomNav";

function Account() {
  const TopBarContent = () => {
    return (
      <span className="text-h2 font-Pretendard text-ct-black-100">계정</span>
    );
  };
  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="flex flex-col">
        <div className="w-full mt-[42.12px]">
          <button className="w-full h-[47.97px] text-left pl-[32px] text-sub1 font-Pretendard text-ct-black-100 border-b border-ct-gray-100">
            이메일 joink478@naver.com
          </button>
          <button className="w-full h-[47.97px] text-left pl-[32px] text-sub1 font-Pretendard text-ct-black-100 border-b border-ct-gray-100">
            비밀번호 재설정
          </button>
          <button className="w-full h-[47.97px] text-left pl-[32px] text-sub1 font-Pretendard text-ct-black-100 border-b border-ct-gray-100">
            회원 탈퇴
          </button>
          <button className="w-full h-[47.97px] text-left pl-[32px] text-sub1 font-Pretendard text-ct-red-100 border-none">
            로그아웃
          </button>
        </div>
        <BottomNav />
      </div>
    </TopBarContainer>
  );
}
export default Account;
