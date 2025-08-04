import BottomNavContainer from "../../components/layouts/BottomNavContainer";
import TopBarContainer from "../../components/common/TopBarContainer";
import { useLocation, useNavigate } from "react-router-dom";

function MypageSetting() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  const handleProfileClick = () => {
    navigate(`${location.pathname}/profile`);
  };

  const handleAccountClick = () => {
    navigate(`${location.pathname}/account`);
  };

  const handleAlarmClick = () => {
    navigate(`${location.pathname}/alarm`);
  };

  return (
    <TopBarContainer
      TopBarContent={<span className="text-h2 text-ct-black-100">설정</span>}
    >
      <BottomNavContainer>
        <div className="w-full h-full mt-[80px]">
          <div className="px-[26px] py-[12px]" onClick={handleProfileClick}>
            <span className="text-sub2 text-ct-black-200">프로필 관리</span>
          </div>
          <hr />
          <div className="px-[26px] py-[12px]" onClick={handleAccountClick}>
            <span className="text-sub2 text-ct-black-200">계정</span>
          </div>
          <hr />
          <div className="px-[26px] py-[12px]" onClick={handleAlarmClick}>
            <span className="text-sub2 text-ct-black-200">알림설정</span>
          </div>
        </div>
      </BottomNavContainer>
    </TopBarContainer>
  );
}

export default MypageSetting;
