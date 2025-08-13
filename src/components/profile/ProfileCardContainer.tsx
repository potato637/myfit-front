import ProfileCardItem from "./ProfileCardItem";
import { useGetCards } from "../../hooks/mypageQueries";
import { useAuth } from "../../contexts/AuthContext";
import ProfileAddCard from "./ProfileAddCard";
import { useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import ProfileCardSkeleton from "../skeletons/mypage/ProfileCardSkeleton";

function ProfileCardContainer({ serviceId }: { serviceId?: string }) {
  const { user } = useAuth();
  const location = useLocation();
  const [ref, inView] = useInView();

  const {
    data: cards,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useGetCards({
    service_id: serviceId ? serviceId : user?.id?.toString() || "",
  });

  // Trigger fetch when the last card comes into view
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const cardsData = cards?.pages.flatMap((page) => page.result.cards);

  return (
    <div className="grid grid-cols-2 gap-3">
      {location.pathname.startsWith("/mypage") && <ProfileAddCard />}
      {cardsData?.map((card, index) => (
        <div key={card.id} ref={index === cardsData.length - 1 ? ref : null}>
          <ProfileCardItem card={card} serviceId={serviceId} />
        </div>
      ))}
      {isFetching && (
        <>
          <ProfileCardSkeleton />
          <ProfileCardSkeleton />
          <ProfileCardSkeleton />
        </>
      )}
    </div>
  );
}

export default ProfileCardContainer;
