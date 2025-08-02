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
import FeedProfile from "../pages/feed/FeedProfile";
import MypageContainer from "../pages/outlets/MypageContainer";
import OnboardingContainer from "../pages/outlets/OnboardingContainer";
import FeedContainer from "../pages/outlets/FeedContainer";
import ChattingContainer from "../pages/outlets/ChattingContainer";
import RecruitingContainer from "../pages/outlets/RecruitingContainer";
import CreateCard from "../pages/profile/CreateCard";
import CardKeyword from "../pages/profile/CardKeyword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "onboarding",
        element: <OnboardingContainer />,
        children: [
          { index: true, element: <Splash /> },
          { path: "selectmembers", element: <SelectMembers /> },
          { path: "register-method", element: <RegisterMethod /> },
          { path: "register-email", element: <RegisterEmail /> },
          { path: "profile-register", element: <ProfileRegister /> },
          { path: "profile-card-register", element: <ProfileCardRegister /> },
          { path: "profile-preview", element: <ProfilePreview /> },
          {
            path: "company-profile-register",
            element: <CompanyProfileRegister />,
          },
          { path: "company-card-register", element: <CompanyCardRegister /> },
          { path: "company-preview", element: <CompanyPreview /> },
          { path: "company-verification", element: <CompanyVerification /> },
          { path: "keyword-selector", element: <KeywordSelectorPage /> },
          { path: "jobpreference", element: <JobPreference /> },
          { path: "reset-password", element: <ResetPasssword /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "feed",
            element: <FeedContainer />,
            children: [
              { index: true, element: <FeedPage /> },
              { path: "search", element: <FeedSearch /> },
              { path: "alarm", element: <MyAlarm /> },
              { path: "post", element: <PostFeed /> },
              { path: "profile/:id", element: <FeedProfile /> },
            ],
          },

          {
            path: "mypage",
            element: <MypageContainer />,
            children: [
              { index: true, element: <Profile /> },
              { path: "card", element: <CardDetail /> },
              { path: "feed", element: <FeedDetail /> },
              { path: "status", element: <ProfileStatus /> },
              { path: "networking", element: <Networking /> },
              { path: "setting", element: <MypageSetting /> },
              { path: "create-card", element: <CreateCard /> },
              { path: "keyword-selector", element: <CardKeyword /> },
            ],
          },

          {
            path: "chatting",
            element: <ChattingContainer />,
            children: [
              { index: true, element: <ChattingList /> },
              {
                path: "coffeechatrequest/:chattingRoomId",
                element: <RequestCoffeeChat />,
              },
              { path: "coffeechatlist", element: <CoffeeChatList /> },
              { path: "coffeechatstorage", element: <CoffeeChatStorage /> },
              { path: ":chattingRoomId", element: <Chatting /> },
            ],
          },

          {
            path: "recruiting",
            element: <RecruitingContainer />,
            children: [
              { index: true, element: <Recruiting /> },
              { path: "jobpreference", element: <JobPreference /> },
              { path: "register", element: <RegisterAnnouncement /> },
              { path: ":recruitment_id", element: <RecruitAnnouncement /> },
              { path: "saved", element: <SavedAnnouncement /> },
            ],
          },

          // 민수 정리
          {
            path: "companysetting",
            element: <CompanySetting />,
          },
          {
            path: "personalsetting",
            element: <PersonalSetting />,
          },
          {
            path: "alarmsetting",
            element: <AlarmSetting />,
          },
          {
            path: "verifiedsetting",
            element: <VerifiedSettingPage />,
          },
          {
            path: "personalsetting/account",
            element: <Account />,
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
            path: "personalsetting/profile/jobpreference",
            element: <JobPreference />,
          },
          // 민수 정리
        ],
      },
    ],
  },
]);

export default router;
