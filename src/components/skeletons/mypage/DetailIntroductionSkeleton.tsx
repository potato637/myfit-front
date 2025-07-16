function DetailIntroductionSkeleton() {
  return (
    <>
      <div className="w-full h-[61px] flex items-center px-[17px] gap-[7px] bg-ct-white fixed z-10 left-0 top-[calc(pb-safe+61px)]">
        <div className="w-[45px] h-[45px] bg-ct-gray-100 rounded-full animate-pulse"></div>
        <div className="w-[60px] h-[20px] bg-ct-gray-100 rounded animate-pulse"></div>
        <div className="w-[80px] h-[20px] bg-ct-gray-100 rounded animate-pulse"></div>
      </div>
      <div className="w-full h-[61px]" />
    </>
  );
}

export default DetailIntroductionSkeleton;
