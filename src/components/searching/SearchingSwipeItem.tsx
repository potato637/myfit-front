import { SectorBaseSearchingItem } from "../../apis/searchingAPI";

function SearchingSwipeItem({ card }: { card: SectorBaseSearchingItem }) {
  return (
    <div className="w-[300px] h-[570px] flex flex-col items-center rounded-[16px] py-[16px] px-[10px] shadow-find-card">
      <div className="w-full flex flex-col gap-[8px]">
        <span className="text-h2 text-ct-black-100">{`${card.author_name} | ${card.recruiting_status}`}</span>
        <div className="w-full flex gap-[4px] justify-start items-center flex-wrap">
          {card.keywords.map((keyword, index) => (
            <div
              key={index}
              className="px-[9px] py-[2px] bg-ct-gray-100 rounded-[5px]"
            >
              <span className="text-body2 text-ct-main-blue-100">
                #{keyword}
              </span>
            </div>
          ))}
        </div>
        <img
          src={card.card_img}
          className="w-full h-[430px] object-cover rounded-[8px]"
          alt="card"
        />
        <div className="w-full p-[12px] bg-ct-gray-100 flex flex-col rounded-[5px] gap-2">
          <span className="text-sub1 text-ct-black-100">한줄 소개</span>
          <span className="text-body3 text-ct-black-200">
            {card.one_line_profile}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SearchingSwipeItem;
