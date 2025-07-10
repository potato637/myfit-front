import TopBarContainer from "../../components/common/TopBarContainer";
import FeedSearchUI from "../../components/feed/FeedSearchUI";
import BottomNav from "../../components/layouts/BottomNav";

function FeedSearch() {
  const TopBarContent = () => {
    return <span className="text-h2 text-ct-black-300">검색</span>;
  };

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <FeedSearchUI />
      <BottomNav />
    </TopBarContainer>
  );
}
export default FeedSearch;
