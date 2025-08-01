import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  // Interest
  postInterest,
  deleteInterest,
  getMyInterest,
  getPeopleWhoInterestMe,
  getAmIInterestHim,
  getSentInterestCount,
  getReceivedInterestCount,

  // Network
  PostNetwork,
  patchAcceptNetwork,
  patchRejectNetwork,
  deleteNetwork,
  getMyNetwork,
  getMyNetworkRequest,
  getReceivedNetwork,
  getIsNetworking,
  getSomeoneNetworkCount,

  // Block
  postBlockUser,
  deleteBlockUser,
  getBlockedUser,
  getBlockStatus,
} from "../apis/relationsAPI";

// Interest Hooks
export const usePostInterest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ service_id }: { service_id: string }) =>
      postInterest({ service_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interest"] });
    },
  });
};

export const useDeleteInterest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ service_id }: { service_id: string }) =>
      deleteInterest({ service_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interest"] });
    },
  });
};

export const useGetMyInterest = ({ page }: { page: number }) => {
  return useQuery({
    queryKey: ["my-interest", page],
    queryFn: () => getMyInterest({ page }),
    staleTime: 1000 * 60,
  });
};

export const useGetPeopleWhoInterestMe = () => {
  return useQuery({
    queryKey: ["people-who-interest-me"],
    queryFn: getPeopleWhoInterestMe,
    staleTime: 1000 * 60,
  });
};

export const useGetAmIInterestHim = (service_id: string) => {
  return useQuery({
    queryKey: ["am-i-interested", service_id],
    queryFn: () => getAmIInterestHim({ service_id }),
    enabled: !!service_id,
    staleTime: 1000 * 60,
  });
};

export const useGetSentInterestCount = (service_id: string) => {
  return useQuery({
    queryKey: ["sent-interest-count", service_id],
    queryFn: () => getSentInterestCount({ service_id }),
    enabled: !!service_id,
    staleTime: 1000 * 60,
  });
};

export const useGetReceivedInterestCount = (service_id: string) => {
  return useQuery({
    queryKey: ["received-interest-count", service_id],
    queryFn: () => getReceivedInterestCount({ service_id }),
    enabled: !!service_id,
    staleTime: 1000 * 60,
  });
};

// Network Hooks
export const usePostNetwork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ service_id }: { service_id: string }) =>
      PostNetwork({ service_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["network"] });
    },
  });
};

export const usePatchAcceptNetwork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ service_id }: { service_id: string }) =>
      patchAcceptNetwork({ service_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["network"] });
    },
  });
};

export const usePatchRejectNetwork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ service_id }: { service_id: string }) =>
      patchRejectNetwork({ service_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["network"] });
    },
  });
};

export const useDeleteNetwork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ network_id }: { network_id: string }) =>
      deleteNetwork({ network_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["network"] });
    },
  });
};

export const useGetMyNetwork = () => {
  return useQuery({
    queryKey: ["my-network"],
    queryFn: getMyNetwork,
    staleTime: 1000 * 60,
  });
};

export const useGetMyNetworkRequest = () => {
  return useQuery({
    queryKey: ["my-network-request"],
    queryFn: getMyNetworkRequest,
    staleTime: 1000 * 60,
  });
};

export const useGetReceivedNetwork = () => {
  return useQuery({
    queryKey: ["received-network"],
    queryFn: getReceivedNetwork,
    staleTime: 1000 * 60,
  });
};

export const useGetIsNetworking = (service_id: string) => {
  return useQuery({
    queryKey: ["is-networking", service_id],
    queryFn: () => getIsNetworking({ service_id }),
    enabled: !!service_id,
    staleTime: 1000 * 60,
  });
};

export const useGetSomeoneNetworkCount = (service_id: string) => {
  return useQuery({
    queryKey: ["someone-network-count", service_id],
    queryFn: () => getSomeoneNetworkCount({ service_id }),
    enabled: !!service_id,
    staleTime: 1000 * 60,
  });
};

// Block Hooks
export const usePostBlockUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ service_id }: { service_id: string }) =>
      postBlockUser({ service_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["block"] });
    },
  });
};

export const useDeleteBlockUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ service_id }: { service_id: string }) =>
      deleteBlockUser({ service_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["block"] });
    },
  });
};

export const useGetBlockedUser = () => {
  return useQuery({
    queryKey: ["blocked-users"],
    queryFn: getBlockedUser,
    staleTime: 1000 * 60,
  });
};

export const useGetBlockStatus = (service_id: string) => {
  return useQuery({
    queryKey: ["block-status", service_id],
    queryFn: () => getBlockStatus({ service_id }),
    enabled: !!service_id,
    staleTime: 1000 * 60,
  });
};
