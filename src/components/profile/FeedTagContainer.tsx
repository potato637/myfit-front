import FeedTagItem from "./FeedTagItem";

const tagList = [
  "태그1",
  "서비스기획",
  "태그3",
  "페르소나설정",
  "태그5",
  "태그6",
  "태그7",
  "태그8",
  "태그9",
  "태그10",
];

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
