import { useState } from "react";
import { Comment } from "../../types/feed/comment";
import CommentItem from "./CommentItem";

interface Props {
  comments: Comment[];
}

function CommentList({ comments }: Props) {
  return (
    <div className="flex flex-col gap-6">
      {comments.map((comment) => (
        <CommentThread key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

function CommentThread({ comment }: { comment: Comment }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasReplies = comment.replies.length > 0;

  return (
    <div className="flex flex-col gap-4 ">
      <CommentItem comment={comment} />

      {hasReplies && !isOpen && (
        <div className="mt-2 flex items-center justify-center gap-2">
          {/* 선 */}
          <div className="h-px basis-[20%] bg-gray-200" />
          {/* 버튼 */}
          <button
            onClick={() => setIsOpen(true)}
            className="text-body2 text-ct-gray-300 hover:underline whitespace-nowrap"
          >
            답글 {comment.replies.length}개 보기
          </button>
          {/* 오른쪽 선 */}
          <div className="h-px basis-[20%] bg-gray-200" />
        </div>
      )}

      {hasReplies && isOpen && (
        <>
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply />
          ))}

          <div className="mt-2 flex items-center justify-center gap-2">
            <div className="h-px basis-[20%] bg-gray-200" />
            <button
              onClick={() => setIsOpen(false)}
              className="text-body2 text-ct-gray-300 hover:underline whitespace-nowrap"
            >
              답글 숨기기
            </button>
            <div className="h-px basis-[20%] bg-gray-200" />
          </div>
        </>
      )}
    </div>
  );
}

export default CommentList;
