import BottomNavContainer from "../../components/layouts/BottomNavContainer";
import TopBarContainer from "../../components/common/TopBarContainer";

function MypageSetting() {
  return (
    <TopBarContainer
      TopBarContent={<span className="text-h2 text-ct-black-100">설정</span>}
    >
      <BottomNavContainer>
        <div className="w-full h-full mt-[80px]">
          <div className="px-[26px] py-[12px]">
            <span className="text-sub2 text-ct-black-200">프로필 관리</span>
          </div>
          <hr />
          <div className="px-[26px] py-[12px]">
            <span className="text-sub2 text-ct-black-200">계정</span>
          </div>
          <hr />
          <div className="px-[26px] py-[12px]">
            <span className="text-sub2 text-ct-black-200">알림설정</span>
          </div>
        </div>
      </BottomNavContainer>
    </TopBarContainer>
  );
}

export default MypageSetting;
