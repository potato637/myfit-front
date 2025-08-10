import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  sectorBaseSearching,
  CountCardParams,
  countCard,
  FilterResultParams,
  filterResult,
} from "../apis/searchingAPI";

export const useSectorBaseSearching = ({
  high_sector,
  low_sector,
  sort,
}: {
  high_sector: string;
  low_sector: string;
  sort: "latest" | "oldest";
}) => {
  return useInfiniteQuery({
    queryKey: ["sector-base-searching", high_sector, low_sector, sort],
    queryFn: ({ pageParam = "0" }) =>
      sectorBaseSearching({
        high_sector,
        low_sector,
        sort,
        cursor: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      const nextCursor = lastPage.result.next_cursor;
      return nextCursor ? nextCursor : undefined;
    },
    initialPageParam: "0",
    enabled: !!high_sector && !!low_sector && !!sort,
  });
};

export const useCountCard = (params: CountCardParams) => {
  const { area, status, hope_job, keywords } = params;

  return useQuery({
    queryKey: ["count-card", { area, status, hope_job, keywords }],
    queryFn: () => countCard(params),
    enabled: !!area || !!status || !!hope_job || !!keywords?.length,
  });
};

export const useFilterResult = (params: FilterResultParams) => {
  const { area, status, hope_job, keywords } = params;

  return useInfiniteQuery({
    queryKey: ["filter-result", { area, status, hope_job, keywords }],
    queryFn: ({ pageParam = "0" }) =>
      filterResult({
        cursor: pageParam,
        area,
        status,
        hope_job,
        keywords,
      }),
    getNextPageParam: (lastPage) => {
      const nextCursor = lastPage.result.next_cursor;
      return nextCursor ? nextCursor : undefined;
    },
    initialPageParam: "0",
    enabled: !!area || !!status || !!hope_job || !!keywords?.length,
  });
};
