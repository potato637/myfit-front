import { useInfiniteQuery } from "@tanstack/react-query";
import { searchFeedsByHashtag } from "../apis/feed";

interface UseFeedHashtagSearchProps {
  hashtag: string;
  enabled?: boolean;
}

export const useFeedHashtagSearch = ({ hashtag, enabled = true }: UseFeedHashtagSearchProps) => {
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
    enabled: enabled && !!hashtag.trim(),
  });
};