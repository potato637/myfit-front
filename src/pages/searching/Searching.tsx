import BottomNavContainer from "../../components/layouts/BottomNavContainer";
import { useState } from "react";
import { jobs } from "../../data/jobs";
import SearchingSwipeItem from "../../components/searching/SearchingSwipeItem";
import { useNavigate } from "react-router-dom";
import { useSectorBaseSearching } from "../../hooks/searchingQueries";
import SearchingTopBarContainer from "../../components/searching/SearchingTopBarContainer";
import SwipeItemSkeleton from "../../components/skeletons/searching/SwipeItemSkeleton";

function Searching() {
  const [selectedCategory, setSelectedCategory] = useState("기획/PM");
  const [selectedSkill, setSelectedSkill] = useState<string>("서비스 기획자");
  const [sortOption, setSortOption] = useState<"latest" | "oldest">("latest");
  const currentCategory = jobs.find((j) => j.category === selectedCategory);
  const navigate = useNavigate();

  // Use the search hook
  const { data, isLoading } = useSectorBaseSearching({
    high_sector: selectedCategory,
    low_sector: selectedSkill,
    sort: sortOption,
  });

  const cardsData = data?.pages.flatMap((page) => page.result.cards) || [];

  return (
    <BottomNavContainer>
      <SearchingTopBarContainer
        TopBarContent={
          <div className="w-full bg-ct-white">
            {/* 직군 검색 - 검색어 입력 필드 제거 */}
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
                      if (firstSkill) setSelectedSkill(firstSkill);
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
            <div className="w-full ct-center pb-[10px]">
              <div className="w-[90%] flex justify-between items-center">
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
                  <span className="text-ct-white text-body1 mr-[6px]">
                    필터
                  </span>
                  <img src="/assets/searching/filter.svg" alt="필터 아이콘" />
                </div>
              </div>
            </div>
          </div>
        }
      >
        {/* 검색 결과 - 개선된 카드 간격 적용 */}
        <div className="w-full ct-center flex-col space-y-[40px] pb-[80px]">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <SwipeItemSkeleton key={idx} />
            ))
          ) : cardsData.length === 0 ? (
            <div className="text-center py-8 text-sub2 text-ct-gray-200">
              현재 등록된 카드가 없습니다.
            </div>
          ) : (
            cardsData.map((card) => (
              <SearchingSwipeItem key={card.card_id} card={card} />
            ))
          )}
        </div>
      </SearchingTopBarContainer>
    </BottomNavContainer>
  );
}

export default Searching;
