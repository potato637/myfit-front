function FeedCardSkeleton() {
  return (
    <div className="w-full bg-white rounded-[10px] p-4 flex flex-col gap-4 animate-pulse">
      {/* 프로필 영역 */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-ct-gray-100 rounded-full" />
        <div className="flex flex-col gap-2">
          <div className="w-24 h-3 bg-ct-gray-100 rounded" />
          <div className="w-16 h-2 bg-ct-gray-100 rounded" />
        </div>
      </div>

      {/* 이미지 영역 */}
      <div className="w-full h-[360px] bg-ct-gray-100 rounded-lg" />

      {/* 본문 */}
      <div className="flex flex-col gap-2">
        <div className="w-[60%] h-3 bg-ct-gray-100 rounded" />
        <div className="w-[80%] h-3 bg-ct-gray-100 rounded" />
      </div>

      {/* 해시태그 */}
      <div className="flex gap-2 mt-2">
        <div className="w-[40px] h-3 bg-ct-gray-100 rounded" />
        <div className="w-[50px] h-3 bg-ct-gray-100 rounded" />
        <div className="w-[30px] h-3 bg-ct-gray-100 rounded" />
      </div>
    </div>
  );
}

export default FeedCardSkeleton;
