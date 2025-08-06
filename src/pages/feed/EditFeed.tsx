import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFeedForEdit, updateFeed } from "../../apis/feed";
import { UpdateFeedRequest } from "../../types/feed/editFeed";
import TopBarContainer from "../../components/common/TopBarContainer";
import MultiImageUploadBox from "../../components/common/MultiImageUploadBox";
import KeywordInput from "../../components/feed/KeywordInput";
import BottomNav from "../../components/layouts/BottomNav";

export default function EditFeed() {
  const { feedId } = useParams<{ feedId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // textarea 자동 높이 조절
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(48, textarea.scrollHeight)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [content]);

  // 피드 조회
  const { data: feedData, isLoading } = useQuery({
    queryKey: ["feedForEdit", feedId],
    queryFn: () => getFeedForEdit(Number(feedId)),
    enabled: !!feedId,
  });

  // 피드 수정 mutation
  const updateMutation = useMutation({
    mutationFn: (request: UpdateFeedRequest) => updateFeed(Number(feedId), request),
    onSuccess: (data) => {
      alert("게시글이 수정되었습니다!");
      // 피드 목록 쿼리들 무효화
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      queryClient.invalidateQueries({ queryKey: ["feedForEdit", feedId] });
      navigate("/feed");
    },
    onError: (error) => {
      alert("게시글 수정에 실패했습니다. 다시 시도해주세요.");
    },
  });

  // 초기 데이터 설정
  useEffect(() => {
    if (feedData?.result?.feed) {
      setContent(feedData.result.feed.feed_text);
      setKeywords(feedData.result.feed.hashtags);
      setImages(feedData.result.feed.images);
    }
  }, [feedData]);

  const handleSubmit = async () => {
    // 기본 검증
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    // API 요청 데이터 구성
    const requestData = {
      images: images,
      feed_text: content.trim(),
      hashtag: keywords,
    };

    updateMutation.mutate(requestData);
  };

  const TopBarContent = () => {
    return (
      <div className="relative w-full ct-center">
        <span className="text-ct-black-100 text-h1">게시글 수정</span>
        <div className="absolute right-[22px]">
          <button
            onClick={handleSubmit}
            disabled={updateMutation.isPending || !content.trim()}
            className={`text-sub2 cursor-pointer ${
              updateMutation.isPending || !content.trim() 
                ? "text-ct-gray-200" 
                : "text-ct-main-blue-100"
            }`}
          >
            {updateMutation.isPending ? "수정중..." : "완료"}
          </button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">피드 정보를 불러오는 중...</div>
      </div>
    );
  }

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
              className="w-full min-h-[48px] text-body1 text-ct-black-200 resize-none outline-none bg-[#F7F7F7] rounded-[8px] p-[12px] mb-[16px]"
            />
            <div className="ml-3">
              <KeywordInput 
                keywords={keywords}
                setKeywords={setKeywords}
              />
            </div>
          </div>
        </div>
        <BottomNav />
      </TopBarContainer>
    </>
  );
}