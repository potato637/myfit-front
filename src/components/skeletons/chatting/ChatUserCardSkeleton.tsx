function ChatUserCardSkeleton() {
  return (
    <div className="h-[54px] flex gap-[10px] mb-[24px] animate-pulse">
      <div className="w-[49px] h-[49px] rounded-full bg-gray-200" />
      <div className="flex flex-col gap-[4px] justify-center">
        <div className="w-[100px] h-[13px] bg-gray-200 rounded" />
        <div className="w-[80px] h-[13px] bg-gray-200 rounded" />
        <div className="w-[120px] h-[13px] bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export default ChatUserCardSkeleton;
