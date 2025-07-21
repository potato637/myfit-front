function RecruitCardSkeleton() {
  return (
    <div className="w-[360px] min-h-[123px] rounded-[10px] ct-center border border-ct-gray-100 px-2 py-1 shadow-[0px_0px_5px_rgba(0,0,0,0.15)] animate-pulse">
      <div className="w-[332.64px] my-[15px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[8px]">
            <div className="w-[32px] h-[32px] rounded bg-ct-gray-100" />
            <div className="w-[69px] h-[16px] bg-ct-gray-100 rounded" />
          </div>
          <div className="w-[130px] h-[16px] bg-ct-gray-100 rounded" />
        </div>

        <div className="mt-[16px] w-[332px] h-[20px] bg-ct-gray-100 rounded" />
        <div className="mt-[8px] w-[53px] h-[14px] bg-ct-gray-100 rounded" />
      </div>
    </div>
  );
}
export default RecruitCardSkeleton;
