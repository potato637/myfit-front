import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeedComments } from "../../apis/feed";

interface UseFeedCommentsProps {
  activePostId: string | null;
}

export const useFeedComments = ({ activePostId }: UseFeedCommentsProps) => {
  return useInfiniteQuery({
    queryKey: ["comments", activePostId],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      getFeedComments({
        feedId: Number(activePostId),
        last_comment_id: pageParam,
        size: 10,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      // null/undefined 가드
      if (!lastPage || !lastPage.result) {
        console.log("⚠️ [Pagination] lastPage 또는 result가 없음");
        return undefined;
      }

      const pagination = lastPage.result.pagination;

      console.log("🔄 [Pagination] getNextPageParam 체크:", {
        hasMore: pagination?.hasMore,
        nextCursor: pagination?.next_cursor,
        commentsLength: lastPage.result.feeds?.length,
      });

      // 서버 pagination 정보 활용 (피드와 동일한 방식)
      if (pagination?.hasMore) {
        console.log(
          "➡️ [Pagination] 서버 pagination 정보 사용:",
          pagination.next_cursor
        );
        return pagination.next_cursor;
      }

      console.log("🏁 [Pagination] 마지막 페이지 도달");
      return undefined;
    },
    enabled: !!activePostId,
  });
};
