import ProfileFeedItem from "./ProfileFeedItem";

function ProfileFeedContainer() {
  const items = Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <div
      className={`${
        items.length === 0
          ? "ct-center h-[calc(100vh-450px)]"
          : "grid grid-cols-3 gap-1"
      }`}
    >
      {items.length === 0 ? (
        <p className="text-body1 text-ct-gray-200 text-center">
          피드를 추가하여
          <br />
          프로필을 꾸며보세요!
        </p>
      ) : (
        items.map((item) => <ProfileFeedItem key={item} />)
      )}
    </div>
  );
}

export default ProfileFeedContainer;
