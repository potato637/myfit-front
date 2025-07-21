interface RecruitCardProps {
  data: {
    title: string;
    job: string;
    dead_line: string;
    work_type: string;
    writer: {
      name: string;
      profile_img: string;
    };
  };
}

function RecruitCard({ data }: RecruitCardProps) {
  return (
    <div className="w-[360px] min-h-[123px] rounded-[10px] ct-center border border-ct-white px-2 py-1 shadow-[0px_0px_5px_rgba(0,0,0,0.15)] ">
      <div className="w-[332.64px] my-[15px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[8px]">
            <img
              src={data.writer.profile_img}
              alt="프로필 이미지"
              className="w-[32px] h-[32px] rounded-[10px] object-cover"
            />
            <span className="text-sub1 font-Pretendard text-ct-black-100">
              {data.writer.name}
            </span>
          </div>
          <span className="text-body1 text-ct-main-blue-200">
            마감일자 : {data.dead_line}
          </span>
        </div>

        <div className="mt-[16px] text-body1 font-Pretendard text-ct-black-200">
          {data.title}
        </div>
        <div className="mt-[8px] font-Pretendard text-body1 text-ct-sub-blue-100">
          {data.work_type}
        </div>
      </div>
    </div>
  );
}
export default RecruitCard;
