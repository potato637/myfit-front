import TopBarContainer from "../../components/common/TopBarContainer";
import BottomNavContainer from "../../components/layouts/BottomNavContainer";
import { useLocation, useNavigate } from "react-router-dom";
import PersonalInputField from "../../components/setting/PersonalInputField";
import { useState, useEffect } from "react";
import { useModal } from "../../contexts/ui/modalContext";
import { useCountCard } from "../../hooks/searchingQueries";
import { useFilter } from "../../contexts/filterContext";

import RegionModal from "../../components/onboarding/RegionModal";
import EmploymentStatusModal from "../../components/onboarding/EmploymentStatusModal";

function TopBarContent() {
  return (
    <div>
      <span className="text-h2 text-ct-black-100">필터링</span>
    </div>
  );
}

function Filter() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    filterState,
    updateRegion,
    updateEmploymentStatus,
    updateKeywords,
    updateJobPreference,
  } = useFilter();

  const [keywordError, setKeywordError] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState<string[]>([]);

  useEffect(() => {
    if (!location.state) return;

    // Handle job sector updates
    const s = location.state as {
      high_sector?: string | string[] | null;
      low_sector?: string | string[] | null;
      high_sector_list?: string[];
      low_sector_list?: string[];
      selectedKeywords?: string[];
    };

    // Update job sectors if they exist in location state
    if (s.high_sector !== undefined && s.high_sector !== null) {
      const highSector = Array.isArray(s.high_sector)
        ? s.high_sector[0] ?? ""
        : s.high_sector;
      const lowSector =
        s.low_sector !== undefined && s.low_sector !== null
          ? Array.isArray(s.low_sector)
            ? s.low_sector[0] ?? ""
            : s.low_sector
          : Array.isArray(s.low_sector_list)
          ? s.low_sector_list[0] ?? ""
          : "";

      updateJobPreference(highSector, lowSector);
    }

    // Update keywords if they exist in location state (coming back from CardKeyword)
    if (s.selectedKeywords) {
      updateKeywords(s.selectedKeywords);
      // Clear any existing keyword errors
      setKeywordError("");
    }
  }, [location.state]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedKeyword(filterState.keywords);
    }, 500);
    return () => clearTimeout(timerId);
  }, [filterState.keywords]);

  const { data: countData } = useCountCard({
    area: filterState.region,
    status: filterState.employmentStatus,
    hope_job: filterState.lowSectorText,
    keywords: debouncedKeyword,
  });

  const { openModal, closeModal } = useModal();

  return (
    <BottomNavContainer>
      <TopBarContainer TopBarContent={<TopBarContent />}>
        <div className="w-full flex flex-col flex-1 items-center justify-between">
          <div className="mt-[50px] ct-center flex-col w-[85%] gap-[20px]">
            <PersonalInputField
              label="주 활동 지역"
              value={filterState.region}
              placeholder="'시/도' 를 선택해주세요!"
              onClick={() =>
                openModal(
                  <RegionModal
                    onConfirm={(val) => {
                      updateRegion(val);
                      closeModal();
                    }}
                  />
                )
              }
            />
            <PersonalInputField
              label="구인/구직"
              value={filterState.employmentStatus}
              placeholder="구인/구직 상태를 선택해주세요!"
              onClick={() =>
                openModal(
                  <EmploymentStatusModal
                    onConfirm={(val) => {
                      updateEmploymentStatus(val);
                      closeModal();
                    }}
                  />
                )
              }
            />
            <div className="flex flex-col gap-[11px] w-full mb-[10px]">
              <label className="ml-1 text-sub1 text-ct-black-200">키워드</label>
              <div
                onClick={() => {
                  navigate("/mypage/keyword-selector", {
                    state: {
                      from: "filter",
                      selectedKeywords: filterState.keywords,
                    },
                  });
                }}
                className="w-full flex items-center text-sub2 placeholder:text-ct-gray-300 text-ct-black-200 font-Pretendard min-h-[44px] rounded-[10px] pl-[26px] bg-ct-gray-100 cursor-pointer"
              >
                {filterState.keywords.length > 0 ? (
                  <div className="flex flex-wrap gap-2 py-2 justify-start">
                    {filterState.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-ct-main-blue-50 text-ct-main-blue-200 rounded-full text-body2"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-ct-gray-300">
                    키워드를 선택해주세요 (최대 3개)
                  </span>
                )}
              </div>
              {keywordError && (
                <span className="text-body2 text-ct-red-100 pl-[13px]">
                  {keywordError}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-[11px] w-full mb-[10px]">
              <label className="ml-1 text-sub1 text-ct-black-200">직무</label>
              <input
                type="text"
                value={filterState.lowSectorText}
                readOnly
                placeholder="직무를 선택해주세요"
                className="w-full flex text-sub2 placeholder:text-ct-gray-300 text-ct-black-200 font-Pretendard min-h-[44px] rounded-[10px] pl-[26px] bg-ct-gray-100 cursor-pointer"
                onClick={() => {
                  navigate("/searching/filter/job-select", {
                    state: {
                      from: "filter",
                      high_sector: filterState.highSectorText,
                      low_sector: filterState.lowSectorText,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div
            className="mb-[30px] px-[40px] py-[10px] rounded-[100px] border-[1px] border-ct-main-blue-200 cursor-pointer"
            onClick={() => {
              if (!keywordError) {
                navigate("/searching/filter/result", {
                  state: {
                    keywords: debouncedKeyword,
                    region: filterState.region,
                    employmentStatus: filterState.employmentStatus,
                    hope_job: filterState.lowSectorText,
                    count: countData?.result?.count,
                  },
                });
              }
            }}
            style={{
              opacity: keywordError ? 0.6 : 1,
              cursor: keywordError ? "not-allowed" : "pointer",
            }}
          >
            <span className="text-sub1 text-ct-black-200">
              {(countData?.result?.count || 0) + "개의 카드가 검색되었습니다."}
            </span>
          </div>
        </div>
      </TopBarContainer>
    </BottomNavContainer>
  );
}

export default Filter;
