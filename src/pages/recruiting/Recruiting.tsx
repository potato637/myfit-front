import BottomNav from "../../components/layouts/BottomNav";
import RecruitCard from "../../components/recruiting/RecruitCard";

function Recruiting() {
  return (
    <div className="flex flex-col px-4 py-2 bg-white">
      <div className="fixed h-[118px] top-0 left-0 right-0 py-[16.5px] z-10 bg-ct-white">
        <div className="flex w-full relative max-w-[401px] h-[36px] px-[15px]">
          <button className="flex-1 flex flex-col h-[32px] ct-center font-Pretendard text-h2 text-ct-black-300 tracking-[-0.408px] border-b-[4px] border-ct-gray-300">
            개발
          </button>
          <button className="flex-1 flex flex-col h-[32px] ct-center font-Pretendard text-h2 text-ct-gray-200 tracking-[-0.408px]">
            기획
          </button>
          <button className="flex-1 flex flex-col h-[32px] ct-center font-Pretendard text-h2 text-ct-gray-200 tracking-[-0.408px]">
            디자인
          </button>
          <button className="flex-1 flex flex-col h-[32px] ct-center font-Pretendard text-h2 text-ct-gray-200 tracking-[-0.408px]">
            마케팅
          </button>
        </div>
        <div className="mt-[11px] flex w-full max-w-[401px] px-[15px]">
          <button className="flex-1 py-2 font-Pretendard text-h2 text-ct-black-300 tracking-[-0.32px]">
            프론트엔드
          </button>
          <button className="flex-1 py-2 font-Pretendard text-h2 text-ct-gray-200 tracking-[-0.32px]">
            백엔드
          </button>
          <button className="flex-1 py-2 font-Pretendard text-h2 text-ct-gray-200 tracking-[-0.32px]">
            풀스택
          </button>
          <button className="flex-1 py-2 font-Pretendard text-h2 text-ct-gray-200 tracking-[-0.32px]">
            QA
          </button>
        </div>
      </div>
      <div className="mt-[118px] mb-[21px] flex justify-between items-center w-full max-w-[401px]">
        <button className="w-[70px] h-[24px] text-body1 font-Pretendard font-[500] text-ct-white bg-ct-main-blue-200 rounded-[5px]">
          공고 등록
        </button>
        <img
          src="assets/recruit/bookmark(on).svg"
          alt="bookmark"
          className="w-[18px] h-[22px]"
        />
      </div>
      <div className="flex flex-col mt-[6px] gap-[11px] items-center mb-[89px]">
        <RecruitCard />
        <RecruitCard />
        <RecruitCard />
        <RecruitCard />
        <RecruitCard />
        <RecruitCard />
      </div>
      <BottomNav />
    </div>
  );
}
export default Recruiting;
