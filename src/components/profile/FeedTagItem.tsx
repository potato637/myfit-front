function FeedTagItem({ tag }: { tag: string }) {
  return (
    <div className="px-[12px] py-[2px] rounded-[20px] bg-ct-light-blue-100">
      <span className="text-body2 text-ct-main-blue-100"># {tag}</span>
    </div>
  );
}

export default FeedTagItem;
