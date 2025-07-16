import ProfileCardItem from "./ProfileCardItem";

function ProfileCardContainer() {
  const items = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div
      className={`${
        items.length === 0
          ? "ct-center h-[calc(100vh-450px)]"
          : "grid grid-cols-2 gap-3"
      }`}
    >
      {items.length === 0 ? (
        <p className="text-body1 text-ct-gray-200 text-center">
          카드를 추가하여
          <br />
          나를 나타내보세요!
        </p>
      ) : (
        items.map((item) => <ProfileCardItem key={item} />)
      )}
    </div>
  );
}

export default ProfileCardContainer;
