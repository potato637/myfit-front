import { useInfiniteQuery } from "@tanstack/react-query";
import { searchFeedsByKeyword } from "../../apis/feed";

interface UseFeedSearchQueryProps {
  keyword: string;
}

export const useFeedSearchQuery = ({ keyword }: UseFeedSearchQueryProps) => {
  return useInfiniteQuery({
    queryKey: ['searchFeedsByKeyword', keyword],
    queryFn: ({ pageParam }: { pageParam?: number }) => 
      searchFeedsByKeyword({ keyword, last_feed_id: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.result.pagination) {
        return lastPage.result.pagination.has_next 
          ? lastPage.result.pagination.next_cursor 
          : undefined;
      }
      const feeds = lastPage.result.feeds;
      return feeds.length > 0 ? feeds[feeds.length - 1].feed_id : undefined;
    },
    enabled: !!keyword.trim(),
  });
};