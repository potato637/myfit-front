import { useEffect, useRef } from "react";
import TopBarContainer from "../../components/common/TopBarContainer";
import BottomNav from "../../components/layouts/BottomNav";
import MyAlarmContent from "../../components/feed/MyAlarmContent";
import { markAllUnreadNotificationsAsRead } from "../../apis/notification";

function MyAlarm() {
  const called = useRef(false); // StrictMode 개발환경 중복 호출 가드

  useEffect(() => {
    console.log('알림 페이지 마운트됨');

    return () => {
      if (called.current) return;
      called.current = true;

      console.log('알림 페이지 언마운트됨 - 모든 새 알림을 읽음 처리');
      markAllUnreadNotificationsAsRead(); // API 호출
    };
  }, []);

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
