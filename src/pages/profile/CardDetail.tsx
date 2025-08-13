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
import { useEffect, useRef } from "react";

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
  const {
    data: card,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCards({
    service_id: service_id || "",
  });

  const cardsData = card?.pages.flatMap((page) => page.result.cards);
  const cardsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Scroll to the card with the ID from the URL hash
  useEffect(() => {
    if (!cardsData || cardsData.length === 0) return;

    // Get the ID from the URL hash (removing the # if present)
    const cardId = window.location.hash.replace("#", "");
    if (!cardId) return;

    // Find the card with the matching ID in the current data
    const targetCard = cardsData.find((card) => card.id === cardId);
    
    // If we have the target card, scroll to it
    if (targetCard) {
      // Use a small timeout to ensure the DOM is updated
      const timer = setTimeout(() => {
        const cardElement = cardsRef.current[cardId];
        if (cardElement) {
          // Calculate the height of the fixed elements (header + introduction)
          const headerHeight = 60; // Adjust this value based on your header height
          const introductionHeight = 80; // Adjust this value based on your introduction height
          const offset = headerHeight + introductionHeight;
          
          // Calculate the scroll position
          const elementPosition = cardElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = Math.max(0, elementPosition - offset);
          
          // Smooth scroll to the calculated position
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Update the URL to remove the hash after scrolling
          const newUrl = window.location.pathname + window.location.search;
          window.history.replaceState({}, "", newUrl);
        }
      }, 100);
      return () => clearTimeout(timer);
    } 
    // If we don't have the target card but there are more pages to load, fetch the next page
    else if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [cardsData]);

  // Function to set the ref for each card
  const setCardRef = (element: HTMLDivElement | null, id: string) => {
    if (element) {
      cardsRef.current[id] = element;
    } else {
      delete cardsRef.current[id];
    }
  };

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
              <div
                key={card.id}
                ref={(el) => setCardRef(el, card.id)}
                id={`card-${card.id}`}
              >
                <DetailCardItem item={card} />
              </div>
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
