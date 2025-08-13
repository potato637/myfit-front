import { useState } from "react";
import TopBarContainer from "../../components/common/TopBarContainer";
import { useLocation } from "react-router-dom";
import { useFilterResult } from "../../hooks/searchingQueries";
import SwipeContainer from "../../components/searching/SwipeContainer";
import ListContainer from "../../components/searching/ListContainer";

function TopBarContent() {
  return (
    <div>
      <span className="text-h2 text-ct-black-100">검색 결과</span>
    </div>
  );
}

function FilterResult() {
  const { state } = useLocation();
  const [viewType, setViewType] = useState<"swipe" | "list">("swipe");
  console.log(state);

  const { data, fetchNextPage, hasNextPage, isLoading } = useFilterResult({
    area: state?.region,
    status: state?.employmentStatus,
    hope_job: state?.hope_job,
    keywords: state?.keyword,
  });

  const allCards = data?.pages.flatMap((page) => page.result.cards) || [];

  const handleTypeClick = () => {
    setViewType(viewType === "swipe" ? "list" : "swipe");
  };

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="w-full ct-center py-[24px]">
        <div className="w-[340px] ct-center flex-col ">
          <div className="w-full flex justify-end gap-2">
            <span
              className="text-sub2 text-ct-black-200 cursor-pointer"
              onClick={handleTypeClick}
            >
              {viewType === "swipe" ? "전체보기" : "넘겨보기"}
            </span>
            <span className="text-sub2 text-ct-main-blue-100">
              총 {state?.count}장
            </span>
          </div>
          <div className="w-full flex flex-col mt-[30px]">
            {viewType === "swipe" ? (
              <SwipeContainer
                cards={allCards}
                isLoading={isLoading}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
              />
            ) : (
              <ListContainer
                cards={allCards}
                isLoading={isLoading}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
              />
            )}
          </div>
        </div>
      </div>
    </TopBarContainer>
  );
}

export default FilterResult;
