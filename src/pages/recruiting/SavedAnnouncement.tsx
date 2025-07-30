import { useEffect, useState } from "react";
import TopBarContainer from "../../components/common/TopBarContainer";
import BottomNav from "../../components/layouts/BottomNav";
import RecruitCard from "../../components/recruiting/RecruitCard";
import RecruitCardSkeleton from "../../components/skeletons/recruiting/RecruitCardSkeleton";
import {
  SubscribedRecruitment,
  useGetSubscribedRecruitment,
} from "../../apis/recruiting/recruiting";
import { useNavigate } from "react-router-dom";

function SavedAnnouncement() {
  const [recruitment, setRecruitment] = useState<SubscribedRecruitment[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [delayedLoading, setDelayedLoading] = useState(true);
  const { data, isLoading, isError } = useGetSubscribedRecruitment(page);
  const nav = useNavigate();

  const handleCardClick = (id: number) => {
    nav(`/recruit/announcement/${id}`);
  };

  useEffect(() => {
    if (data) {
      setRecruitment(data.result.subscribedRecruitments);
      setTotalPage(data.result.pagination.total_page);
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

  if (isError) return <div>저장된 공고를 불러오는 중 오류가 발생했습니다.</div>;

  const TopBarContent = () => {
    return (
      <span className="text-h2 font-Pretendard text-ct-black-300">
        저장된 공고
      </span>
    );
  };

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="flex flex-col gap-[12px] items-center mb-[89px]">
        {delayedLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <RecruitCardSkeleton key={idx} />
          ))
        ) : recruitment.length === 0 ? (
          <div className="text-sub2 text-ct-gray-200 mt-[48px]">
            저장된 공고가 없습니다.
          </div>
        ) : (
          recruitment.map((item) => (
            <RecruitCard
              key={item.recruitment_id}
              data={item}
              onClick={() => handleCardClick(item.recruitment_id)}
            />
          ))
        )}
      </div>

      {!delayedLoading && totalPage >= 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-3 py-1 text-sm rounded border disabled:text-ct-gray-200"
          >
            {"<"}
          </button>
          {Array.from({ length: totalPage }, (_, i) => (
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
            disabled={page === totalPage}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-3 py-1 text-sm rounded border disabled:text-ct-gray-200"
          >
            {">"}
          </button>
        </div>
      )}

      <BottomNav />
    </TopBarContainer>
  );
}

export default SavedAnnouncement;
