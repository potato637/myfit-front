import apiClient from "./apiClient";
import { FeedResponse } from "../types/feed/feed";
import { LikeFeedResponse } from "../types/feed/like";
import { CommentsResponse, GetCommentsParams, CreateCommentRequest, CreateCommentResponse, DeleteCommentResponse } from "../types/feed/comment";
import { CreateFeedRequest, CreateFeedResponse } from "../types/feed/createFeed";
import { GetFeedForEditResponse, UpdateFeedRequest, UpdateFeedResponse } from "../types/feed/editFeed";
import { 
  SearchUsersResponse, 
  SearchUsersParams,
  SearchHashtagParams,
  SearchHashtagResponse,
  SearchKeywordResponse,
  SearchKeywordParams,
  AnalyzeHashtagParams,
  AnalyzeHashtagResponse
} from "../types/feed/search";

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

// 키워드로 해시태그 분석
export const analyzeHashtags = async ({ keyword, last_hashtag_id }: AnalyzeHashtagParams): Promise<AnalyzeHashtagResponse> => {
  const params: Record<string, string | number> = { keyword };
  if (last_hashtag_id) params.last_hashtag_id = last_hashtag_id;
  
  console.log('🔄 [API] 해시태그 분석 요청:', params);
  const response = await apiClient.get<AnalyzeHashtagResponse>("/api/feeds/search/hashtag/analyze", { params });
  console.log('✅ [API] 해시태그 분석 응답:', response.data);
  return response.data;
};

// 해시태그로 피드 검색
export const searchFeedsByHashtag = async ({ hashtag, last_feed_id }: SearchHashtagParams): Promise<SearchHashtagResponse> => {
  const params: Record<string, string | number> = { hashtag };
  if (last_feed_id) params.last_feed_id = last_feed_id;
  
  console.log('🔄 [API] 해시태그 검색 요청:', params);
  const response = await apiClient.get<SearchHashtagResponse>("/api/feeds/search/hashtag", { params });
  console.log('✅ [API] 해시태그 검색 응답:', response.data);
  return response.data;
};

// 댓글 삭제
export const deleteComment = async (feedId: number, commentId: number): Promise<DeleteCommentResponse> => {
  console.log('🗑️ [API] 댓글 삭제 요청:', { feedId, commentId });
  const response = await apiClient.delete<DeleteCommentResponse>(`/api/feeds/${feedId}/comments/${commentId}`);
  console.log('✅ [API] 댓글 삭제 응답:', response.data);
  return response.data;
};

// 특정 피드 조회 (수정용)
export const getFeedForEdit = async (feedId: number): Promise<GetFeedForEditResponse> => {
  console.log('🔄 [API] 피드 수정용 조회 요청:', feedId);
  const response = await apiClient.get<GetFeedForEditResponse>(`/api/feeds/${feedId}`);
  console.log('✅ [API] 피드 수정용 조회 응답:', response.data);
  return response.data;
};

// 피드 수정
export const updateFeed = async (feedId: number, request: UpdateFeedRequest): Promise<UpdateFeedResponse> => {
  console.log('🔄 [API] 피드 수정 요청:', { feedId, request });
  const response = await apiClient.patch<UpdateFeedResponse>(`/api/feeds/${feedId}`, request);
  console.log('✅ [API] 피드 수정 응답:', response.data);
  return response.data;
};