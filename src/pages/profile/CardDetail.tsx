import DetailIntroduction from "../../components/profile/DetailIntroduction";
import DetailCardItem from "../../components/profile/DetailCardItem";
import DetailIntroductionSkeleton from "../../components/skeletons/mypage/DetailIntroductionSkeleton";
import DetailCardItemSkeleton from "../../components/skeletons/mypage/DetailCardItemSkeleton";
import TopBarContainer from "../../components/common/TopBarContainer";
import Modal from "../../components/ui/Modal";
import BottomSheet from "../../components/ui/BottomSheet";
import BottomSheetContent from "../../components/profile/BottomSheetContent";
import ModalContent from "../../components/profile/ModalContent";
import { useAuth } from "../../contexts/AuthContext";
import { useGetCards } from "../../hooks/mypageQueries";
import { useLocation } from "react-router-dom";

const TopBarContent = () => {
  return (
    <img
      src="/assets/common/headerLogo.svg"
      alt="로고"
      className="w-[68px] h-[30px]"
    />
  );
};

function CardDetail() {
  const location = useLocation();
  const isMine = location.pathname.startsWith("/mypage");
  const { user } = useAuth();
  const service_id = isMine
    ? user?.id?.toString()
    : location.pathname.split("/")[3];
  const { data: card, isFetching } = useGetCards({
    service_id: service_id || "",
  });

  const cardsData = card?.pages.flatMap((page) => page.result.cards);

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="w-full h-full bg-ct-gray-100 flex flex-col gap-[7px]">
        {isFetching ? (
          <>
            <DetailIntroductionSkeleton />
            <DetailCardItemSkeleton />
          </>
        ) : (
          <>
            <DetailIntroduction />
            {cardsData?.map((card) => (
              <DetailCardItem key={card.id} item={card} />
            ))}
          </>
        )}
      </div>
      <BottomSheet>
        <BottomSheetContent type="card" />
      </BottomSheet>
      <Modal>
        <ModalContent type="card" />
      </Modal>
    </TopBarContainer>
  );
}

export default CardDetail;
