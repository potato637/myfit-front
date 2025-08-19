function CommentSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {/* 댓글 아이템들 */}
      {Array(3)
        .fill(0)
        .map((_, idx) => (
          <div key={idx} className="flex gap-3">
            {/* 프로필 이미지 */}
            <div className="w-8 h-8 bg-ct-gray-100 rounded-full flex-shrink-0" />
            
            {/* 댓글 내용 */}
            <div className="flex-1 flex flex-col gap-2">
              {/* 사용자명과 시간 */}
              <div className="flex items-center gap-2">
                <div className="w-16 h-3 bg-ct-gray-100 rounded" />
                <div className="w-8 h-2 bg-ct-gray-100 rounded" />
              </div>
              
              {/* 댓글 텍스트 */}
              <div className="flex flex-col gap-1">
                <div className="w-full h-3 bg-ct-gray-100 rounded" />
                <div className="w-[70%] h-3 bg-ct-gray-100 rounded" />
              </div>
              
              {/* 답글 버튼 */}
              <div className="w-8 h-2 bg-ct-gray-100 rounded mt-1" />
            </div>
          </div>
        ))}
    </div>
  );
}

export default CommentSkeleton;