import TopBar from "../../components/common/TopBar";
import BottomNav from "../../components/layouts/BottomNav";

function VerifiedCompanySetting() {
  return (
    <div className="flex flex-col">
      <TopBar>
        <span className="text-h2 font-Pretendard text-ct-black-100">설정</span>
      </TopBar>
      <div className="w-full mt-[146.38px]">
        <button className="w-full h-[47.97px] text-left pl-[32px] text-sub1 font-Pretendard text-ct-black-100 border-b border-ct-gray-100">
          프로필 관리
        </button>
        <button className="w-full h-[47.97px] text-left pl-[32px] text-sub1 font-Pretendard text-ct-black-100 border-b border-ct-gray-100">
          계정
        </button>
        <div>
          <button className="w-full h-[47.97px] text-left pl-[32px] text-sub1 font-Pretendard text-ct-black-100 border-b border-ct-gray-100 flex items-center gap-[105px]">
            <span>회사 인증</span>
            <div className="flex gap-[7px] items-center">
              <span className="font-Pretendard text-body1 text-ct-gray-300">
                2025-06-05 인증 완료
              </span>
              <img src="/assets/setting/verifiedmark.svg" alt="인증마크" />
            </div>
          </button>
        </div>
        <button className="w-full h-[47.97px] text-left pl-[32px] text-sub1 font-Pretendard text-ct-black-100 border-none">
          알림 설정
        </button>
      </div>
      <BottomNav />
    </div>
  );
}
export default VerifiedCompanySetting;
