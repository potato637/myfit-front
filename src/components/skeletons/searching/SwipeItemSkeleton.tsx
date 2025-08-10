function SwipeItemSkeleton() {
  return (
    <div className="w-[300px] h-[400px] rounded-[16px] bg-ct-gray-100 animate-pulse p-4">
      <div className="w-full h-[350px] bg-ct-gray-200 rounded-[5px] mb-4"></div>
      <div className="flex flex-wrap gap-2 mb-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-6 bg-ct-gray-200 rounded-[5px] w-16"></div>
        ))}
      </div>
      <div className="w-full p-3 bg-ct-gray-100 rounded-[5px]">
        <div className="h-4 bg-ct-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-3 bg-ct-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
}

export default SwipeItemSkeleton;