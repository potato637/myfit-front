function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        className=" w-[337px] h-[30px] pl-[8px] border-b border-ct-gray-200"
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
