import FeedTagItem from "./FeedTagItem";

function FeedTagContainer({ tags }: { tags: string }) {
  const tagList = tags.split(",");
  return (
    <div className="gap-[5px] flex flex-wrap w-full justify-start">
      {tagList.map((tag, index) => (
        <FeedTagItem key={index} tag={tag} />
      ))}
    </div>
  );
}

export default FeedTagContainer;
