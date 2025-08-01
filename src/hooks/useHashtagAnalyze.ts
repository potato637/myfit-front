import { useInfiniteQuery } from "@tanstack/react-query";
import { analyzeHashtags } from "../apis/feed";

interface UseHashtagAnalyzeProps {
  keyword: string;
  enabled?: boolean;
}

export const useHashtagAnalyze = ({ keyword, enabled = true }: UseHashtagAnalyzeProps) => {
  return useInfiniteQuery({
    queryKey: ['analyzeHashtags', keyword],
    queryFn: ({ pageParam }: { pageParam?: number }) => 
      analyzeHashtags({ keyword, last_hashtag_id: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.result.pagination.has_next 
        ? lastPage.result.pagination.next_cursor 
        : undefined;
    },
    enabled: enabled && !!keyword.trim(),
  });
};