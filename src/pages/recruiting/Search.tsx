import TopBarContainer from "../../components/common/TopBarContainer";
import SearchBar from "../../components/recruiting/SearchBar";
import SearchResult from "../../components/recruiting/SearchResult";

function Search() {
  const TopBarContent = () => {
    return (
      <div className="flex items-center">
        <span className="text-h2 font-Pretendard text-ct-black-300">
          구인 직무
        </span>
        <span className="text-sub2 text-ct-gray-300 absolute right-[23px] ">
          완료
        </span>
      </div>
    );
  };
  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="flex justify-center">
        <SearchBar />
      </div>
      <div className="px-[25px] mt-[34px]">
        <SearchResult />
      </div>
    </TopBarContainer>
  );
}
export default Search;
