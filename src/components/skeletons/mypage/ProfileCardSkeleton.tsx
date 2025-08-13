function ProfileCardSkeleton() {
  return (
    <div className="w-[174px] h-[216px] relative">
      <div className="absolute top-0 left-0 w-[20px] h-[20px] bg-ct-gray-100 rounded animate-pulse"></div>
      <div className="w-full h-full bg-ct-gray-100 rounded-[5px] animate-pulse"></div>
    </div>
  );
}

export default ProfileCardSkeleton;
