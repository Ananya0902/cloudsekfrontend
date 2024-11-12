// import { IAddComment } from './../@types/comment.d';
import { _get, _post, _put, _delete } from './apiClient';
import IComment, { IAddComment } from '../@types/comment';

const COMMENTS_ENDPOINT = '/comments';

// Fetch comments for a specific post
export const fetchCommentsForPost = async (postId: string): Promise<IComment[]> => {
    const response = await _get<IComment[]>(`${COMMENTS_ENDPOINT}/${postId}`);
    return response.data;
};

// Add a new comment to a post
export const addComment = async (data: IAddComment): Promise<IComment> => {
    const response = await _post<IComment>(`${COMMENTS_ENDPOINT}`, data);
    return response.data;
};

// Update an existing comment
export const updateComment = async (commentId: string, updatedComment: Partial<IComment>): Promise<IComment> => {
    const response = await _put<IComment>(`${COMMENTS_ENDPOINT}/${commentId}`, updatedComment);
    return response.data;
};

// Delete a comment
export const deleteComment = async (commentId: string): Promise<void> => {
    await _delete(`${COMMENTS_ENDPOINT}/${commentId}`);
};

// Add a reply to a comment
export const addReply = async (postId: string, commentId: string, reply: Omit<IComment, 'id'>): Promise<IComment> => {
    const response = await _post<IComment>(`${COMMENTS_ENDPOINT}/post/${postId}/comments/${commentId}/replies`, reply);
    return response.data;
};

// export { fetchCommentsForPost, addComment, updateComment, deleteComment, addReply };
