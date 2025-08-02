import CardTagItem from "./CardTagItem";

function CardTagContainer({ keywords }: { keywords: string[] }) {
  return (
    <div className="gap-[5px] flex flex-wrap w-full justify-start">
      {keywords.map((tag, index) => (
        <CardTagItem key={index} tag={tag} />
      ))}
    </div>
  );
}

export default CardTagContainer;
