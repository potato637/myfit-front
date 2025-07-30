function RecruitAnnouncementSkeleton() {
  return (
    <div className="animate-pulse px-[19px] pb-[100px] mt-[5px]">
      <div className="w-[120px] h-[20px] bg-gray-200 rounded mb-[15px]" />
      <ul className="flex flex-col gap-[20px]">
        {Array.from({ length: 6 }).map((_, idx) => (
          <li key={idx} className="flex gap-[24px]">
            <div className="w-[57px] h-[16px] bg-gray-200 rounded" />
            <div className="flex-1 h-[16px] bg-gray-200 rounded" />
          </li>
        ))}
      </ul>
      <div className="w-full h-[180px] bg-gray-200 rounded mt-[15px]" />
      <div className="mt-[26px] flex justify-between items-center">
        <div className="w-[24px] h-[24px] bg-gray-200 rounded" />
        <div className="w-[132px] h-[34px] bg-gray-200 rounded" />
      </div>
    </div>
  );
}
export default RecruitAnnouncementSkeleton;
