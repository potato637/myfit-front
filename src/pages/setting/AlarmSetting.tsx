import TopBarContainer from "../../components/common/TopBarContainer";
import BottomNav from "../../components/layouts/BottomNav";
import ToggleSwitch from "../../components/setting/ToggleSwitch";

function AlarmSetting() {
  const TopBarContent = () => {
    return (
      <span className="text-h2 font-Pretendard text-ct-black-100">
        알림 설정
      </span>
    );
  };
  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="flex flex-col">
        <div className="w-full px-[15px] pt-[20px]">
          <span className="font-Pretendard text-sub1 text-ct-black-100">
            시스템 알림 설정
          </span>
          <div className="mt-[57px] flex items-center gap-[179px]">
            <span className="text-sub1 text-[#100F0F] font-Pretendard">
              PUSH 알림 설정
            </span>
            <ToggleSwitch />
          </div>
          <div className="mt-[29px] text-body1 text-[#5B5D5E] font-Pretendard">
            본 설정은 해당 기기에서만 유효하며, <br />
            수신 거절 시 상담답변 등의 정보성 알림도 발송되지 않습니다. <br />
            <br />
            아이폰의 알림(PUSH) 설정은 <br />
            <span className="text-[#4293FF]">
              아이폰
              {`>`} 설정 {`>`} 알림
            </span>
            에서 변경 가능합니다.
          </div>
          <div className="mt-[53.11px] flex items-center gap-[179px]">
            <span className="text-sub1 text-[#100F0F] font-Pretendard">
              프로필 비활성화
            </span>
            <ToggleSwitch />
          </div>
          <div className="mt-[22px] text-body1 text-ct-gray-400 font-Pretendard">
            비활성화 상태에서는 다른 사용자가 회원님의 프로필을 <br />
            열람할 수 없습니다.
          </div>
        </div>
        <BottomNav />
      </div>
    </TopBarContainer>
  );
}
export default AlarmSetting;
