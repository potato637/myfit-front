function IntroductionSkeleton() {
  return (
    <div className="w-[335px] animate-pulse">
      <div className="w-[20px] h-[20px] bg-ct-gray-100 rounded-full"></div>
      <div className="w-full flex justify-between items-center mt-4 h-[80px]">
        <div className="w-[70px] h-[70px] bg-ct-gray-100 rounded-full"></div>
        <div className="w-[160px] h-full flex flex-col justify-between">
          <div className="h-[20px] flex items-center gap-1">
            <div className="w-[100px] h-[20px] bg-ct-gray-100 rounded"></div>
          </div>
          <div className="flex flex-col h-[50px]">
            <div className="w-[60px] h-[20px] bg-ct-gray-100 rounded"></div>
            <div className="w-[80px] h-[20px] bg-ct-gray-100 rounded mt-2"></div>
            <div className="w-[150px] h-[20px] bg-ct-gray-100 rounded mt-2"></div>
          </div>
        </div>
        <div className="w-[80px] h-full flex flex-col justify-between">
          <div className="w-full h-[29px] bg-ct-gray-100 rounded-[3px]"></div>
          <div className="w-full h-[40px] flex flex-col justify-between">
            <div className="flex justify-end items-center gap-2 h-[20px]">
              <div className="w-[20px] h-[20px] bg-ct-gray-100 rounded"></div>
              <div className="w-[20px] h-[20px] bg-ct-gray-100 rounded"></div>
            </div>
            <div className="flex items-center gap-2 justify-end h-[16px]">
              <div className="w-[11px] h-[11px] bg-ct-gray-100 rounded"></div>
              <div className="w-[20px] h-[16px] bg-ct-gray-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroductionSkeleton;
