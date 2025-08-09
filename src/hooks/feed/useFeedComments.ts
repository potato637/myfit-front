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
      const comments = lastPage.result.feeds;
      console.log('🔄 [Pagination] getNextPageParam 체크:', {
        commentsLength: comments.length,
        hasMore: comments.length === 10,
        lastCommentId: comments.length > 0 ? comments[comments.length - 1].id : null
      });
      
      if (comments.length === 10) {
        const nextPageParam = comments[comments.length - 1].id;
        console.log('➡️ [Pagination] 다음 페이지 파라미터:', nextPageParam);
        return nextPageParam;
      }
      
      console.log('🏁 [Pagination] 마지막 페이지 도달');
      return undefined;
    },
    enabled: !!activePostId,
  });
};