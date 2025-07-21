function HashtagResultSkeleton() {
  return (
    <ul className="space-y-3 animate-pulse">
      {Array.from({ length: 6 }).map((_, idx) => (
        <li key={idx} className="h-[20px] w-[180px] bg-ct-gray-100 rounded" />
      ))}
    </ul>
  );
}

export default HashtagResultSkeleton;
