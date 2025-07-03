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
import VerifiedCompanySetting from "../pages/setting/VerifiedCompanySetting";
import RegisterEmail from "../pages/onboarding/RegisterEmail";
import RegisterMethod from "../pages/onboarding/RegisterMethod";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "mypage",
        element: <Profile />,
      },
      {
        path: "mypage/card",
        element: <CardDetail />,
      },
      {
        path: "mypage/feed",
        element: <FeedDetail />,
      },
      {
        path: "recruit",
        element: <Recruiting />,
      },
      {
        path: "recruit/announcement",
        element: <RecruitAnnouncement />,
      },
      {
        path: "recruit/savedannouncement",
        element: <SavedAnnouncement />,
      },
      {
        path: "recruit/registerannouncement",
        element: <RegisterAnnouncement />,
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
        path: "companysetting",
        element: <CompanySetting />,
      },
      {
        path: "companysetting/verified",
        element: <VerifiedCompanySetting />,
      },
      {
        path: "personalsetting",
        element: <PersonalSetting />,
      },
      {
        path: "onboarding/register-method",
        element: <RegisterMethod />,
      },
      {
        path: "onboarding/register-email",
        element: <RegisterEmail />,
      },
    ],
  },
]);

export default router;
