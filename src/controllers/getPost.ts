import { _get } from './apiClient';
import IPost from '../@types/post';

const getPosts = async (): Promise<IPost[] | null> => {
    try {
        const response = await _get<IPost[]>("/posts");
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return null;
    }
};

export { getPosts };
