import { IComment } from "./comment";

export default interface IPost {
    authorId: string;
    content: string;
    title: string;
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    comments?: IComment[];
    mentions: string[];
    edited?: boolean;
}
