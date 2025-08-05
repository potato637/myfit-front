import { useState } from "react";
import TopBarContainer from "../../components/common/TopBarContainer";
import { jobs } from "../../data/jobs";
import { useLocation, useNavigate } from "react-router-dom";

function JobPreference() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const from = state?.from;
  const prevData = state?.prevData;

  const [selectedCategory, setSelectedCategory] = useState("개발/엔지니어링");

  const [highSector, setHighSector] = useState<string[]>(
    state?.high_sector ?? []
  );
  const [lowSector, setLowSector] = useState<string[]>(state?.low_sector ?? []);

  const currentCategory = jobs.find((j) => j.category === selectedCategory);

  const toggleSkill = (category: string, skill: string) => {
    const isSelected = lowSector.includes(skill);

    if (isSelected) {
      setLowSector((prev) => prev.filter((s) => s !== skill));

      const stillHasOther = lowSector
        .filter((s) => s !== skill)
        .some((s) => {
          return jobs.some(
            (j) => j.category === category && j.skills.includes(s)
          );
        });

      if (!stillHasOther) {
        setHighSector((prev) => prev.filter((c) => c !== category));
      }
    } else {
      setLowSector((prev) => [...prev, skill]);

      if (!highSector.includes(category)) {
        setHighSector((prev) => [...prev, category]);
      }
    }
  };

  const handleComplete = () => {
    const dest =
      from === "onboarding"
        ? "/onboarding/profile-register"
        : from === "recruit"
        ? "/recruiting/register"
        : "/mypage/setting/profile";

    navigate(dest, {
      state: {
        prevData: prevData,
        high_sector: highSector,
        low_sector: lowSector,
      },
    });
  };

  const TopBarContent = () => (
    <div className="flex ct-center">
      <span className="text-h2 text-ct-black-100">프로필</span>
      <span
        className="absolute right-[23px] text-sub2 text-ct-gray-300"
        onClick={handleComplete}
      >
        완료
      </span>
    </div>
  );

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="mt-[19px] flex flex-col w-full px-[19px]">
        <span className="text-sub1 text-ct-black-200">희망직무</span>
        <div className="flex gap-[5px] mt-[6px]">
          <span className="text-body1 text-ct-gray-400">필수</span>
          <span className="text-body1 text-ct-gray-300">
            가장 희망하는 1개의 직무를 선택해주세요!
          </span>
        </div>

        <div className="mt-[22px] overflow-x-auto scrollbar-hide">
          <div className="flex whitespace-nowrap w-max">
            {jobs.map((item) => (
              <button
                key={item.category}
                onClick={() => setSelectedCategory(item.category)}
                className={`text-body1 h-[27px] px-[13px] py-[5px] min-w-[90px] ${
                  selectedCategory === item.category
                    ? "bg-ct-main-blue-100 text-ct-white"
                    : "text-ct-black-300"
                }`}
              >
                {item.category}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[18px] mt-[43px]">
          {currentCategory?.skills.map((skill) => (
            <div key={skill} className="flex justify-between">
              <span className="text-body1 text-[#898989]">{skill}</span>
              <button
                className="w-[19px] h-[19px] rounded-full bg-ct-gray-100 ct-center"
                onClick={() => toggleSkill(selectedCategory, skill)}
              >
                {lowSector.includes(skill) && (
                  <div className="w-[13px] h-[13px] rounded-full bg-ct-main-blue-200" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </TopBarContainer>
  );
}

export default JobPreference;
