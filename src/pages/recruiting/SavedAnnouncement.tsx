import { useEffect, useState } from "react";
import TopBarContainer from "../../components/common/TopBarContainer";
import BottomNav from "../../components/layouts/BottomNav";
import RecruitCard from "../../components/recruiting/RecruitCard";
import {
  getSubscribedRecruitment,
  SubscribedRecruitment,
} from "../../apis/recruiting/recruiting";

function SavedAnnouncement() {
  const [recruitment, SetRecruitment] = useState<SubscribedRecruitment[]>([]);
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { recruitments, next_cursor } = await getSubscribedRecruitment(
          cursor
        );
        SetRecruitment(recruitments);
        setCursor(next_cursor);
      } catch (error) {
        console.log("공고 불러오기 실패", error);
      }
    };
    fetchData();
  }, [cursor]);
  const TopBarContent = () => {
    return (
      <span className="text-h2 font-Pretendard text-ct-black-300">
        저장된 공고
      </span>
    );
  };
  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="flex flex-col gap-[12px] items-center mb-[89px] ">
        {recruitment.map((item) => (
          <RecruitCard key={item.recruitment_id} data={item} />
        ))}
      </div>
      <BottomNav />
    </TopBarContainer>
  );
}
export default SavedAnnouncement;
