import FeedTagItem from "./FeedTagItem";

const tagList = ["광고하는사람들", "Freelancer", "DailyInsight", "AdLife"];

function FeedTagContainer() {
  return (
    <div className="gap-[5px] flex flex-wrap w-full justify-start">
      {tagList.map((tag, index) => (
        <FeedTagItem key={index} tag={tag} />
      ))}
    </div>
  );
}

export default FeedTagContainer;
