import { Comment, Reply } from "../../types/feed/comment";

interface Props {
  comment: Comment | Reply;
  isReply?: boolean;
}

function CommentItem({ comment, isReply = false }: Props) {
  return (
    <div className={`flex gap-2 ${isReply ? "ml-10" : ""}`}>
      {/* 프로필 이미지 */}
      <img
        src={comment.writer.profile_image_url}
        alt={comment.writer.name}
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="flex flex-col text-sm w-full">
        {/* 이름 / 직무 */}
        <p className="text-sub3 text-ct-black-200">
          <span>{comment.writer.name}</span>
          <span> / {comment.writer.job}</span>
        </p>

        {/* 댓글 텍스트 */}
        <p className="mt-1 text-ct-black-100">{comment.comment_text}</p>

        {/* 하단 정보: 시간 / 답글달기 / 삭제 */}
        <div className="flex justify-between items-center mt-1 text-body2 text-gray-300">
          <div className="flex gap-3">
            <span>{new Date(comment.created_at).toLocaleString()}</span>
            <button type="button" className="hover:underline">
              답글달기
            </button>
          </div>
          <button type="button" className="hover:underline">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
