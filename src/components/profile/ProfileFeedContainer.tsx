import ProfileFeedItem from "./ProfileFeedItem";

function ProfileFeedContainer() {
  const items = Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-3 gap-1">
      {items.map((item) => (
        <ProfileFeedItem key={item} />
      ))}
    </div>
  );
}

export default ProfileFeedContainer;
