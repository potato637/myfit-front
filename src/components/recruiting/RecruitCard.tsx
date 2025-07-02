function RecruitCard() {
  return (
    <div className="w-[360px] min-h-[123px] rounded-[10px] ct-center border border-ct-gray-200 px-2 py-1 ">
      <div className="w-[332.64px] my-[18.5px] my-[15px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[8px]">
            <div className="w-[32px] h-[32px] bg-ct-gray-100 rounded-[10px]" />
            <span className="text-sub1 font-Pretendard text-ct-black-100">
              마이루틴
            </span>
          </div>
          <span className="text-body1 font-Pretendard text-ct-main-blue-200">
            마감일자 : 2025.01.01
          </span>
        </div>

        <div className="mt-[16px] text-body1 font-Pretendard text-ct-black-200">
          [신입/경력] 사용자 경험을 바꾸는 프론트엔드 개발자 모집
        </div>
        <div className="mt-[8px] font-Pretendard text-body1 text-ct-sub-blue-100">
          구인 직무
        </div>
      </div>
    </div>
  );
}
export default RecruitCard;
