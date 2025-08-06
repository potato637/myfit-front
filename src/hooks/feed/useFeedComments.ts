import { useQuery } from "@tanstack/react-query";
import { getFeedComments } from "../../apis/feed";

interface UseFeedCommentsProps {
  activePostId: string | null;
}

export const useFeedComments = ({ activePostId }: UseFeedCommentsProps) => {
  return useQuery({
    queryKey: ["comments", activePostId],
    queryFn: () => getFeedComments({ feedId: Number(activePostId) }),
    enabled: !!activePostId,
  });
};