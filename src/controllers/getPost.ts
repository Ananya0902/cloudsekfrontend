import axios, { AxiosResponse } from "axios";
import IPost from "../@types/post";

// interface Post {
//     id: number;
//     title: string;
//     content: string;
//     edited: boolean;
// }

const getPosts = async (): Promise<IPost[] | null> => {
    try {
        const token = process.env.REACT_APP_BEARER_TOKEN as string;

        const response: AxiosResponse<IPost[]> = await axios.get(process.env.REACT_APP_GET_POSTS as string, {
            headers: {
                Authorization: `Bearer ${token}`, // Set the Authorization header
            },
        });
        return response.data; // Assuming the posts are in the response data
    } catch (error) {
        console.error("Error fetching posts:", error);
        return null; // Return null or handle the error as needed
    }
};

export { getPosts };
