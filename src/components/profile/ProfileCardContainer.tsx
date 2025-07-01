import ProfileCardItem from "./ProfileCardItem";

function ProfileCardContainer() {
  const items = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <ProfileCardItem key={item} />
      ))}
    </div>
  );
}

export default ProfileCardContainer;
