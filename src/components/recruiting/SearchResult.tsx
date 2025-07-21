import { jobs } from "../../data/jobs";

interface SearchResultProps {
  query: string;
}

function SearchResult({ query }: SearchResultProps) {
  const allskills = jobs.flatMap((job) => job.skills);
  const filtered = query
    ? allskills.filter((skill) =>
        skill.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <ul className="flex flex-col gap-[17px]">
      {filtered.map((job, idx) => (
        <li key={idx} className="text-sub2 text-[#898989]">
          {job}
        </li>
      ))}
    </ul>
  );
}
export default SearchResult;
