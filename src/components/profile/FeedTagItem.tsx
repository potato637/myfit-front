function FeedTagItem({ tag }: { tag: string }) {
  return (
    <div>
      <span className="text-body1 text-ct-main-blue-100">#{tag}</span>
    </div>
  );
}

export default FeedTagItem;
