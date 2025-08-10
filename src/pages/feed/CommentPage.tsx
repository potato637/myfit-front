// CommentPage.tsx (댓글 전용 페이지 - React + Vite)
import { useParams, useNavigate } from "react-router-dom";
import ChatInputField from "../../components/chatting/ChatInputField";

export default function CommentPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (text: string) => {
    console.log(`[Feed ${postId}] 댓글 작성:`, text);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
        <h2 className="text-lg font-semibold">댓글</h2>
        <button onClick={() => navigate(-1)} className="text-sm text-blue-500">
          닫기
        </button>
      </div>

      {/* 댓글 목록 */}
      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-24">
        {/* TODO: 실제 API로 댓글 데이터 연동 필요 */}
      </div>

      {/* 자동완성 버튼 + 입력창 */}
      <div className="sticky bottom-0 z-10 bg-white border-t border-gray-200 px-4 pt-2 pb-4">
        <div className="overflow-x-auto scrollbar-hide mb-2">
          <div className="flex gap-2 w-max whitespace-nowrap pr-2">
            {[
              "🧳 함께 일 해보고싶어요!",
              "⏱ 비슷한 루틴을 원해요!",
              "더 많은 활동이 궁금해요!",
              "함께 활동을 만들고 싶어요!",
            ].map((label, i) => (
              <button
                key={i}
                className="flex-shrink-0 border rounded-full py-2 px-4 text-sm font-semibold"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <ChatInputField onSend={handleSubmit} />
      </div>
    </div>
  );
}
