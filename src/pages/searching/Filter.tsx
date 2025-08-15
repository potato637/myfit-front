import TopBarContainer from "../../components/common/TopBarContainer";
import BottomNavContainer from "../../components/layouts/BottomNavContainer";
import { useLocation, useNavigate } from "react-router-dom";
import PersonalInputField from "../../components/setting/PersonalInputField";
import { useState, useEffect } from "react";
import { z } from "zod";
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
    updateKeywordInput, 
    updateJobPreference 
  } = useFilter();
  
  const [keywordError, setKeywordError] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState<string[]>([]);

  useEffect(() => {
    if (!location.state) return;
    const s = location.state as {
      high_sector?: string | string[] | null;
      low_sector?: string | string[] | null;
      high_sector_list?: string[];
      low_sector_list?: string[];
    };
    
    if (s.high_sector !== undefined && s.high_sector !== null) {
      const highSector = Array.isArray(s.high_sector) ? s.high_sector[0] ?? "" : s.high_sector;
      const lowSector = s.low_sector !== undefined && s.low_sector !== null
        ? Array.isArray(s.low_sector) ? s.low_sector[0] ?? "" : s.low_sector
        : Array.isArray(s.low_sector_list) ? s.low_sector_list[0] ?? "" : "";
      
      updateJobPreference(highSector, lowSector);
    }
  }, [location.state]);

  const keywordSchema = z.object({
    keywords: z
      .array(z.string().min(1))
      .max(3, "키워드는 최대 3개까지 입력 가능합니다"),
  });

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

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateKeywordInput(value);
    const keywords = value
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);
    updateKeywords(keywords);
    const result = keywordSchema.safeParse({ keywords });
    if (!result.success) {
      const firstError =
        result.error.issues[0]?.message || "유효하지 않은 키워드입니다";
      setKeywordError(firstError);
    } else {
      setKeywordError("");
    }
  };

  const { openModal, closeModal } = useModal();

  return (
    <BottomNavContainer>
      <TopBarContainer TopBarContent={<TopBarContent />}>
        <div className="w-full flex flex-col flex-1 items-center justify-between">
          <div className="mt-[50px] ct-center flex-col w-[330px] gap-[20px]">
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
              <input
                type="text"
                value={filterState.keywordInput}
                onChange={handleKeywordChange}
                placeholder="최대 3개 ( ,로 구분됩니다. )"
                className="w-full flex text-sub2 placeholder:text-ct-gray-300 text-ct-black-200 font-Pretendard min-h-[44px] rounded-[10px] pl-[26px] bg-ct-gray-100"
              />
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
