import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopBarContainer from "../../components/common/TopBarContainer";
import KeywordCategoryTabs from "../../components/onboarding/KeywordCategoryTabs";
import SelectedKeywords from "../../components/onboarding/SelectedKeywords";
import KeywordList from "../../components/onboarding/KeywordList";

function CardKeyword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<
    "프로그래밍" | "디자인" | "데이터 분석" | "마케팅" | "제품&서비스" | "협업&조직문화" | "성과" | "창업&리더십" | "콘텐츠" | "프로젝트" | "외부경험&대외활동" | "자격&교육"
  >("프로그래밍");

  // ProfileCardRegister에서 전달된 기존 키워드 로드
  useEffect(() => {
    if (location.state?.selectedKeywords) {
      setSelectedKeywords(location.state.selectedKeywords);
    }
  }, [location.state]);

  const handleComplete = () => {
    // 최대 3개로 제한
    const finalKeywords = selectedKeywords.slice(0, 3);

    if (location.state?.from === "profile-card-register") {
      navigate("/mypage/create-card", {
        state: {
          ...location.state.currentData,
          selectedKeywords: finalKeywords,
          cardImageUrl: location.state.cardImageUrl, // 이미지 정보도 함께 전달
        },
      });
    } else if (location.state?.from === "company-card-register") {
      navigate("/mypage/create-card", {
        state: {
          ...location.state.currentData,
          selectedKeywords: finalKeywords,
          cardImageUrl: location.state.cardImageUrl, // 이미지 정보도 함께 전달
        },
      });
    } else if (location.state?.from === "edit-card") {
      navigate(`/mypage/edit-card/${location.state.cardId}`, {
        state: {
          ...location.state.currentData,
          selectedKeywords: finalKeywords,
          cardImageUrl: location.state.cardImageUrl, // 이미지 정보도 함께 전달
        },
      });
    } else {
      // 다른 경로에서 온 경우 기본 처리
      navigate(-1);
    }
  };

  const handleSelectKeyword = (keyword: string) => {
    if (!selectedKeywords.includes(keyword) && selectedKeywords.length < 3) {
      setSelectedKeywords((prev) => [...prev, keyword]);
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setSelectedKeywords((prev) => prev.filter((k) => k !== keyword));
  };

  const TopBarContent = () => {
    return (
      <div className="relative w-full ct-center">
        <span className="text-ct-black-100 text-h1">키워드 </span>
        <div className="absolute right-[22px]">
          <button
            onClick={handleComplete}
            className="text-sub2 text-ct-main-blue-100 cursor-pointer"
          >
            완료
          </button>
        </div>
      </div>
    );
  };

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="px-[16px] flex flex-col gap-5">
        <SelectedKeywords
          keywords={selectedKeywords}
          onRemove={handleRemoveKeyword}
        />
        <KeywordCategoryTabs
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
        <KeywordList
          category={activeCategory}
          selectedKeywords={selectedKeywords}
          onSelect={handleSelectKeyword}
        />
      </div>
    </TopBarContainer>
  );
}

export default CardKeyword;
