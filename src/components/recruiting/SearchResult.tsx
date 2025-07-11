function SearchResult() {
  const dummydata = [
    "데이터 분석가",
    "데이터 엔지니어",
    "데이터베이스 관리자(DBA)",
    "데이터베이스 개발자",
    "데이터베이스 보안 전문가",
  ];
  return (
    <ul className="flex flex-col gap-[17px]">
      {dummydata.map((job, idx) => (
        <li key={idx} className="text-sub2 text-[#898989]">
          {job}
        </li>
      ))}
    </ul>
  );
}
export default SearchResult;
