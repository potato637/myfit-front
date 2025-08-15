import CompanyLink from "./CompanyLink";
import CardTagContainer from "./CardTagContainer";
import { useBottomSheet } from "../../contexts/ui/bottomSheetContext";
import { CardItem } from "../../apis/mypageAPI";
import { useItemContext } from "../../contexts/ItemContext";
import { useLocation } from "react-router-dom";
import BottomSheetContent from "./BottomSheetContent";

function DetailCardItem({ item }: { item: CardItem }) {
  const { openBottomSheet } = useBottomSheet();
  const { setItemId } = useItemContext();
  const location = useLocation();
  const isMine = location.pathname.startsWith("/mypage");

  const handleClick = () => {
    openBottomSheet(<BottomSheetContent type="card" itemId={item.id} />);
    setItemId(item.id);
  };

  return (
    <div className="w-full h-auto bg-ct-white rounded-[10px] p-[16px] flex flex-col gap-[10px] items-center">
      <div className="w-full h-[30px] px-[5px] py-[14px] flex items-center justify-between">
        <span className="text-ct-main-blue-100 text-body1">활동 카드</span>
        {isMine && (
          <img
            src="/assets/profile/settingIcon.svg"
            alt="설정"
            onClick={handleClick}
          />
        )}
      </div>
      <img
        className="w-[353px] h-[442px] rounded-[5px] object-cover"
        src={item.card_img}
        alt="활동 카드 이미지"
      />
      <div className="w-full p-[12px] bg-ct-gray-100 flex flex-col rounded-[5px] gap-2">
        <span className="text-sub1 text-ct-black-100">한줄 소개</span>
        <span className="text-body3 text-ct-black-200">
          {item.one_line_profile}
        </span>
      </div>
      <div className="w-full p-[12px] bg-ct-gray-100 flex flex-col rounded-[5px] gap-2">
        <span className="text-sub1 text-ct-black-100">상세 설명</span>
        <span className="text-body3 text-ct-black-200">
          {item.detailed_profile}
        </span>
      </div>
      {item.link && <CompanyLink link={item.link} />}
      <CardTagContainer keywords={item.keywords} />
    </div>
  );
}

export default DetailCardItem;
