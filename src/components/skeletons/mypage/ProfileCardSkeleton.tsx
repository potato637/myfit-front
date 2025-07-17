function ProfileCardSkeleton() {
  const items = Array.from({ length: 4 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-2 gap-3 animate-pulse">
      {items.map((item) => (
        <div key={item} className="w-[174px] h-[216px] relative">
          <div className="absolute top-0 left-0 w-[20px] h-[20px] bg-ct-gray-100 rounded animate-pulse"></div>
          <div className="w-full h-full bg-ct-gray-100 rounded-[5px] animate-pulse"></div>
        </div>
      ))}
    </div>
  );
}

export default ProfileCardSkeleton;
