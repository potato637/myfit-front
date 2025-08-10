import { SectorBaseSearchingItem } from "../../apis/searchingAPI";

function SearchingListItem({ card }: { card: SectorBaseSearchingItem }) {
  return (
    <div className="w-[160px] h-[220px] rounded-[5px]">
      <img
        src={card.card_img}
        alt="카드 이미지"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default SearchingListItem;
