function DetailFeedItemSkeleton() {
  return (
    <div className="w-full h-auto bg-ct-white rounded-[10px] p-[16px] flex flex-col gap-[10px] items-center">
      <div className="w-full h-[30px] px-[5px] py-[14px] flex items-center justify-between">
        <div className="w-[80px] h-[20px] bg-ct-gray-100 rounded animate-pulse"></div>
        <div className="w-[20px] h-[20px] bg-ct-gray-100 rounded animate-pulse"></div>
      </div>
      <div className="w-[343px] h-[359px] bg-ct-gray-100 rounded-[5px] animate-pulse"></div>
      <div className="w-full flex justify-between items-center">
        <div>
          <div className="w-[60px] h-[20px] bg-ct-gray-100 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="w-full p-[12px] bg-ct-gray-100 rounded-[5px]">
        <div className="w-[200px] h-[20px] bg-ct-gray-100 rounded animate-pulse"></div>
      </div>
      <div className="w-full">
        <div className="w-[300px] h-[20px] bg-ct-gray-100 rounded animate-pulse mb-2"></div>
        <div className="w-[250px] h-[20px] bg-ct-gray-100 rounded animate-pulse mb-2"></div>
      </div>
    </div>
  );
}

export default DetailFeedItemSkeleton;
