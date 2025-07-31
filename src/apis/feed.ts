import apiClient from "./apiClient";
import { FeedResponse } from "../types/feed/feed";
import { LikeFeedResponse } from "../types/feed/like";
import { CommentsResponse, GetCommentsParams, CreateCommentRequest, CreateCommentResponse } from "../types/feed/comment";

export const getFeedsWithCursor = async (cursor?: number): Promise<FeedResponse> => {
  const params = cursor ? { cursor } : {};
  const response = await apiClient.get<FeedResponse>("/api/feeds", { params });
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