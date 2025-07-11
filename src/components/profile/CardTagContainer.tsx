import CardTagItem from "./CardTagItem";

const tagList = ["태그1", "서비스기획", "태그3"];

function CardTagContainer() {
  return (
    <div className="gap-[5px] flex flex-wrap w-full justify-start">
      {tagList.map((tag, index) => (
        <CardTagItem key={index} tag={tag} />
      ))}
    </div>
  );
}

export default CardTagContainer;
