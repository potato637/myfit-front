import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Profile from "../pages/profile/Profile";
import CardDetail from "../pages/profile/CardDetail";
import FeedDetail from "../pages/profile/FeedDetail";
import Recruiting from "../pages/recruiting/Recruiting";
import Splash from "../pages/onboarding/Splash";
import RecruitAnnouncement from "../pages/recruiting/RecruitAnnouncement";
import SelectMembers from "../pages/onboarding/SelectMembers";
import SavedAnnouncement from "../pages/recruiting/SavedAnnouncement";
import RegisterAnnouncement from "../pages/recruiting/RegisterAnnouncement";
import PersonalSetting from "../pages/setting/PersonalSetting";
import CompanySetting from "../pages/setting/CompanySetting";
import AlarmSetting from "../pages/setting/AlarmSetting";
import RegisterEmail from "../pages/onboarding/RegisterEmail";
import RegisterMethod from "../pages/onboarding/RegisterMethod";
import VerifiedSettingPage from "../pages/setting/VerifiedSettingPage";
import Account from "../pages/setting/Account";
import ResetPasssword from "../pages/setting/ResetPassword";
import ProfileStatus from "../pages/profile/ProfileStatus";
import ProfileRegister from "../pages/onboarding/ProfileRegister";
import ProfileCardRegister from "../pages/onboarding/ProfileCardRegister";
import ProfilePreview from "../pages/onboarding/ProfilePreview";
import CompanyProfileRegister from "../pages/onboarding/CompanyProfileRegister";
import CompanyCardRegister from "../pages/onboarding/CompanyCardRegister";
import CompanyPreview from "../pages/onboarding/CompanyPreview";
import CompanyVerification from "../pages/onboarding/CompanyVerification";
import RequestCoffeeChat from "../pages/chatting/RequestCoffeeChat";
import CompanyProfile from "../pages/setting/CompanyProfile";
import PersonalProfile from "../pages/setting/PersonalProfile";
import Chatting from "../pages/chatting/Chatting";
import ChattingList from "../pages/chatting/ChattingList";
import CoffeeChatList from "../pages/chatting/CoffeeChatList";
import CoffeeChatStorage from "../pages/chatting/CoffeeChatStorage";
import FeedPage from "../pages/feed/FeedPage";
import FeedSearch from "../pages/feed/FeedSearch";
import MyAlarm from "../pages/feed/MyAlarm";
import PostFeed from "../pages/feed/PostFeed";
import KeywordSelectorPage from "../pages/onboarding/KeywordSelector";
import JobPreference from "../pages/setting/JobPreference";
import Networking from "../pages/profile/Networking";
import MypageSetting from "../pages/profile/MypageSetting";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // 공개 경로 (로그인 여부와 관계 없이 접근 가능한 경로를 넣으시면 됩니다.)
      {
        element: <ProtectedRoute />,
        children: [
          // 이곳에는 보호된 경로 (로그인 필요)를 넣으시면 됩니다.
          // 각 페이지 별로 <Outlet />을 자유롭게 사용할 수 있습니다.
          { path: "mypage", element: <Profile /> },
          { path: "mypage/card", element: <CardDetail /> },
          { path: "mypage/feed", element: <FeedDetail /> },
          { path: "mypage/status", element: <ProfileStatus /> },
          {
            path: "recruit/registerannouncement",
            element: <RegisterAnnouncement />,
          },
          {
            path: "recruit/announcement/:recruitment_id",
            element: <RecruitAnnouncement />,
          },
          {
            path: "recruit/savedannouncement",
            element: <SavedAnnouncement />,
          },
          {
            path: "companysetting",
            element: <CompanySetting />,
          },
          {
            path: "personalsetting",
            element: <PersonalSetting />,
          },
          {
            path: "feed/feed-main",
            element: <FeedPage />,
          },
          {
            path: "feed/feed-search",
            element: <FeedSearch />,
          },
          {
            path: "feed/my-alarm",
            element: <MyAlarm />,
          },
          {
            path: "feed/post-feed",
            element: <PostFeed />,
          },
          {
            path: "companysetting/alarmsetting",
            element: <AlarmSetting />,
          },
          {
            path: "companysetting/verifiedsetting",
            element: <VerifiedSettingPage />,
          },
          {
            path: "personalsetting/account",
            element: <Account />,
          },
          {
            path: "personalsetting/resetpassword",
            element: <ResetPasssword />,
          },
          {
            path: "coffeechat/request",
            element: <RequestCoffeeChat />,
          },
          {
            path: "companysetting/profile",
            element: <CompanyProfile />,
          },
          {
            path: "personalsetting/profile",
            element: <PersonalProfile />,
          },
          {
            path: "chatting/:chattingRoomId",
            element: <Chatting />,
          },
          {
            path: "chatting/chattinglist",
            element: <ChattingList />,
          },
          {
            path: "chatting/coffeechatlist",
            element: <CoffeeChatList />,
          },
          {
            path: "chatting/coffeechatstorage",
            element: <CoffeeChatStorage />,
          },
          {
            path: "mypage/networking",
            element: <Networking />,
          },
          {
            path: "mypage/setting",
            element: <MypageSetting />,
          },
        ],
      },
      {
        path: "recruit",
        element: <Recruiting />,
      },
      {
        path: "onboarding",
        element: <Splash />,
      },
      {
        path: "onboarding/selectmembers",
        element: <SelectMembers />,
      },
      {
        path: "onboarding/register-method",
        element: <RegisterMethod />,
      },
      {
        path: "onboarding/register-email",
        element: <RegisterEmail />,
      },
      {
        path: "onboarding/profile-register",
        element: <ProfileRegister />,
      },
      {
        path: "onboarding/profile-card-register",
        element: <ProfileCardRegister />,
      },
      {
        path: "onboarding/profile-preview",
        element: <ProfilePreview />,
      },
      {
        path: "onboarding/company-profile-register",
        element: <CompanyProfileRegister />,
      },
      {
        path: "onboarding/company-card-register",
        element: <CompanyCardRegister />,
      },
      {
        path: "onboarding/company-preview",
        element: <CompanyPreview />,
      },
      {
        path: "onboarding/company-verification",
        element: <CompanyVerification />,
      },
      {
        path: "onboarding/keyword-selector",
        element: <KeywordSelectorPage />,
      },
      {
        path: "personalsetting/profile/jobpreference",
        element: <JobPreference />,
      },
    ],
  },
]);

export default router;
