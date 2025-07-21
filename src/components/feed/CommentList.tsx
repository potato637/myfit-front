import { useState } from "react";
import { Comment } from "../../types/feed/comment";
import CommentItem from "./CommentItem";

interface Props {
  comments: Comment[];
}

function CommentList({ comments }: Props) {
  return (
    <div className="flex flex-col gap-4">
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
    <div className="flex flex-col gap-3">
      <CommentItem comment={comment} />

      {hasReplies && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="ml-12 text-xs text-gray-500 hover:underline"
        >
          답글 {comment.replies.length}개 보기
        </button>
      )}

      {hasReplies && isOpen && (
        <>
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply />
          ))}
          <button
            onClick={() => setIsOpen(false)}
            className="ml-12 text-xs text-gray-500 hover:underline"
          >
            접기
          </button>
        </>
      )}
    </div>
  );
}

export default CommentList;
