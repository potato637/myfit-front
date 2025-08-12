import { useEffect, useState } from "react";
import BottomNav from "../../components/layouts/BottomNav";
import RecruitCard from "../../components/recruiting/RecruitCard";
import { jobs } from "../../data/jobs";
import { useNavigate } from "react-router-dom";
import { RecruitmentItem } from "../../apis/recruiting/recruiting";
import RecruitCardSkeleton from "../../components/skeletons/recruiting/RecruitCardSkeleton";
import { useGetRecruitmentsQuery } from "../../hooks/recruiting/recruiting";

function Recruiting() {
  const [selectedCategory, setSelectedCategory] = useState("기획/PM");

  const [selectedSkill, setSelectedSkill] = useState<string>("서비스 기획자");
  const [recruitList, setRecruitList] = useState<RecruitmentItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [delayedLoading, setDelayedLoading] = useState(true);
  const nav = useNavigate();

  const { data, isLoading, isError } = useGetRecruitmentsQuery(
    selectedCategory,
    selectedSkill,
    page
  );

  useEffect(() => {
    if (data) {
      setRecruitList(data.result.recruitments);
      setTotalPages(Math.ceil(data.result.pagination.total_page));
    }
  }, [data]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isLoading) {
      setDelayedLoading(true);
    } else {
      timeout = setTimeout(() => {
        setDelayedLoading(false);
      }, 300);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  if (isError) return <div>공고 데이터를 불러오는 중 오류가 발생했습니다.</div>;

  const currentCategory = jobs.find((j) => j.category === selectedCategory);
  const handleCardClick = (id: number) => {
    nav(`/recruiting/${id}`);
  };

  return (
    <div className="flex flex-col px-4 py-2 bg-white">
      <div className="fixed h-[118px] top-0 left-0 right-0 py-[16.5px] z-10 bg-ct-white">
        <div className="flex h-[36px] px-[15px] overflow-x-scroll whitespace-nowrap scrollbar-hide">
          {jobs.map((item) => (
            <button
              key={item.category}
              className={`h-[32px] text-h2 tracking-[-0.408px] px-[21px] pb-[10px] ${
                selectedCategory === item.category
                  ? "border-b-[4px] border-ct-gray-300 text-ct-black-300"
                  : "text-ct-gray-200"
              }`}
              onClick={() => {
                setSelectedCategory(item.category);
                const firstSkill = jobs.find(
                  (j) => j.category === item.category
                )?.skills[0];
                if (firstSkill) {
                  setSelectedSkill(firstSkill);
                }
              }}
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

      <div className="mt-[90px] mb-[21px] flex justify-between items-center w-full max-w-[401px]">
        <button
          className="w-[70px] h-[24px] text-body1 font-Pretendard font-[500] text-ct-white bg-ct-main-blue-200 rounded-[5px]"
          onClick={() => nav("/recruiting/register")}
        >
          공고 등록!!
        </button>
        <div
          className="flex gap-[4px] w-[105px] h-[24px] bg-ct-gray-100 rounded-[5px] ct-center"
          onClick={() => nav("/recruiting/saved")}
        >
          <span className="text-body1 text-ct-black-100">저장된 공고</span>
          <img
            src="assets/recruit/bookmark(on).svg"
            alt="bookmark"
            className="w-[10px] h-[12px]"
          />
        </div>
      </div>

      <div className="flex flex-col mt-[6px] gap-[11px] items-center mb-[89px]">
        {delayedLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <RecruitCardSkeleton key={idx} />
          ))
        ) : recruitList.length === 0 ? (
          <div className="absolute top-[50%] text-sub2 text-ct-gray-200">
            현재 업로드된 공고가 없습니다.
          </div>
        ) : (
          <>
            {recruitList.map((item) => (
              <RecruitCard
                key={item.recruitment_id}
                data={item}
                onClick={() => handleCardClick(item.recruitment_id)}
              />
            ))}
            {totalPages >= 1 && (
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
