export default interface IComment {
    authorId: string;
    parentCommentId?: string;
    content: string;
    mentions: string;
    id?: string;
}
