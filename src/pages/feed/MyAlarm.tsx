import TopBarContainer from "../../components/common/TopBarContainer";
import BottomNav from "../../components/layouts/BottomNav";
import MyAlarmContent from "../../components/feed/MyAlarmContent";

function MyAlarm() {
  const TopBarContent = () => {
    return <span className="text-h2 text-ct-black-200">알림</span>;
  };

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <MyAlarmContent />
      <BottomNav />
    </TopBarContainer>
  );
}
export default MyAlarm;