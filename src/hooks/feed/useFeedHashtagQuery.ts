import { useInfiniteQuery } from "@tanstack/react-query";
import { searchFeedsByHashtag } from "../../apis/feed";

interface UseFeedHashtagQueryProps {
  hashtag: string;
}

export const useFeedHashtagQuery = ({ hashtag }: UseFeedHashtagQueryProps) => {
  return useInfiniteQuery({
    queryKey: ['searchFeedsByHashtag', hashtag],
    queryFn: ({ pageParam }: { pageParam?: number }) => 
      searchFeedsByHashtag({ hashtag, last_feed_id: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.result.pagination.has_next 
        ? lastPage.result.pagination.next_cursor 
        : undefined;
    },
    enabled: !!hashtag.trim(),
  });
};