import apiClient from "./apiClient";

interface BaseResponse {
  isSuccess: boolean;
  code: number;
  message: string;
}

export interface SectorBaseSearchingItem {
  card_id: number;
  author_name: string;
  recruiting_status: string;
  keywords: string[];
  card_img: string;
  one_line_profile: string;
}
export interface SectorBaseSearchingResponse extends BaseResponse {
  result: {
    cards: SectorBaseSearchingItem[];
    next_cursor: string | null;
    has_next: boolean;
  };
}
type SectorBaseSearchingParams = {
  high_sector: string;
  low_sector: string;
  sort: "latest" | "oldest";
  cursor?: string;
};
export const sectorBaseSearching = async ({
  high_sector,
  low_sector,
  sort,
  cursor = "0",
}: SectorBaseSearchingParams): Promise<SectorBaseSearchingResponse> => {
  try {
    const { data } = await apiClient.get<SectorBaseSearchingResponse>(
      `/api/cards/sector`,
      {
        params: {
          high_sector,
          low_sector,
          sort,
          cursor,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("sectorBaseSearching error:", error);
    throw error;
  }
};

export interface CountCardResponse extends BaseResponse {
  result: {
    count: number;
  };
}
export type CountCardParams = {
  area?: string;
  status?: string;
  hope_job?: string;
  keywords?: string[];
};
export const countCard = async ({
  area,
  status,
  hope_job,
  keywords,
}: CountCardParams): Promise<CountCardResponse> => {
  try {
    const { data } = await apiClient.get<CountCardResponse>(
      `/api/cards/count`,
      {
        params: {
          area,
          status,
          hope_job,
          ...(keywords && { keywords }),
        },
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();

          Object.entries(params).forEach(([key, value]) => {
            if (value === undefined || value === null) return;

            if (Array.isArray(value)) {
              value.forEach((item) => {
                if (item !== undefined && item !== null) {
                  searchParams.append(key, item);
                }
              });
            } else {
              searchParams.append(key, value);
            }
          });

          return searchParams.toString();
        },
      }
    );
    return data;
  } catch (error) {
    console.error("countCard error:", error);
    throw error;
  }
};

export interface FilterResultResponse extends BaseResponse {
  result: {
    cards: SectorBaseSearchingItem[];
    total_count: number;
    next_cursor: string | null;
    has_next: boolean;
  };
}
export type FilterResultParams = {
  cursor?: string;
  area?: string;
  status?: string;
  hope_job?: string;
  keywords?: string[];
};
export const filterResult = async ({
  cursor = "0",
  area,
  status,
  hope_job,
  keywords,
}: FilterResultParams): Promise<FilterResultResponse> => {
  try {
    const { data } = await apiClient.get<FilterResultResponse>(
      `/api/cards/swipe`,
      {
        params: {
          cursor,
          area,
          status,
          hope_job,
          ...(keywords && { keywords }),
        },
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();

          Object.entries(params).forEach(([key, value]) => {
            if (value === undefined || value === null) return;

            if (Array.isArray(value)) {
              value.forEach((item) => {
                if (item !== undefined && item !== null) {
                  searchParams.append(key, item);
                }
              });
            } else {
              searchParams.append(key, value);
            }
          });

          return searchParams.toString();
        },
      }
    );
    return data;
  } catch (error) {
    console.error("filterResult error:", error);
    throw error;
  }
};
