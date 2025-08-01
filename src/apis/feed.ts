import apiClient from "./apiClient";
import { FeedResponse } from "../types/feed/feed";
import { LikeFeedResponse } from "../types/feed/like";
import { CommentsResponse, GetCommentsParams, CreateCommentRequest, CreateCommentResponse } from "../types/feed/comment";
import { CreateFeedRequest, CreateFeedResponse } from "../types/feed/createFeed";
import { SearchUsersResponse, SearchUsersParams } from "../types/feed/search";
import { SearchKeywordResponse, SearchKeywordParams } from "../types/feed/searchKeyword";

export const getFeedsWithCursor = async (cursor?: number): Promise<FeedResponse> => {
  const params = cursor ? { last_feed_id: cursor } : {};
  console.log('🔄 [API] 피드 조회 요청:', params);
  const response = await apiClient.get<FeedResponse>("/api/feeds", { params });
  console.log('✅ [API] 피드 조회 응답:', response.data);
  return response.data;
};

// 좋아요 추가
export const addFeedLike = async (feedId: number): Promise<LikeFeedResponse> => {
  const response = await apiClient.post<LikeFeedResponse>(`/api/feeds/${feedId}/heart`, '');
  return response.data;
};

// 좋아요 취소
export const removeFeedLike = async (feedId: number): Promise<LikeFeedResponse> => {
  const response = await apiClient.delete<LikeFeedResponse>(`/api/feeds/${feedId}/heart`);
  return response.data;
};

// 피드 댓글 목록 조회
export const getFeedComments = async ({ feedId, last_comment_id, size }: GetCommentsParams): Promise<CommentsResponse> => {
  const params: Record<string, string | number> = {};
  if (last_comment_id) params.last_comment_id = last_comment_id;
  if (size) params.size = size;
  
  const response = await apiClient.get<CommentsResponse>(`/api/feeds/${feedId}/comments`, { params });
  return response.data;
};

// 댓글 작성
export const createComment = async (feedId: number, request: CreateCommentRequest): Promise<CreateCommentResponse> => {
  const response = await apiClient.post<CreateCommentResponse>(`/api/feeds/${feedId}/comments`, request);
  return response.data;
};

// 피드 작성
export const createFeed = async (request: CreateFeedRequest): Promise<CreateFeedResponse> => {
  const response = await apiClient.post<CreateFeedResponse>("/api/feeds", request);
  return response.data;
};

// 유저 검색
export const searchUsers = async ({ name, last_profile_id }: SearchUsersParams): Promise<SearchUsersResponse> => {
  const params: Record<string, string | number> = { name };
  if (last_profile_id) params.last_profile_id = last_profile_id;
  
  const response = await apiClient.get<SearchUsersResponse>("/api/feeds/search/profiles", { params });
  return response.data;
};

// 키워드로 피드 검색
export const searchFeedsByKeyword = async ({ keyword, last_feed_id }: SearchKeywordParams): Promise<SearchKeywordResponse> => {
  const params: Record<string, string | number> = { keyword };
  if (last_feed_id) params.last_feed_id = last_feed_id;
  
  const response = await apiClient.get<SearchKeywordResponse>("/api/feeds/search/keyword", { params });
  return response.data;
};