import { useEffect, useState } from "react";
import ImageDisplay from "../../components/common/ImageDisplay";
import TopBarContainer from "../../components/common/TopBarContainer";
import BottomNav from "../../components/layouts/BottomNav";
import {
  subscribeRecruitment,
  unsubscribeRecruitment,
  usegetRecruitmentDetailQuery,
  useSubscribeRecruitmentMutation,
  useUnSubscribeRecruitmentMutation,
} from "../../apis/recruiting/recruiting";
import { useParams } from "react-router-dom";

function RecruitAnnouncement() {
  const { recruitmentId } = useParams();
  const recruitment_id = String(recruitmentId);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { data, isLoading, isError } =
    usegetRecruitmentDetailQuery(recruitment_id);
  const { mutate: subscribe, isPending } =
    useSubscribeRecruitmentMutation(recruitment_id);
  const { mutate: unsubscribe } =
    useUnSubscribeRecruitmentMutation(recruitment_id);
  const handleSubscribe = () => {
    subscribe();
  };
  const handleUnSubscribe = () => {
    unsubscribe();
  };
  const TopBarContent = () => {
    return (
      <div className="flex items-center gap-[6px]">
        <div className="w-[24px] h-[24px] bg-[#d9d9d9] rounded-[10px]" />
        <span className="text-h1 font-Pretendard text-ct-black-100 tracking-[-0.31px]">
          {data?.writer.name}
        </span>
      </div>
    );
  };
  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="flex flex-col px-[19px]">
        <div className="text-sub2 px-[5px] text-ct-main-blue-100">
          {data?.dead_line}
        </div>
        <ul className="flex flex-col mt-[12.5px]">
          <li className="flex gap-[24px] px-[5px] py-[13px] border-y border-ct-gray-200">
            <p className="w-[57px] h-[16px] text-body1 text-ct-gray-300 shrink-0">
              공고 제목
            </p>
            <p className="text-body1 text-ct-black-200 whitespace-pre-line">
              {data?.title}
            </p>
          </li>
          <li className="flex gap-[24px] px-[5px] py-[13px] border-b border-ct-gray-200">
            <p className="w-[57px] h-[16px] text-body1 text-ct-gray-300 shrink-0">
              구인 직무
            </p>
            <p className="text-body1 text-ct-black-200 whitespace-pre-line">
              {data?.low_sector}
            </p>
          </li>
          <li className="flex gap-[24px] px-[5px] py-[13px] border-b border-ct-gray-200">
            <p className="w-[57px] h-[16px] text-body1 text-ct-gray-300 shrink-0">
              근무 지역
            </p>
            <p className="text-body1 text-ct-black-200 whitespace-pre-line">
              {data?.area}
            </p>
          </li>
          <li className="flex gap-[24px] px-[5px] py-[13px] border-b border-ct-gray-200">
            <p className="w-[57px] h-[16px] text-body1 text-ct-gray-300 shrink-0">
              지원 조건
            </p>
            <p className="text-body1 text-ct-black-200 whitespace-pre-line">
              {data?.require}
            </p>
          </li>
          <li className="flex gap-[24px] px-[5px] py-[13px] border-b border-ct-gray-200">
            <p className="w-[57px] h-[16px] text-body1 text-ct-gray-300 shrink-0">
              급여
            </p>
            <p className="text-body1 text-ct-black-200 whitespace-pre-line">
              {data?.salary}
            </p>
          </li>
          <li className="flex gap-[24px] px-[5px] py-[13px]">
            <p className="w-[57px] h-[16px] text-body1 text-ct-gray-300 shrink-0">
              근무 형태
            </p>
            <p className="text-body1 text-ct-black-200 whitespace-pre-line">
              {data?.work_type}
            </p>
          </li>
        </ul>
        {data?.recruiting_img && (
          <ImageDisplay
            imageUrl={data?.recruiting_img}
            alt="팀 상세 페이지"
            className="h-[397px] w-[349px] rounded-[16px] "
          />
        )}
        <div className="mt-[26px] flex justify-between">
          {isPending ? (
            <img
              src="/assets/recruit/bookmark(on).svg"
              alt="bookmark"
              onClick={handleUnSubscribe}
            />
          ) : (
            <img
              src="/assets/recruit/bookmark(off).svg"
              alt="bookmark"
              onClick={handleSubscribe}
            />
          )}

          <button className="w-[132px] h-[34px] rounded-[16px] bg-ct-main-blue-100 text-sub2 font-Pretendard text-ct-white">
            채팅으로 문의
          </button>
        </div>
      </div>
      <BottomNav />
    </TopBarContainer>
  );
}
export default RecruitAnnouncement;
