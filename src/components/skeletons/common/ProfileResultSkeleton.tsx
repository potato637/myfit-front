function ProfileResultSkeleton() {
  return (
    <li className="ml-2 flex items-center gap-4 animate-pulse">
      <div className="w-12 h-12 bg-ct-gray-100 rounded-full"></div>
      <div className="flex flex-col">
        <div className="w-[150px] h-[20px] bg-ct-gray-100 rounded mb-1"></div>
        <div className="w-[100px] h-[16px] bg-ct-gray-100 rounded"></div>
      </div>
    </li>
  );
}

export default ProfileResultSkeleton;
