import { useState, useMemo } from "react";
import TopBarContainer from "../../components/common/TopBarContainer";
import { jobs } from "../../data/jobs";
import { useLocation, useNavigate } from "react-router-dom";

type From = "onboarding" | "recruit" | "filter" | "setting" | undefined;
type Mode = "single" | "multi";

type LocationState =
  | {
      from?: From;
      prevData?: any;
      high_sector?: string[] | string | null;
      low_sector?: string[] | string | null;
    }
  | undefined;

function JobPreference() {
  const { state } = useLocation() as { state: LocationState };
  const navigate = useNavigate();

  const from = state?.from as From;
  const mode: Mode =
    from === "onboarding" || from === "setting" ? "single" : "multi";

  const initialSelectedCategory = useMemo(() => {
    if (Array.isArray(state?.high_sector) && state?.high_sector.length > 0)
      return state!.high_sector[0] as string;
    if (typeof state?.high_sector === "string" && state?.high_sector)
      return state!.high_sector as string;
    return "개발/엔지니어링";
  }, [state?.high_sector]);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialSelectedCategory
  );

  const [highSectorArr, setHighSectorArr] = useState<string[]>(
    Array.isArray(state?.high_sector) ? state?.high_sector ?? [] : []
  );
  const [lowSectorArr, setLowSectorArr] = useState<string[]>(
    Array.isArray(state?.low_sector) ? state?.low_sector ?? [] : []
  );

  const [highSectorOne, setHighSectorOne] = useState<string>(
    typeof state?.high_sector === "string" ? state?.high_sector ?? "" : ""
  );
  const [lowSectorOne, setLowSectorOne] = useState<string>(
    typeof state?.low_sector === "string" ? state?.low_sector ?? "" : ""
  );

  const currentCategory = jobs.find((j) => j.category === selectedCategory);

  const toggleSkill = (category: string, skill: string) => {
    if (mode === "multi") {
      const picked = lowSectorArr.includes(skill);
      if (picked) {
        const nextLow = lowSectorArr.filter((s) => s !== skill);
        setLowSectorArr(nextLow);
        const stillHas = nextLow.some((s) =>
          jobs.some((j) => j.category === category && j.skills.includes(s))
        );
        if (!stillHas)
          setHighSectorArr((prev) => prev.filter((c) => c !== category));
      } else {
        setLowSectorArr((prev) => [...prev, skill]);
        if (!highSectorArr.includes(category))
          setHighSectorArr((prev) => [...prev, category]);
      }
    } else {
      if (lowSectorOne === skill) {
        setLowSectorOne("");
        setHighSectorOne("");
      } else {
        setLowSectorOne(skill);
        setHighSectorOne(category);
      }
    }
  };

  const handleComplete = () => {
    const dest =
      from === "onboarding"
        ? "/onboarding/profile-register"
        : from === "recruit"
        ? "/recruiting/register"
        : from === "filter"
        ? "/searching/filter"
        : from === "setting"
        ? "/mypage/setting/profile"
        : "/mypage/setting/profile";

    if (mode === "multi") {
      navigate(dest, {
        state: {
          prevData: state?.prevData,
          high_sector: highSectorArr,
          low_sector: lowSectorArr,
        },
        replace: true,
      });
    } else {
      navigate(dest, {
        state: {
          prevData: state?.prevData,
          high_sector: highSectorOne || null,
          low_sector: lowSectorOne || null,
        },
        replace: true,
      });
    }
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

  const isChecked = (skill: string) =>
    mode === "multi" ? lowSectorArr.includes(skill) : lowSectorOne === skill;

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="mt-[19px] flex flex-col w-full px-[19px]">
        <span className="text-sub1 text-ct-black-200">희망직무</span>
        <div className="flex gap-[5px] mt-[6px]">
          <span className="text-body1 text-ct-gray-400">필수</span>
          <span className="text-body1 text-ct-gray-300">
            희망하는 직무를 1개 이상 선택해주세요!
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
                {isChecked(skill) && (
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
