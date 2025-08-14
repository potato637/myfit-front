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
import CompanySetting from "../pages/setting/CompanySetting";
import AlarmSetting from "../pages/setting/AlarmSetting";
// import RegisterEmail from "../pages/onboarding/RegisterEmail";
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
import FeedSearchResult from "../pages/feed/FeedSearchResult";
import MypageContainer from "../pages/outlets/MypageContainer";
import OnboardingContainer from "../pages/outlets/OnboardingContainer";
import FeedContainer from "../pages/outlets/FeedContainer";
import ChattingContainer from "../pages/outlets/ChattingContainer";
import RecruitingContainer from "../pages/outlets/RecruitingContainer";
import CreateCard from "../pages/profile/CreateCard";
import EditCard from "../pages/profile/EditCard";
import CardKeyword from "../pages/profile/CardKeyword";
import NotFound from "../pages/error/NotFound";
import SearchingContainer from "../pages/outlets/SearchingContainer";
import Searching from "../pages/searching/Searching";
import EditFeed from "../pages/feed/EditFeed";
import Filter from "../pages/searching/Filter";
import FilterResult from "../pages/searching/FilterResult";
import HomeRouter from "../pages/HomeRouter";
import RegisterEmail from "../pages/onboarding/RegisterEmail";
import { AppProvider } from "../contexts/appContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppProvider>
        <App />
      </AppProvider>
    ),
    children: [
      {
        index: true,
        element: <HomeRouter />,
      },
      {
        path: "onboarding",
        element: <OnboardingContainer />,
        children: [
          { index: true, element: <Splash /> },
          { path: "selectmembers", element: <SelectMembers /> },
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
              { path: "search-result", element: <FeedSearchResult /> },
              { path: "alarm", element: <MyAlarm /> },
              { path: "post", element: <PostFeed /> },
              { path: "edit/:feedId", element: <EditFeed /> },
              { path: "profile/:id", element: <FeedProfile /> },
              { path: "profile/:id/card", element: <CardDetail /> },
              { path: "profile/:id/feed", element: <FeedDetail /> },
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
              { path: "setting/profile", element: <PersonalProfile /> },
              { path: "setting/account", element: <Account /> },
              {
                path: "setting/account/reset-password",
                element: <ResetPasssword />,
              },
              { path: "setting/alarm", element: <AlarmSetting /> },
              { path: "setting/job-select", element: <JobPreference /> },
              { path: "setting/business", element: <CompanySetting /> },
              { path: "setting/business/profile", element: <CompanyProfile /> },
              { path: "setting/business/account", element: <Account /> },
              {
                path: "setting/business/account/reset-password",
                element: <ResetPasssword />,
              },
              { path: "setting/business/alarm", element: <AlarmSetting /> },
              {
                path: "setting/business/verified",
                element: <VerifiedSettingPage />,
              },
              { path: "create-card", element: <CreateCard /> },
              { path: "edit-card/:cardId", element: <EditCard /> },
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

          {
            path: "searching",
            element: <SearchingContainer />,
            children: [
              { index: true, element: <Searching /> },
              { path: "filter", element: <Filter /> },
              { path: "filter/result", element: <FilterResult /> },
              { path: "filter/job-select", element: <JobPreference /> },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
