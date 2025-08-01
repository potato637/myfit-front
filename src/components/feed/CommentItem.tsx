import { Comment, Reply } from "../../types/feed/comment";
import getTimeAgo from "../../utils/timeAgo";

interface Props {
  comment: Comment | Reply;
  isReply?: boolean;
  onReplyClick?: (commentId: number, userName: string) => void;
  onDeleteClick?: (commentId: number) => void;
  currentUserId?: number; // 현재 사용자 ID (삭제 권한 확인용)
}

function CommentItem({ comment, isReply = false, onReplyClick, onDeleteClick, currentUserId }: Props) {
  // 현재 사용자가 작성한 댓글인지 확인
  const isMyComment = currentUserId && comment.service.id === currentUserId;
  return (
    <div className={`flex gap-2 ${isReply ? "ml-10" : ""}`}>
      {/* 프로필 이미지 */}
      <img
        src={comment.service.profile_img}
        alt={comment.service.name}
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="flex flex-col text-sm w-full">
        {/* 이름 / 직무 */}
        <p className="text-sub3 text-ct-black-200">
          <span>{comment.service.name}</span>
          <span> / {comment.service.high_sector}</span>
        </p>

        {/* 댓글 텍스트 */}
        <p className="mt-1 text-ct-black-100">{comment.content}</p>

        {/* 하단 정보: 시간 / 답글달기 / 삭제 */}
        <div className="flex justify-between items-center mt-1 text-body2 text-ct-gray-300">
          <div className="flex gap-3">
            <span>{getTimeAgo(comment.created_at)}</span>{" "}
            {!isReply && onReplyClick && (
              <button 
                type="button" 
                className="hover:underline"
                onClick={() => onReplyClick(comment.id, comment.service.name)}
              >
                답글달기
              </button>
            )}
          </div>
          {isMyComment && onDeleteClick && (
            <button 
              type="button" 
              className="hover:underline text-red-500"
              onClick={() => {
                if (window.confirm("댓글을 삭제하시겠습니까?")) {
                  onDeleteClick(comment.id);
                }
              }}
            >
              삭제
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentItem;