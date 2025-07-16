function NetworkingBarSkeleton() {
  return (
    <div className="w-[335px] animate-pulse flex items-center justify-between mt-[20px] gap-2">
      <div className="w-[110px] h-[29px]">
        <div className="w-full h-full flex items-center gap-1 bg-ct-gray-100 rounded-[3px]">
          <div className="w-[20px] h-[20px] bg-ct-gray-100 rounded"></div>
          <div className="w-[60px] h-[20px] bg-ct-gray-100 rounded"></div>
        </div>
      </div>
      <div className="w-[110px] h-[29px]">
        <div className="w-full h-full flex items-center gap-1 bg-ct-gray-100 rounded-[3px]">
          <div className="w-[11px] h-[11px] bg-ct-gray-100 rounded"></div>
          <div className="w-[40px] h-[20px] bg-ct-gray-100 rounded"></div>
        </div>
      </div>
      <div className="w-[110px] h-[29px]">
        <div className="w-full h-full flex items-center gap-1 bg-ct-gray-100 rounded-[3px]">
          <div className="w-[12px] h-[12px] bg-ct-gray-100 rounded"></div>
          <div className="w-[60px] h-[20px] bg-ct-gray-100 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default NetworkingBarSkeleton;
