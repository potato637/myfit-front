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
import { toast } from "react-toastify";

export const useRegisterRecruitPost = () => {
  return useMutation({
    mutationFn: (data: RegisterRecruitRequest) => RegisterRecruitPost(data),
    onSuccess: () => {
      toast.success("공고 등록을 성공하였습니다");
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

export const useGetSubscribedRecruitment = (page: number) => {
  return useQuery({
    queryKey: ["subscribedRecruitment", page],
    queryFn: () => getSubscribedRecruitment(page),
  });
};

export const useCreateChattingRoomMutation = () => {
  return useMutation<CreateChattingRoomResponse, Error, number>({
    mutationFn: (target_service_id: number) =>
      createChattingRoom(target_service_id),
  });
};
