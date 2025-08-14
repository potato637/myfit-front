import { useCallback, useMemo } from "react";
import ImageDisplay from "../../components/common/ImageDisplay";
import TopBarContainer from "../../components/common/TopBarContainer";
import BottomNav from "../../components/layouts/BottomNav";
import {
  useCreateChattingRoomMutation,
  usegetRecruitmentDetailQuery,
  useSubscribeRecruitmentMutation,
  useUnSubscribeRecruitmentMutation,
} from "../../hooks/recruiting/recruiting";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function RecruitAnnouncement() {
  const { recruitment_id } = useParams();
  const recruitmentId = String(recruitment_id);

  const queryClient = useQueryClient();
  const detailKey = useMemo(
    () => ["recruitmentDetail", recruitmentId],
    [recruitmentId]
  );

  const { data } = usegetRecruitmentDetailQuery(recruitmentId);
  const { mutate: subscribe, isPending: isSubscribing } =
    useSubscribeRecruitmentMutation(recruitmentId);
  const { mutate: unsubscribe, isPending: isUnsubscribing } =
    useUnSubscribeRecruitmentMutation(recruitmentId);
  const { mutate: createChattingRoom, isPending: isCreatingRoom } =
    useCreateChattingRoomMutation();

  const nav = useNavigate();

  const targetServiceId = data?.result.recruitment.writer.id;
  const isSubscribed = data?.result.recruitment.is_subscribed ?? false;

  const applyOptimisticFlip = useCallback(() => {
    const prev = queryClient.getQueryData<any>(detailKey);
    if (!prev) return prev;
    const next = {
      ...prev,
      result: {
        ...prev.result,
        recruitment: {
          ...prev.result.recruitment,
          is_subscribed: !prev.result.recruitment.is_subscribed,
        },
      },
    };
    queryClient.setQueryData(detailKey, next);
    return prev;
  }, [detailKey, queryClient]);

  const handleToggleSubscribe = useCallback(() => {
    const prevSnapshot = applyOptimisticFlip();
    const onError = () => {
      if (prevSnapshot) queryClient.setQueryData(detailKey, prevSnapshot);
    };
    const onSettled = () => {
      queryClient.invalidateQueries({ queryKey: detailKey });
    };
    if (isSubscribed) {
      unsubscribe(undefined, { onError, onSettled });
    } else {
      subscribe(undefined, { onError, onSettled });
    }
  }, [
    applyOptimisticFlip,
    detailKey,
    isSubscribed,
    queryClient,
    subscribe,
    unsubscribe,
  ]);

  const handleClick = useCallback(() => {
    if (!targetServiceId || isCreatingRoom) return;
    createChattingRoom(targetServiceId, {
      onSuccess: (res) => {
        nav(`/chatting/${res.result.chatting_room_id}`, {
          state: { isNewRoom: res.result.is_new },
        });
      },
    });
  }, [createChattingRoom, isCreatingRoom, nav, targetServiceId]);

  const TopBarContent = () => {
    return (
      <div className="flex items-center gap-[6px]">
        <img
          className="w-[24px] h-[24px]"
          src={data?.result.recruitment.writer.profile_img}
        />
        <span className="text-h1 font-Pretendard text-ct-black-100 tracking-[-0.31px]">
          {data?.result.recruitment.writer.name}
        </span>
      </div>
    );
  };

  const disableToggle = isSubscribing || isUnsubscribing;

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="flex flex-col px-[19px] overflow-y-scroll pb-[100px]">
        <div className="text-sub2 px-[5px] text-ct-main-blue-100 mt-[10px]">
          마감일자 : {data?.result.recruitment.dead_line.split("T")[0]}
        </div>
        <ul className="flex flex-col mt-[12.5px]">
          <li className="flex gap-[24px] px-[5px] py-[13px] border-y border-ct-gray-200">
            <p className="w-[57px] h-[16px] text-body1 text-ct-gray-300 shrink-0">
              공고 제목
            </p>
            <p className="text-body1 text-ct-black-200 whitespace-pre-line">
              {data?.result.recruitment.title}
            </p>
          </li>
          <li className="flex gap-[24px] px-[5px] py-[13px] border-b border-ct-gray-200">
            <p className="w-[57px] h-[16px] text-body1 text-ct-gray-300 shrink-0">
              구인 직무
            </p>
            <p className="text-body1 text-ct-black-200 whitespace-pre-line">
              {data?.result.recruitment.low_sector}
            </p>
          </li>
          <li className="flex gap-[24px] px-[5px] py-[13px] border-b border-ct-gray-200">
            <p className="w-[57px] h-[16px] text-body1 text-ct-gray-300 shrink-0">
              근무 지역
            </p>
            <p className="text-body1 text-ct-black-200 whitespace-pre-line">
              {data?.result.recruitment.area}
            </p>
          </li>
          <li className="flex gap-[24px] px-[5px] py-[13px] border-b border-ct-gray-200">
            <p className="w-[57px] h-[16px] text-body1 text-ct-gray-300 shrink-0">
              지원 조건
            </p>
            <p className="text-body1 text-ct-black-200 whitespace-pre-line">
              {data?.result.recruitment.require}
            </p>
          </li>
          <li className="flex gap-[24px] px-[5px] py-[13px] border-b border-ct-gray-200">
            <p className="w-[57px] h-[16px] text-body1 text-ct-gray-300 shrink-0">
              급여
            </p>
            <p className="text-body1 text-ct-black-200 whitespace-pre-line">
              {data?.result.recruitment.salary}
            </p>
          </li>
          <li className="flex gap-[24px] px-[5px] py-[13px]">
            <p className="w-[57px] h-[16px] text-body1 text-ct-gray-300 shrink-0">
              근무 형태
            </p>
            <p className="text-body1 text-ct-black-200 whitespace-pre-line">
              {data?.result.recruitment.work_type}
            </p>
          </li>
        </ul>

        {data?.result.recruitment.recruiting_img && (
          <ImageDisplay
            imageUrl={data?.result.recruitment.recruiting_img}
            alt="팀 상세 페이지"
            className="w-full object-contain rounded-[16px] mx-auto mt-[17px]"
          />
        )}

        <div className="mt-[26px] flex justify-between">
          <button
            onClick={disableToggle ? undefined : handleToggleSubscribe}
            disabled={disableToggle}
            className="ml-[10px] h-[25px] w-[25px] disabled:opacity-50"
          >
            <img
              src={
                isSubscribed
                  ? "/assets/recruit/bookmark(on).svg"
                  : "/assets/recruit/bookmark(off).svg"
              }
              alt="bookmark"
              className={
                isSubscribed ? "h-[24px] w-[24px]" : "h-[25px] w-[25px]"
              }
            />
          </button>

          <button
            className="w-[132px] h-[34px] rounded-[16px] bg-ct-main-blue-100 text-sub2 font-Pretendard text-ct-white disabled:opacity-50"
            onClick={handleClick}
            disabled={isCreatingRoom}
          >
            채팅으로 문의
          </button>
        </div>
      </div>
      <BottomNav />
    </TopBarContainer>
  );
}

export default RecruitAnnouncement;
