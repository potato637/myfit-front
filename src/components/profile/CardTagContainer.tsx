import CardTagItem from "./CardTagItem";

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

function CardTagContainer() {
  return (
    <div className="gap-[5px] flex flex-wrap">
      {tagList.map((tag, index) => (
        <CardTagItem key={index} tag={tag} />
      ))}
    </div>
  );
}

export default CardTagContainer;
