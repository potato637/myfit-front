import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useGetProfile } from "../../hooks/mypageQueries";
import { useNavigate } from "react-router-dom";

function DetailIntroduction() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMine = location.pathname.startsWith("/mypage");
  const { user } = useAuth();
  const { id } = useParams();
  const service_id = isMine
    ? user?.id?.toString()
    : location.pathname.split("/")[3];
  const { data: profile, isLoading } = useGetProfile({
    service_id: service_id || "",
  });

  if (isLoading) {
    return null;
  }

  const isPWA = window.matchMedia("(display-mode: standalone)").matches;

  const handleClick = () => {
    if (id !== user?.id?.toString()) {
      navigate(`/feed/profile/${id}`);
    } else {
      navigate("/mypage");
    }
  };

  return (
    <>
      <div
        className={`w-full h-[61px] flex items-center px-[17px] gap-[7px] bg-ct-white fixed z-10 left-0 ${
          isPWA ? "top-[calc(pb-safe+42px)]" : "top-[40px]"
        }`}
        onClick={handleClick}
      >
        <img
          src={profile?.result.service.profile_img}
          alt="프로필 이미지"
          className="w-[45px] h-[45px] rounded-full"
        />
        <span className="text-sub1 text-ct-black-100">
          {profile?.result.user.name}
        </span>
        <span className="text-sub2 text-ct-blue-gray-100">
          {profile?.result.service.low_sector}
        </span>
      </div>
      <div className="w-full h-[61px]" />
    </>
  );
}

export default DetailIntroduction;
