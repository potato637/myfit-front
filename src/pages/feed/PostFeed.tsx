import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MultiImageUploadBox from "../../components/common/MultiImageUploadBox";
import TopBarContainer from "../../components/common/TopBarContainer";
import KeywordInput from "../../components/feed/KeywordInput";
import { createFeed } from "../../apis/feed";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

function PostFeed() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // textarea 자동 높이 조절
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.max(48, textarea.scrollHeight)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [content]);

  // 피드 작성 mutation
  const createFeedMutation = useMutation({
    mutationFn: createFeed,
    onSuccess: () => {
      toast.success("피드가 작성되었습니다!");
      // 피드 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      navigate("/feed");
    },
    onError: () => {
      toast.error("피드 작성에 실패했습니다.");
    },
  });

  const handleSubmit = async () => {
    // 기본 검증
    if (!content.trim()) {
      toast.error("내용을 입력해주세요.");
      return;
    }

    if (!user?.id) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    // API 요청 데이터 구성
    const requestData = {
      images: images, // 이미지 배열 그대로 전달
      feed_text: content.trim(),
      hashtag: keywords,
      service_id: user.id,
    };

    createFeedMutation.mutate(requestData);
  };

  const TopBarContent = () => {
    return (
      <div className="relative w-full ct-center">
        <span className="text-ct-black-100 text-h1">게시글 추가 </span>
        <div className="absolute right-[22px]">
          <button
            onClick={handleSubmit}
            disabled={createFeedMutation.isPending || !content.trim()}
            className={`text-sub2 cursor-pointer ${
              createFeedMutation.isPending || !content.trim()
                ? "text-ct-gray-200"
                : "text-ct-main-blue-100"
            }`}
          >
            {createFeedMutation.isPending ? "작성중..." : "완료"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <TopBarContainer TopBarContent={<TopBarContent />}>
        <div className="flex flex-col px-[16px] overflow-y-auto max-h-screen pb-[100px]">
          {/* ✅ 다중 이미지 업로드 영역 */}
          <div className="flex flex-col mb-[19px]">
            <MultiImageUploadBox
              className="w-full mt-4"
              images={images}
              onImagesChange={setImages}
              maxImages={10}
              S3Folder="feeds"
            />
          </div>
          {/* ✅ 내용 입력 영역 */}
          <div className="mb-[29px]">
            <p className="text-sub1 font-semibold text-ct-black-200 mb-[11px] ml-3">
              내용 입력
            </p>
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={2200}
              className="w-full min-h-[48px] text-sub2 text-ct-black-200 resize-none outline-none bg-[#F7F7F7] rounded-[8px] p-[12px] mb-[16px]"
            />
            <div className="ml-3">
              <KeywordInput keywords={keywords} setKeywords={setKeywords} />
            </div>
          </div>
        </div>
      </TopBarContainer>
    </>
  );
}

export default PostFeed;
