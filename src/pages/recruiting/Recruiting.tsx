import { useState } from "react";
import BottomNav from "../../components/layouts/BottomNav";
import RecruitCard from "../../components/recruiting/RecruitCard";
import { jobs } from "../../data/jobs";
import { dummyRecruitList } from "../../data/dummyRecruitList";
import { useNavigate } from "react-router-dom";

function Recruiting() {
  const [selectedCategory, setSelectedCategory] = useState("기획/PM");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const currentCategory = jobs.find((j) => j.category === selectedCategory);
  const filterList = dummyRecruitList.filter(
    (item) => item.job === selectedSkill
  );
  const totalPages = Math.ceil(filterList.length / pageSize);
  const paginatedList = filterList.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  const nav = useNavigate();

  return (
    <div className="flex flex-col px-4 py-2 bg-white">
      <div className="fixed h-[118px] top-0 left-0 right-0 py-[16.5px] z-10 bg-ct-white">
        <div className="flex h-[36px] px-[15px] overflow-x-scroll whitespace-nowrap scrollbar-hide">
          {jobs.map((item) => (
            <button
              key={item.category}
              className={`h-[32px] text-h2  tracking-[-0.408px] px-[21px] pb-[10px] ${
                selectedCategory === item.category
                  ? "border-b-[4px] border-ct-gray-300 text-ct-black-300"
                  : "text-ct-gray-200"
              }`}
              onClick={() => setSelectedCategory(item.category)}
            >
              {item.category}
            </button>
          ))}
        </div>
        <div className="mt-[11px] flex w-full max-w-[401px] px-[15px] overflow-x-scroll whitespace-nowrap scrollbar-hide">
          {currentCategory?.skills.map((skill) => (
            <button
              key={skill}
              className={`flex-1 text-h2 px-[13px] tracking-[-0.32px] ${
                selectedSkill === skill
                  ? "text-ct-black-300"
                  : "text-ct-gray-200"
              }`}
              onClick={() => setSelectedSkill(skill)}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-[118px] mb-[21px] flex justify-between items-center w-full max-w-[401px]">
        <button
          className="w-[70px] h-[24px] text-body1 font-Pretendard font-[500] text-ct-white bg-ct-main-blue-200 rounded-[5px]"
          onClick={() => nav("/recruit/registerannouncement")}
        >
          공고 등록
        </button>
        <img
          src="assets/recruit/bookmark(on).svg"
          alt="bookmark"
          className="w-[18px] h-[22px]"
          onClick={() => nav("/recruit/savedannouncement")}
        />
      </div>
      <div className="flex flex-col mt-[6px] gap-[11px] items-center mb-[89px]">
        {filterList.length === 0 ? (
          <div className="absolute top-[50%] text-sub2 text-ct-gray-200">
            현재 업로드된 공고가 없습니다.
          </div>
        ) : (
          <>
            {" "}
            {paginatedList.map((item) => (
              <RecruitCard key={item.id} data={item} />
            ))}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  className="px-3 py-1 text-sm rounded border disabled:text-ct-gray-200"
                >
                  {"<"}
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-1 text-sm rounded border ${
                      page === i + 1
                        ? "bg-ct-main-blue-200 text-white"
                        : "text-ct-black-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-3 py-1 text-sm rounded border disabled:text-ct-gray-200"
                >
                  {">"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
export default Recruiting;
