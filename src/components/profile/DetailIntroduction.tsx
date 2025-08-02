import { useAuth } from "../../contexts/AuthContext";
import { useGetProfile } from "../../hooks/mypageQueries";

function DetailIntroduction() {
  const { user } = useAuth();
  const { data: profile, isLoading } = useGetProfile({
    service_id: user?.id?.toString() || "",
  });

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className="w-full h-[61px] flex items-center px-[17px] gap-[7px] bg-ct-white fixed z-10 left-0 top-[calc(pb-safe+61px)]">
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
