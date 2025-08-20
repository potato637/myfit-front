import { useNavigate } from "react-router-dom";
import { useGetProfile } from "../../hooks/mypageQueries";
import { useAuth } from "../../contexts/AuthContext";

function Introduction({
  setEditProfile,
}: {
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile, isLoading } = useGetProfile({
    service_id: user?.id?.toString() || "",
  });
  const handleSettingClick = () => {
    profile?.result.user.division === "personal"
      ? navigate("/mypage/setting")
      : navigate("/mypage/setting/business");
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="w-[90%]">
      <img
        src="/assets/profile/setting.svg"
        alt="설정"
        className="w-[20px] h-[20px]"
        onClick={handleSettingClick}
      />
      <div className="w-full flex justify-between items-center mt-4 h-[80px]">
        <div className="flex gap-[15px] items-center">
          <img
            src={profile?.result.service.profile_img}
            alt="프로필 이미지"
            className="w-[80px] h-[80px] rounded-full"
            onClick={() => setEditProfile(true)}
          />
          <div className="w-[150px] h-full flex flex-col justify-between">
            <div className="h-[20px] flex items-center gap-1">
              <span className="text-sub1 text-ct-black-100">
                {profile?.result.user.name}
              </span>
              {profile?.result.user.inc_AuthN_file && (
                <img
                  src="/assets/profile/badge.svg"
                  alt="인증"
                  className="w-[21px] h-[21px]"
                />
              )}
            </div>
            <div className="flex flex-col h-[50px]">
              <span className="text-body1 text-ct-gray-300">
                {`${profile?.result.service.userArea.high_area} ${profile?.result.service.userArea.low_area}`}
              </span>
              <span className="text-body1 text-ct-sub-blue-300">
                {profile?.result.user.division === "personal"
                  ? profile?.result.service.low_sector
                  : profile?.result.user.team_division}
              </span>
              <span className="text-body1 text-ct-black-100 whitespace-nowrap">
                {profile?.result.user.division === "personal"
                  ? `${profile?.result.user.Highest_grade} ${profile?.result.user.grade_status}`
                  : profile?.result.user.industry}
              </span>
            </div>
          </div>
        </div>
        <div className="w-[90px] h-full flex flex-col justify-between">
          <div
            className="w-full h-[29px] rounded-[3px] ct-center bg-ct-main-blue-200"
            onClick={() => navigate("/mypage/status")}
          >
            <span className="text-ct-white text-body1">
              {profile?.result.service.recruiting_status}
            </span>
          </div>
          <div
            className="w-full h-[40px] flex flex-col justify-between"
            onClick={() => navigate("/mypage/networking")}
          >
            <div className="flex justify-end items-center gap-2 h-[20px]">
              <img
                src="/assets/profile/networkingIcon.svg"
                alt="네트워킹"
                className="w-[20px] h-[20px]"
              />
              <span className="text-ct-gray-300 text-body2">
                {profile?.result.network_count}
              </span>
            </div>
            <div className="flex items-center gap-2 justify-end h-[16px]">
              <img
                src="/assets/profile/follow.svg"
                alt="팔로우"
                className="w-[11px] h-[11px]"
              />
              <span className="text-ct-gray-300 text-body2">
                {profile?.result.interest_count}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
