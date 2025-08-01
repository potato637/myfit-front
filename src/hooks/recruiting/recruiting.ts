import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  createChattingRoom,
  CreateChattingRoomResponse,
  getRecruitmentDetail,
  getRecruitments,
  getSubscribedRecruitment,
  RegisterRecruitPost,
  RegisterRecruitRequest,
  subscribeRecruitment,
  unsubscribeRecruitment,
} from "../../apis/recruiting/recruiting";

export const useRegisterRecruitPost = () => {
  const nav = useNavigate();
  return useMutation({
    mutationFn: (data: RegisterRecruitRequest) => RegisterRecruitPost(data),
    onSuccess: () => {
      alert("공고가 성공적으로 등록되었습니다.");
      nav("/recruiting");
    },
  });
};

export const useGetRecruitmentsQuery = (
  highSector: string,
  lowSector?: string,
  page?: number
) => {
  return useQuery({
    queryKey: ["recruitments", highSector, lowSector, page],
    queryFn: () => getRecruitments(highSector, lowSector, page),
    staleTime: 1000 * 60,
    enabled: !!highSector,
  });
};

export const usegetRecruitmentDetailQuery = (recruitment_id: string) => {
  return useQuery({
    queryKey: ["recruitmentDetail", recruitment_id],
    queryFn: () => getRecruitmentDetail(recruitment_id),
    staleTime: 1000 * 60,
    enabled: !!recruitment_id,
  });
};

export const useSubscribeRecruitmentMutation = (recruitment_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => subscribeRecruitment(recruitment_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recruitmentDetail", recruitment_id],
      });
    },
  });
};

export const useUnSubscribeRecruitmentMutation = (recruitment_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => unsubscribeRecruitment(recruitment_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recruitmentDetail", recruitment_id],
      });
    },
  });
};

export const useGetSubscribedRecruitment = (total_page: number) => {
  return useQuery({
    queryKey: ["subscribedRecruitment", total_page],
    queryFn: () => getSubscribedRecruitment(total_page),
  });
};

export const useCreateChattingRoomMutation = () => {
  return useMutation<CreateChattingRoomResponse, Error, number>({
    mutationFn: (target_service_id: number) =>
      createChattingRoom(target_service_id),
  });
};
