import { useState } from "react";
import TopBarContainer from "../../components/common/TopBarContainer";
import { jobs } from "../../data/jobs";
import { useLocation, useNavigate } from "react-router-dom";

type CategoryWithSkills = {
  category: string;
  skills: string[];
};

function JobPreference() {
  const location = useLocation();
  const nav = useNavigate();

  const from = location.state?.from;
  const prevData = location.state?.prevData;

  const [selectedCategory, setSelectedCategory] = useState("개발/엔지니어링");
  const [selectedSkills, setSelectedSkills] = useState<CategoryWithSkills[]>(
    () => {
      return location.state?.prevData?.selectedJob || [];
    }
  );
  const currentCategory = jobs.find((j) => j.category === selectedCategory);
  const handleSkillToggle = (category: string, skill: string) => {
    setSelectedSkills((prev) => {
      const targetCatergory = prev.find((c) => c.category === category);

      if (targetCatergory) {
        const exists = targetCatergory.skills.includes(skill);

        const updatedSkills = exists
          ? targetCatergory.skills.filter((s) => s !== skill)
          : [...targetCatergory.skills, skill];

        if (updatedSkills.length === 0) {
          return prev.filter((c) => c.category !== category);
        }
        return prev.map((c) =>
          c.category === category ? { ...c, skills: updatedSkills } : c
        );
      } else {
        return [...prev, { category, skills: [skill] }];
      }
    });
  };
  const TopBarContent = () => {
    return (
      <div className="flex ct-center">
        <span className="text-h2 text-ct-black-100">프로필</span>
        <span
          className="absolute right-[23px] text-sub2 text-ct-gray-300"
          onClick={() => {
            let destination = "/";
            if (from === "onboarding")
              destination = "/onboarding/profile-register";
            else if (from === "recruit")
              destination = "/recruit/registerannouncement";
            else destination = "/personalsetting/profile";

            nav(destination, {
              state: {
                prevData: prevData,
                selectedSkills: selectedSkills,
              },
            });
          }}
        >
          완료
        </span>
      </div>
    );
  };
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
                onClick={() => {
                  setSelectedCategory(item.category);
                }}
                className={`text-body1 text-ct-black-300 h-[27px] px-[13px] py-[5px] min-w-[90px] ${
                  selectedCategory === item.category
                    ? "bg-ct-main-blue-100 text-ct-white"
                    : ""
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
              <span className="text-body1 text-[#898989] ">{skill}</span>
              <button
                className="w-[19px] h-[19px] rounded-full bg-ct-gray-100 ct-center cursor-pointer"
                onClick={() => handleSkillToggle(selectedCategory, skill)}
              >
                {selectedSkills.some(
                  (c) =>
                    c.category === selectedCategory && c.skills.includes(skill)
                ) && (
                  <div className="w-[13px] h-[13px] rounded-full bg-ct-main-blue-200"></div>
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
