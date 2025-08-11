import ProfileCardItem from "./ProfileCardItem";
import { useGetCards } from "../../hooks/mypageQueries";
import { useAuth } from "../../contexts/AuthContext";
import ProfileAddCard from "./ProfileAddCard";

function ProfileCardContainer({ serviceId }: { serviceId?: string }) {
  const { user } = useAuth();

  const { data: cards, isLoading: cardsLoading } = useGetCards({
    service_id: serviceId ? serviceId : user?.id?.toString() || "",
  });

  if (cardsLoading) {
    return null;
  }

  const cardsData = cards?.pages.flatMap((page) => page.result.cards);

  return (
    <div
      className={`${
        cardsData?.length === 0
          ? "ct-center h-[calc(100vh-450px)]"
          : "grid grid-cols-2 gap-3"
      }`}
    >
      <ProfileAddCard />
      {cardsData?.map((card) => (
        <ProfileCardItem key={card.id} card={card} serviceId={serviceId} />
      ))}
    </div>
  );
}

export default ProfileCardContainer;
