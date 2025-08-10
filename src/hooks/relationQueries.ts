import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
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
import { addFeedLike, removeFeedLike } from "../apis/feed";

// Interest Hooks
export const usePostInterest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ service_id }: { service_id: string }) =>
      postInterest({ service_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["networking"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useDeleteInterest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ service_id }: { service_id: string }) =>
      deleteInterest({ service_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["networking"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useGetMyInterest = () => {
  return useInfiniteQuery({
    queryKey: ["networking", "my-interest"],
    queryFn: ({ pageParam = 1 }) => getMyInterest({ page: pageParam }),
    staleTime: 1000 * 60,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.result?.pagination.hasNext) return undefined;
      return lastPage.result?.pagination.currentPage + 1;
    },
  });
};

export const useGetPeopleWhoInterestMe = () => {
  return useQuery({
    queryKey: ["networking", "people-who-interest-me"],
    queryFn: getPeopleWhoInterestMe,
    staleTime: 1000 * 60,
  });
};

export const useGetAmIInterestHim = ({
  service_id,
}: {
  service_id: string;
}) => {
  return useQuery({
    queryKey: ["networking", "am-i-interested", service_id],
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
      queryClient.invalidateQueries({ queryKey: ["networking"] });
    },
  });
};

export const usePatchAcceptNetwork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ network_id }: { network_id: string }) =>
      patchAcceptNetwork({ network_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["networking"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const usePatchRejectNetwork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ network_id }: { network_id: string }) =>
      patchRejectNetwork({ network_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["networking"] });
    },
  });
};

export const useDeleteNetwork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ network_id }: { network_id: string }) =>
      deleteNetwork({ network_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["networking"],
      });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useGetMyNetwork = () => {
  return useQuery({
    queryKey: ["networking", "my-network"],
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
    queryKey: ["networking", "received-network"],
    queryFn: getReceivedNetwork,
    staleTime: 1000 * 60,
  });
};

export const useGetIsNetworking = ({ service_id }: { service_id: string }) => {
  return useQuery({
    queryKey: ["networking", "is_networking"],
    queryFn: () => getIsNetworking({ service_id }),
    enabled: !!service_id,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
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

export const useAddFeedLike = ({ service_id }: { service_id: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ feed_id }: { feed_id: string }) =>
      addFeedLike(Number(feed_id)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feeds", service_id],
      });
    },
  });
};

export const useDeleteFeedLike = ({ service_id }: { service_id: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ feed_id }: { feed_id: string }) =>
      removeFeedLike(Number(feed_id)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feeds", service_id],
      });
    },
  });
};
