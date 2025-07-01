import RecruitCard from "../../components/recruiting/RecruitCard";

function Recruiting() {
  return (
    <div className="mt-[65px] flex flex-col px-4 py-2 ">
      <div className="flex w-full relative max-w-[401px] h-[32px]">
        <button className="flex-1 flex flex-col h-[22px] ct-center">
          <span className="font-Pretendard text-[18px] text-[#000000] font-[600] leading-[22px] tracking-[-0.408px]">
            개발
          </span>
          <div className="flex-1 absolute bottom-0 w-[75px] h-[4px] bg-[#828282]" />
        </button>
        <button className="flex-1 flex flex-col h-[22px] ct-center">
          <span className="font-Pretendard text-[18px] text-ct-gray-200 font-[600] leading-[22px] tracking-[-0.408px]">
            기획
          </span>
        </button>
        <button className="flex-1 flex flex-col h-[22px] ct-center">
          <span className="font-Pretendard text-[18px] text-ct-gray-200 font-[600] leading-[22px] tracking-[-0.408px]">
            디자인
          </span>
        </button>
        <button className="flex-1 flex flex-col h-[22px] ct-center">
          <span className="font-Pretendard text-[18px] text-ct-gray-200 font-[600] leading-[22px] tracking-[-0.408px]">
            마케팅
          </span>
        </button>
      </div>
      <div className="mt-[11px] flex w-full max-w-[401px]">
        <button className="flex-1 py-2 font-Pretendard text-[18px] font-[600] text-[#000000] leading-[20px] tracking-[-0.32px]">
          프론트엔드
        </button>
        <button className="flex-1 py-2 font-Pretendard text-[18px] font-[600] text-ct-gray-200 leading-[20px] tracking-[-0.32px]">
          백엔드
        </button>
        <button className="flex-1 py-2 font-Pretendard text-[18px] font-[600] text-ct-gray-200 leading-[20px] tracking-[-0.32px]">
          풀스택
        </button>
        <button className="flex-1 py-2 font-Pretendard text-[18px] font-[600] text-ct-gray-200 leading-[20px] tracking-[-0.32px]">
          QA
        </button>
      </div>
      <div className="mt-[11px] flex justify-between items-center w-full max-w-[401px]">
        <button className="mr-[14px] w-[70px] h-[33px] pt-[6px] pb-[5px] px-[7px] text-[15px] font-Pretendard font-[500] leading-[22px] text-ct-white bg-ct-main-blue-100 rounded-[5px]">
          공고 등록
        </button>
        <img
          src="assets/recruit/bookmark.svg"
          alt="bookmark"
          className="w-[18px] h-[22px]"
        />
      </div>
      <div className="flex flex-col mt-[6px] gap-[11px] items-center">
        <RecruitCard />
        <RecruitCard />
        <RecruitCard />
        <RecruitCard />
      </div>
    </div>
  );
}
export default Recruiting;
