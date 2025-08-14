import BottomNavContainer from "../../components/layouts/BottomNavContainer";
import { useState } from "react";
import { jobs } from "../../data/jobs";
import SearchingSwipeItem from "../../components/searching/SearchingSwipeItem";
import { useNavigate } from "react-router-dom";
import { useSectorBaseSearching } from "../../hooks/searchingQueries";

function Searching() {
  const [selectedCategory, setSelectedCategory] = useState("기획/PM");
  const [selectedSkill, setSelectedSkill] = useState<string>("서비스 기획자");
  const [sortOption, setSortOption] = useState<"latest" | "oldest">("latest");
  const currentCategory = jobs.find((j) => j.category === selectedCategory);
  const navigate = useNavigate();

  // Use the search hook
  const { data } = useSectorBaseSearching({
    high_sector: selectedCategory,
    low_sector: selectedSkill,
    sort: sortOption,
  });

  const cardsData = data?.pages.flatMap((page) => page.result.cards);

  return (
    <BottomNavContainer>

      {/* 검색 필터 영역 - 상단 고정 */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-ct-white shadow-sm border-b border-ct-gray-100 max-w-md mx-auto">
        {/* 직군 검색 */}
        <div className="py-[20px]">
          <div className="flex h-[36px] px-[15px] overflow-x-scroll whitespace-nowrap scrollbar-hide">
            {jobs.map((item) => (
              <button
                key={item.category}
                className={`h-[32px] text-h2 tracking-[-0.408px] px-[21px] pb-[10px] ${
                  selectedCategory === item.category
                    ? "border-b-[4px] border-ct-gray-300 text-ct-black-300"
                    : "text-ct-gray-200"
                }`}
                onClick={() => {
                  setSelectedCategory(item.category);
                  const firstSkill = jobs.find(
                    (j) => j.category === item.category
                  )?.skills[0];
                  if (firstSkill) {
                    setSelectedSkill(firstSkill);
                  }
                }}
              >
                {item.category}
              </button>
            ))}
          </div>
          <div className="mt-[11px] flex w-full max-w-[401px] px-[15px] overflow-x-scroll whitespace-nowrap scrollbar-hide">
            {currentCategory?.skills.map((skill) => (
              <button
                key={skill}
                className={`flex-1 text-h2 px-[13px] tracking-[-0.32px] ${
                  selectedSkill === skill
                    ? "text-ct-black-300"
                    : "text-ct-gray-200"
                }`}
                onClick={() => setSelectedSkill(skill)}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* 최신 순 및 필터 */}
        <div className="w-full ct-center pb-[15px]">
          <div className="w-[340px] flex justify-between items-center">
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) =>
                  setSortOption(e.target.value as "latest" | "oldest")
                }
                className="text-sub2 text-ct-black-200 bg-transparent appearance-none pr-6 focus:outline-none"
              >
                <option value="latest">최신 순</option>
                <option value="oldest">오래된 순</option>
              </select>
            </div>
            <div
              className="w-[60px] h-[25px] ct-center bg-ct-main-blue-100 rounded-[5px]"
              onClick={() => navigate("/searching/filter")}
            >
              <span className="text-ct-white text-body1 mr-[6px]">필터</span>
              <img src="/assets/searching/filter.svg" alt="필터 아이콘" />
            </div>
          </div>
        </div>
      </div>

      {/* 고정 헤더 높이만큼 여백 */}
      <div className="h-[160px]"></div>
      
      <div className="w-full ct-center flex-col">
        {/* 검색 결과 */}
        <div className="w-full ct-center flex-col mt-[30px] space-y-[40px] pb-[80px]">
          {cardsData?.map((card) => (
            <SearchingSwipeItem key={card.card_id} card={card} />
          ))}
        </div>
      </div>
    </BottomNavContainer>
  );
}

export default Searching;