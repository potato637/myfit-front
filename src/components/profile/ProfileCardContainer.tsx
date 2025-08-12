import ProfileCardItem from "./ProfileCardItem";
import { useGetCards } from "../../hooks/mypageQueries";
import { useAuth } from "../../contexts/AuthContext";
import ProfileAddCard from "./ProfileAddCard";
import { useLocation } from "react-router-dom";

function ProfileCardContainer({ serviceId }: { serviceId?: string }) {
  const { user } = useAuth();
  const location = useLocation();

  const { data: cards, isLoading: cardsLoading } = useGetCards({
    service_id: serviceId ? serviceId : user?.id?.toString() || "",
  });

  if (cardsLoading) {
    return null;
  }

  const cardsData = cards?.pages.flatMap((page) => page.result.cards);

  return (
    <div className="grid grid-cols-2 gap-3">
      {location.pathname.startsWith("/mypage") && <ProfileAddCard />}
      {cardsData?.map((card) => (
        <ProfileCardItem key={card.id} card={card} serviceId={serviceId} />
      ))}
    </div>
  );
}

export default ProfileCardContainer;
