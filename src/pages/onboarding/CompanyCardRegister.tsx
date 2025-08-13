import { useState, useEffect } from "react";
import BottomCTAButton from "../../components/common/BottomCTAButton";
import ImageUploadBox from "../../components/common/ImageUploadBox";
import TopBarContainer from "../../components/common/TopBarContainer";
import InputField from "../../components/onboarding/InputField";
import { useNavigate, useLocation } from "react-router-dom";
import { createActivityCard } from "../../apis/onboarding";
import { ActivityCardRequest } from "../../types/common/activityCard";
import { useSignup } from "../../contexts/SignupContext";
import { toast } from "react-toastify";

function CompanyCardRegister() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signupData } = useSignup();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 폼 데이터 상태
  const [cardImageUrl, setCardImageUrl] = useState<string>(""); // S3 업로드된 이미지 URL
  const [oneLineIntro, setOneLineIntro] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [link, setLink] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

  // KeywordSelector에서 돌아온 데이터 처리
  useEffect(() => {
    if (location.state?.selectedKeywords) {
      setKeywords(location.state.selectedKeywords);
      // 다른 폼 데이터도 복원
      if (location.state.oneLineIntro)
        setOneLineIntro(location.state.oneLineIntro);
      if (location.state.detailedDescription)
        setDetailedDescription(location.state.detailedDescription);
      if (location.state.link) setLink(location.state.link);
      // 이미지 정보도 복원
      if (location.state.cardImageUrl)
        setCardImageUrl(location.state.cardImageUrl);
    }
  }, [location.state]);

  const TopBarContent = () => {
    return <span className="text-h2 font-sans text-ct-black-300">프로필</span>;
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // 필수 데이터 검증
      if (!signupData.serviceId) {
        console.error(
          "❌ [CompanyCardRegister] service_id가 없습니다:",
          signupData
        );
        alert("회원가입 정보가 없습니다. 다시 로그인해주세요.");
        return;
      }

      if (!oneLineIntro.trim() || !detailedDescription.trim()) {
        alert("한줄 소개와 상세 설명을 모두 입력해주세요.");
        return;
      }

      if (keywords.length === 0) {
        alert("키워드를 최소 1개 이상 선택해주세요.");
        return;
      }

      if (!cardImageUrl) {
        alert("카드 이미지를 업로드해주세요.");
        return;
      }

      // 이력/활동 카드 등록 API 호출
      const cardRequest: ActivityCardRequest = {
        service_id: signupData.serviceId!, // 위에서 null 체크 완료
        card_img: cardImageUrl,
        card_one_line_profile: oneLineIntro.trim(),
        detailed_profile: detailedDescription.trim(),
        link: link.trim(),
        keyword_text: keywords,
      };

      console.log("🎯 [CompanyCardRegister] 카드 등록 요청:", cardRequest);
      console.log("🔍 [CompanyCardRegister] SignupData 상태:", signupData);

      const response = await createActivityCard(cardRequest);

      if (response.isSuccess) {
        console.log("✅ [CompanyCardRegister] 카드 등록 성공:", response);
        navigate("/onboarding/company-verification");
      } else {
        throw new Error(response.message || "카드 등록 실패");
      }
    } catch (error: any) {
      console.error("❌ [CompanyCardRegister] 카드 등록 실패:", error);

      // 구체적인 에러 메시지 표시
      if (error.response?.status === 400) {
        alert("입력 정보를 다시 확인해주세요.");
      } else if (error.response?.status === 401) {
        alert("로그인이 필요합니다. 다시 로그인해주세요.");
        navigate("/onboarding/splash");
        return;
      } else if (error.response?.status === 500) {
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } else {
        alert("카드 등록에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="relative flex flex-col pt-[24px] mx-[22px] border-t border-ct-gray-200">
        {/* ✅ 스텝 인디케이터 */}
        <div className="absolute top-[8px] right-0 flex items-center gap-[6px]">
          {/* 스텝 아이콘 */}
          <img src="/assets/onboarding/nonestep.svg" alt="none" />
          <img src="/assets/onboarding/step2.svg" alt="현재 스텝 2" />
        </div>
        <div className="flex flex-col mt-[25px] mb-[31px]">
          {/* 안내 텍스트 */}
          <p className="text-sub2 text-ct-gray-300  mb-[17px]">
            첫 이력/활동 카드를 등록해보세요. <br />
            '일'과 관련된 것이라면 무엇이든 좋아요.
          </p>
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
              카드 클릭 시 상세 설명이 표시됩니다. <br />
              300자 이내로 내용을 입력해주세요!
            </span>
          }
        />{" "}
        <InputField
          label="링크(선택)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          helperText={
            <span>나를 소개할 수 있는 링크가 있다면 공유해주세요!</span>
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
                navigate("/onboarding/keyword-selector", {
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
            navigate("/onboarding/company-preview", {
              state: {
                cardData: {
                  cardImageUrl, // S3 이미지 URL 전달
                  oneLineIntro,
                  detailedDescription,
                  link,
                  keywords,
                },
                from: "company-card-register",
              },
            });
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
export default CompanyCardRegister;
