function PostResultSkeleton() {
  return (
    <div className="-mx-[22px] grid grid-cols-3 gap-2">
      {Array.from({ length: 12 }).map((_, idx) => (
        <div
          key={idx}
          className="w-full aspect-square bg-ct-gray-100 animate-pulse rounded-sm"
        />
      ))}
    </div>
  );
}

export default PostResultSkeleton;
