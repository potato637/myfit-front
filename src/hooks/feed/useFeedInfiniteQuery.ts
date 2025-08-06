import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeedsWithCursor } from "../../apis/feed";
import { FeedResponse } from "../../types/feed/feed";

export const useFeedInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ["feeds"],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      getFeedsWithCursor(pageParam),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage: FeedResponse) =>
      lastPage.result.pagination.has_next
        ? lastPage.result.pagination.next_cursor
        : undefined,
  });
};