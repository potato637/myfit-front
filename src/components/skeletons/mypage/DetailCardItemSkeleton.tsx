function DetailCardItemSkeleton() {
  return (
    <div className="w-full h-auto bg-ct-white rounded-[10px] p-[16px] flex flex-col gap-[10px] items-center">
      <div className="w-full h-[30px] px-[5px] py-[14px] flex items-center justify-between">
        <div className="w-[60px] h-[20px] bg-ct-gray-100 rounded"></div>
        <div className="w-[20px] h-[20px] bg-ct-gray-100 rounded animate-pulse"></div>
      </div>
      <div className="w-[353px] h-[442px] bg-ct-gray-100 rounded-[5px] animate-pulse"></div>
      <div className="w-full p-[12px] bg-ct-gray-100 flex flex-col rounded-[5px] gap-2">
        <div className="w-[60px] h-[20px] bg-ct-gray-100 rounded"></div>
        <div className="w-[300px] h-[20px] bg-ct-gray-100 rounded"></div>
      </div>
      <div className="w-full p-[12px] bg-ct-gray-100 flex flex-col rounded-[5px] gap-2">
        <div className="w-[60px] h-[20px] bg-ct-gray-100 rounded"></div>
        <div className="w-[300px] h-[20px] bg-ct-gray-100 rounded"></div>
        <div className="w-[250px] h-[20px] bg-ct-gray-100 rounded animate-pulse"></div>
        <div className="w-[200px] h-[20px] bg-ct-gray-100 rounded"></div>
      </div>
      <div className="w-full h-[24px] flex justify-start items-center gap-2 px-2 bg-ct-gray-100 rounded-[3px]">
        <div className="w-[24px] h-[24px] bg-ct-gray-100 rounded animate-pulse"></div>
        <div className="w-[200px] h-[20px] bg-ct-gray-100 rounded"></div>
      </div>
    </div>
  );
}

export default DetailCardItemSkeleton;
