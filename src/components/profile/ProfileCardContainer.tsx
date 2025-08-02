import ProfileCardItem from "./ProfileCardItem";
import { useGetCards } from "../../hooks/mypageQueries";
import { useAuth } from "../../contexts/AuthContext";

function ProfileCardContainer() {
  const { user } = useAuth();

  const { data: cards, isLoading: cardsLoading } = useGetCards({
    service_id: user?.id?.toString() || "",
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
      {cardsData?.length === 0 ? (
        <p className="text-body1 text-ct-gray-200 text-center">
          카드를 추가하여
          <br />
          나를 나타내보세요!
        </p>
      ) : (
        cardsData?.map((card) => <ProfileCardItem key={card.id} card={card} />)
      )}
    </div>
  );
}

export default ProfileCardContainer;
