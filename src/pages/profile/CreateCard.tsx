import { useState, useEffect } from "react";
import BottomCTAButton from "../../components/common/BottomCTAButton";
import ImageUploadBox from "../../components/common/ImageUploadBox";
import TopBarContainer from "../../components/common/TopBarContainer";
import InputField from "../../components/onboarding/InputField";
import { useNavigate, useLocation } from "react-router-dom";
import { createActivityCard } from "../../apis/onboarding";
import { ActivityCardRequest } from "../../types/common/activityCard";
import { useAuth } from "../../contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function CreateCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 폼 데이터 상태
  const [cardImageUrl, setCardImageUrl] = useState<string>("");
  const [oneLineIntro, setOneLineIntro] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [link, setLink] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

  // 이전 상태 복원 (KeywordSelector 또는 Preview에서 돌아온 경우)
  useEffect(() => {
    if (location.state) {
      if (location.state.selectedKeywords) {
        setKeywords(location.state.selectedKeywords);
      }
      if (location.state.oneLineIntro !== undefined) {
        setOneLineIntro(location.state.oneLineIntro);
      }
      if (location.state.detailedDescription !== undefined) {
        setDetailedDescription(location.state.detailedDescription);
      }
      if (location.state.link !== undefined) {
        setLink(location.state.link);
      }
      if (location.state.cardImageUrl !== undefined) {
        setCardImageUrl(location.state.cardImageUrl);
      }
    }
  }, [location.state]);

  const TopBarContent = () => {
    return (
      <span className="text-h2 font-sans text-ct-black-300">카드 추가</span>
    );
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // 필수 데이터 검증
      if (!user?.id) {
        console.error("❌ [CompanyCardRegister] service_id가 없습니다:", user);
        toast.error("로그인 정보가 없습니다.");
        return;
      }

      if (!oneLineIntro.trim() || !detailedDescription.trim()) {
        toast.error("소개글을 모두 입력해주세요.");
        return;
      }

      if (keywords.length === 0) {
        toast.error("키워드를 1개 이상 선택해주세요.");
        return;
      }

      if (!cardImageUrl) {
        toast.error("카드 이미지를 업로드해주세요.");
        return;
      }

      // 이력/활동 카드 등록 API 호출
      const cardRequest: ActivityCardRequest = {
        service_id: user.id!, // 위에서 null 체크 완료
        card_img: cardImageUrl,
        card_one_line_profile: oneLineIntro.trim(),
        detailed_profile: detailedDescription.trim(),
        link: link.trim(),
        keyword_text: keywords,
      };

      console.log("🎯 [CompanyCardRegister] 카드 등록 요청:", cardRequest);
      console.log("🔍 [CompanyCardRegister] SignupData 상태:", user);

      const response = await createActivityCard(cardRequest);
      console.log("Card created successfully:", response);
      // Invalidate the cards query to refetch the updated list
      await queryClient.invalidateQueries({
        queryKey: ["cards", user?.id?.toString()],
      });
      navigate("/mypage");
      toast.success("카드 등록이 완료되었습니다.");
    } catch (error: any) {
      console.error("❌ [CompanyCardRegister] 카드 등록 실패:", error);

      // 구체적인 에러 메시지 표시
      if (error.response?.status === 400) {
        toast.error("입력 정보를 확인해주세요.");
      } else if (error.response?.status === 401) {
        toast.error("다시 로그인해주세요.");
        navigate("/onboarding/splash");
        return;
      } else if (error.response?.status === 500) {
        toast.error("서버 오류가 발생했습니다.");
      } else {
        toast.error("카드 등록에 실패했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="relative flex flex-col pt-[24px] mx-[22px] border-t border-ct-gray-200">
        <div className="flex flex-col mt-[25px] mb-[31px]">
          <ImageUploadBox
            className="w-full h-[407.5px] rounded-[5px] bg-ct-gray-100"
            textClassName="text-body2 font-Pretendard text-ct-gray-300"
            initialPreview={cardImageUrl} // 복원된 이미지 전달
            onUploadSuccess={(url) => {
              setCardImageUrl(url); // S3 업로드된 URL 저장
              console.log("✅ 회사 카드 이미지 업로드 성공:", url);
            }}
            S3Folder="cards/company" // 회사 카드 이미지용 폴더
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
        />{" "}
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
        />{" "}
        <InputField
          label="링크(선택)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          helperText={
            <span>카드에 대해 소개할 수 있는 링크가 있다면 공유해주세요!</span>
          }
        />
        <div className="flex flex-col items-start  mb-[24px]">
          <label className="pl-[7px] text-sub1 text-ct-black-200  mb-[8px] block">
            키워드
          </label>

          <div className="flex flex-wrap items-center gap-[8px] mb-[9px]">
            <button
              type="button"
              onClick={() =>
                navigate("/mypage/keyword-selector", {
                  state: {
                    from: "company-card-register",
                    currentData: {
                      oneLineIntro,
                      detailedDescription,
                      link,
                    },
                    selectedKeywords: keywords,
                    cardImageUrl: cardImageUrl, // 이미지 정보도 전달
                  },
                })
              }
              className="min-w-[50px] h-[28px] px-[12px] rounded-[9px] bg-ct-gray-100 text-ct-gray-200 text-[24px] flex items-center justify-center"
            >
              +
            </button>

            {/* 선택된 키워드 +버튼 옆에 렌더링 */}
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
        <button
          type="button"
          onClick={() => {
            const state = {
              cardData: {
                cardImageUrl,
                oneLineIntro,
                detailedDescription,
                link,
                keywords,
              },
              // 현재 폼 상태도 함께 전달하여 돌아왔을 때 복원할 수 있게 함
              oneLineIntro,
              detailedDescription,
              link,
              keywords,
              cardImageUrl,
              from: "company-card-register",
            };

            navigate("/onboarding/company-preview", { state });
          }}
          className="text-center text-sub1 text-ct-main-blue-100 my-[24px] cursor-pointer"
        >
          미리보기
        </button>
        <BottomCTAButton
          text={isSubmitting ? "등록 중..." : "카드 등록 완료"}
          onClick={handleSubmit}
          disabled={isSubmitting || !oneLineIntro || !detailedDescription}
        />
      </div>
    </TopBarContainer>
  );
}
export default CreateCard;
