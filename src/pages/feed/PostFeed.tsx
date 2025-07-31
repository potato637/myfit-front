import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploadBox from "../../components/common/ImageUploadBox";
import TopBarContainer from "../../components/common/TopBarContainer";
import KeywordInput from "../../components/feed/KeywordInput";
import BottomNav from "../../components/layouts/BottomNav";

function PostFeed() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // 기본 검증
      if (!content.trim()) {
        alert("내용을 입력해주세요.");
        return;
      }
      
      // TODO: 피드 게시 API 호출
      console.log("🎯 [PostFeed] 게시글 작성:", {
        content: content.trim(),
        image,
        keywords
      });
      
      // 임시: 성공 시 피드 메인으로 이동
      alert("게시글이 작성되었습니다!");
      navigate("/feed/feed-main");
      
    } catch (error) {
      console.error("❌ [PostFeed] 게시글 작성 실패:", error);
      alert("게시글 작성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const TopBarContent = () => {
    return (
      <div className="relative w-full ct-center">
        <span className="text-ct-black-100 text-h1">게시글 추가 </span>
        <div className="absolute right-[22px]">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !content.trim()}
            className={`text-sub2 cursor-pointer ${
              isSubmitting || !content.trim() 
                ? "text-ct-gray-200" 
                : "text-ct-main-blue-100"
            }`}
          >
            {isSubmitting ? "작성중..." : "완료"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <TopBarContainer TopBarContent={<TopBarContent />}>
        <div className="flex flex-col px-[16px] ">
          {/* ✅ 이미지 업로드 영역 */}
          <div className="flex flex-col mb-[19px]">
            <ImageUploadBox
              className="w-full mt-4 aspect-square rounded-[5px] bg-ct-gray-100 overflow-hidden"
              textClassName="text-body3 text-ct-gray-300"
              onUploaded={(url) => setImage(url)}
            />
          </div>
          {/* ✅ 내용 입력 영역 */}
          <div className="mb-[29px] pl-3">
            <p className="text-sub1 font-semibold text-ct-black-200 mb-[11px]">
              내용 입력
            </p>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={1000}
              placeholder="내용을 아침엔 트렌드 체크, 점심 전엔 경쟁 서비스 분석, 오후엔 사용 자 리서치 인터뷰. 집중하려면 역시 인사동 카페 자유로운 시간을 보내며 루틴 채워가기!"
              className="w-full h-[112px] text-body1 text-ct-black-200 resize-none outline-none placeholder:text-ct-gray-300 bg-transparent"
            />
            <KeywordInput />
          </div>
        </div>
        <BottomNav />
      </TopBarContainer>
    </>
  );
}

export default PostFeed;
