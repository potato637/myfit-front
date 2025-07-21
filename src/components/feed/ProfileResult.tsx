import { useEffect, useState } from "react";
import ProfileResultSkeleton from "../skeletons/common/ProfileResultSkeleton";

interface Profile {
  name: string;
  age: number;
  job: string;
  image: string;
}

interface Props {
  keyword: string;
}

const mockProfiles: Profile[] = [
  {
    name: "양진경",
    age: 28,
    job: "게임 개발자",
    image: "/public/assets/feed/profile1.svg",
  },
  {
    name: "양진섭",
    age: 35,
    job: "프론트 프리랜서 개발자",
    image: "/public/assets/feed/profile2.svg",
  },
  {
    name: "양진주",
    age: 34,
    job: "브랜드 기획 프리랜서",
    image: "/public/assets/feed/profile3.svg",
  },
  {
    name: "양진호",
    age: 30,
    job: "게임 개발자",
    image: "/public/assets/feed/profile4.svg",
  },
];

const ProfileResult = ({ keyword }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [keyword]);

  const filtered = mockProfiles.filter((profile) =>
    profile.name.includes(keyword)
  );

  if (isLoading) {
    return (
      <ul className="mt-[6px] flex flex-col gap-[20px]">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProfileResultSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="mt-[6px] flex flex-col gap-[20px]">
      {filtered.length > 0 ? (
        filtered.map((profile, index) => (
          <li key={index} className="ml-2 flex items-center gap-4">
            <img
              src={profile.image}
              alt={profile.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-medium text-base text-black">
                {profile.name} / {profile.age}
              </span>
              <span className="text-sm text-gray-500">{profile.job}</span>
            </div>
          </li>
        ))
      ) : (
        <li className="text-gray-400 text-sm">검색 결과가 없습니다.</li>
      )}
    </ul>
  );
};

export default ProfileResult;
