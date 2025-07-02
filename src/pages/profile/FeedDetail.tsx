import TopBar from "../../components/common/TopBar";
import DetailIntroduction from "../../components/profile/DetailIntroduction";
import DetailFeedItem from "../../components/profile/DetailFeedItem";

function FeedDetail() {
  const createList = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="w-full h-full bg-ct-gray-100 flex flex-col gap-[7px]">
      <TopBar>
        <img
          src="/assets/common/headerLogo.svg"
          alt="로고"
          className="w-[68px] h-[30px]"
        />
      </TopBar>
      <DetailIntroduction />
      {createList.map((_, index) => (
        <DetailFeedItem key={index} />
      ))}
    </div>
  );
}

export default FeedDetail;
