interface RecruitCardProps {
  company: string;
  deadline: string;
  title: string;
  tag?: string;
}
function RecruitCard() {
  return (
    <div className="w-[360px] h-[123px] rounded-[10px] border border-ct-gray-200 px-2 py-1 ">
      <div className="w-[344.64px] h-[115.19px]">
        <div className="w-[344.64px] h-[51.73px] flex justify-between items-center border-b-[0.49px] border-gray-300">
          <div className="flex items-center gap-[6px]">
            <div className="w-[19.52px] h-[19.52px] bg-[#d9d9d9] rounded-[10px]" />
            <span className="text-[14px] font-Pretendard font-[500] text-[#333333] leading-[14px] tracking-[-0.31px] ">
              마이루틴
            </span>
          </div>
          <span className="text-[14px] font-Pretendard font-[400] text-[#616164] leading-[14px] tracking-[-0.31px]">
            마감일자 : 2025.01.01
          </span>
        </div>

        <div className="mt-[6px] text-[15px] font-Pretendard font-[400] text-[#333333] leading-[20px] tracking-[-0.24px]">
          [신입/경력] 사용자 경험을 바꾸는 프론트엔드 개발자 모집 - 마이루틴
        </div>
        <div className="flex justify-end -mt-[8px]">
          <span className="font-Pretendard font-[400] text-[15px] text-[#757070] leading-[20px] tracking-[-0.24px]">
            구인 직무
          </span>
        </div>
      </div>
    </div>
  );
}
export default RecruitCard;
