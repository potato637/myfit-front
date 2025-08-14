import { useState, useEffect } from "react";
import BottomCTAButton from "../../components/common/BottomCTAButton";
import ImageUploadBox from "../../components/common/ImageUploadBox";
import TopBarContainer from "../../components/common/TopBarContainer";
import InputField from "../../components/onboarding/InputField";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useGetActivityCard, useUpdateActivityCard } from "../../hooks/mypageQueries";
import { toast } from "react-toastify";

function EditCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cardId } = useParams<{ cardId: string }>();
  const { user } = useAuth();
  
  // 카드 상세 정보 조회
  const { data: cardDetail, isLoading } = useGetActivityCard(Number(cardId!));
  const updateCardMutation = useUpdateActivityCard();

  // 폼 데이터 상태
  const [cardImageUrl, setCardImageUrl] = useState<string>("");
  const [oneLineIntro, setOneLineIntro] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [link, setLink] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

  // 카드 데이터로 폼 초기화
  useEffect(() => {
    if (cardDetail?.result.card) {
      const card = cardDetail.result.card;
      setCardImageUrl(card.card_img);
      setOneLineIntro(card.card_one_line_profile);
      setDetailedDescription(card.detailed_profile);
      setLink(card.link || "");
      setKeywords(card.keyword_text);
    }
  }, [cardDetail]);

  // 키워드 선택기에서 돌아온 경우 상태 복원
  useEffect(() => {
    const state = location.state;
    if (state) {
      if (state.selectedKeywords) {
        setKeywords(state.selectedKeywords);
      }
      if (state.oneLineIntro !== undefined) {
        setOneLineIntro(state.oneLineIntro);
      }
      if (state.detailedDescription !== undefined) {
        setDetailedDescription(state.detailedDescription);
      }
      if (state.link !== undefined) {
        setLink(state.link);
      }
      if (state.cardImageUrl !== undefined) {
        setCardImageUrl(state.cardImageUrl);
      }
    }
  }, [location.state]);

  const TopBarContent = () => {
    return (
      <span className="text-h2 font-sans text-ct-black-300">카드 수정</span>
    );
  };

  const handleSubmit = async () => {
    try {
      // 필수 데이터 검증
      if (!user?.id) {
        toast.error("회원가입 정보가 없습니다. 다시 로그인해주세요.");
        return;
      }

      if (!oneLineIntro.trim() || !detailedDescription.trim()) {
        toast.error("한줄 소개와 상세 설명을 모두 입력해주세요.");
        return;
      }

      if (keywords.length === 0) {
        toast.error("키워드를 최소 1개 이상 선택해주세요.");
        return;
      }

      if (!cardImageUrl) {
        toast.error("카드 이미지를 업로드해주세요.");
        return;
      }

      // 이력/활동 카드 수정 API 호출
      const cardRequest = {
        card_img: cardImageUrl,
        card_one_line_profile: oneLineIntro.trim(),
        detailed_profile: detailedDescription.trim(),
        link: link.trim(),
        keyword_text: keywords,
      };

      await updateCardMutation.mutateAsync({
        cardId: Number(cardId!),
        request: cardRequest,
      });

      toast.success("카드가 성공적으로 수정되었습니다.");
      navigate("/mypage");
    } catch (error: any) {
      console.error("❌ 카드 수정 실패:", error);
      
      // 구체적인 에러 메시지 표시
      if (error.response?.status === 400) {
        toast.error("입력 정보를 다시 확인해주세요.");
      } else if (error.response?.status === 401) {
        toast.error("로그인이 필요합니다. 다시 로그인해주세요.");
        navigate("/onboarding/splash");
        return;
      } else if (error.response?.status === 500) {
        toast.error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } else {
        toast.error("카드 수정에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  if (isLoading) {
    return (
      <TopBarContainer TopBarContent={<TopBarContent />}>
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-2 border-ct-main-blue-200 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </TopBarContainer>
    );
  }

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="relative flex flex-col pt-[24px] mx-[22px] border-t border-ct-gray-200">
        <div className="flex flex-col mt-[25px] mb-[31px]">
          <ImageUploadBox
            className="w-full h-[407.5px] rounded-[5px] bg-ct-gray-100"
            textClassName="text-body2 font-Pretendard text-ct-gray-300"
            initialPreview={cardImageUrl}
            onUploadSuccess={(url) => {
              setCardImageUrl(url);
              console.log("✅ 카드 이미지 업로드 성공:", url);
            }}
            S3Folder="cards/company"
          />
        </div>
        <InputField
          label="한줄 소개"
          as="textarea"
          placeholder="50자 이내"
          value={oneLineIntro}
          onChange={(e) => setOneLineIntro(e.target.value)}
          maxLength={50}
          showCounter={true}
          helperText={
            <span>
              사진과 함께 보여질 한 줄 소개를 50자 이내로 작성해주세요!
            </span>
          }
        />
        <InputField
          label="상세 설명"
          as="textarea"
          placeholder="300자 이내"
          value={detailedDescription}
          onChange={(e) => setDetailedDescription(e.target.value)}
          maxLength={300}
          showCounter={true}
          helperText={
            <span>
              카드 클릭 시 상세 설명이 표시됩니다. 300자 이내로 내용을
              입력해주세요!
            </span>
          }
        />
        <InputField
          label="링크(선택)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          helperText={
            <span>카드에 대해 소개할 수 있는 링크가 있다면 공유해주세요!</span>
          }
        />
        <div className="flex flex-col items-start mb-[24px]">
          <label className="pl-[7px] text-sub1 text-ct-black-200 mb-[8px] block">
            키워드
          </label>

          <div className="flex flex-wrap items-center gap-[8px] mb-[9px]">
            <button
              type="button"
              onClick={() =>
                navigate("/mypage/keyword-selector", {
                  state: {
                    from: "edit-card",
                    currentData: {
                      oneLineIntro,
                      detailedDescription,
                      link,
                    },
                    selectedKeywords: keywords,
                    cardImageUrl: cardImageUrl,
                    cardId: cardId, // 수정 시에는 cardId도 전달
                  },
                })
              }
              className="min-w-[50px] h-[28px] px-[12px] rounded-[9px] bg-ct-gray-100 text-ct-gray-200 text-[24px] flex items-center justify-center"
            >
              +
            </button>

            {keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-[12px] py-[6px] bg-ct-light-blue-100 text-ct-main-blue-100 text-body2 rounded-[9px]"
              >
                {keyword}
              </span>
            ))}
          </div>

          <span className="text-ct-gray-300 text-body2">
            카드에 대한 키워드를 추가해주세요! (최대 3개)
          </span>
        </div>
        
        <BottomCTAButton
          text={updateCardMutation.isPending ? "수정 중..." : "카드 수정 완료"}
          onClick={handleSubmit}
          disabled={updateCardMutation.isPending || !oneLineIntro || !detailedDescription}
        />
      </div>
    </TopBarContainer>
  );
}

export default EditCard;