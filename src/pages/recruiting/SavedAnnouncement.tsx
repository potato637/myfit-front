import TopBar from "../../components/common/TopBar";
import BottomNav from "../../components/layouts/BottomNav";
import RecruitCard from "../../components/recruiting/RecruitCard";

function SavedAnnouncement() {
  return (
    <>
      <TopBar>
        <span className="text-h2 font-Pretendard text-ct-black-300">
          저장된 공고
        </span>
      </TopBar>
      <div className="flex flex-col pt-[66px] gap-[12px] items-center mb-[89px] ">
        <RecruitCard />
        <RecruitCard />
      </div>
      <BottomNav />
    </>
  );
}
export default SavedAnnouncement;
