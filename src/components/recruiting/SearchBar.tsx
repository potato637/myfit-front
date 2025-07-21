interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
}
function SearchBar({ query, setQuery }: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        className=" w-[337px] h-[30px] pl-[8px] border-b border-ct-gray-200 focus:outline-none text-sub1 text-ct-black-300"
        onChange={(e) => setQuery(e.target.value)}
      />
      <img
        src="/assets/recruit/searchicon.svg"
        alt="돋보기아이콘"
        className="absolute top-1/2 -translate-y-1/2 right-0"
      />
    </div>
  );
}
export default SearchBar;
