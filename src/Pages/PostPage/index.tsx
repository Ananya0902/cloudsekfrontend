import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './PostPage.css';

interface Comment {
  id: string;
  text: string;
  author: string;
  parentId?: string;
  replies?: Comment[];
}

interface Post {
  id: string;
  content: string;
  author: string;
  comments: Comment[];
}

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 'post1',
      content: 'This is the first post.',
      author: 'Author1',
      comments: [
        {
          id: 'comment1',
          text: 'This is a comment.',
          author: 'User1',
          replies: [],
        },
      ],
    },
    {
      id: 'post2',
      content: 'Here’s another post!',
      author: 'Author2',
      comments: [],
    },
    {
      id: 'post3',
      content: 'Another post to test pagination.',
      author: 'Author3',
      comments: [],
    },
    {
      id: 'post4',
      content: 'Yet another post to test pagination.',
      author: 'Author4',
      comments: [],
    },
    // Add more posts as needed for testing
  ]);

  const postsPerPage = 2; // Number of posts to display per page
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Calculate the posts to display based on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // State to hold the comment text for each post and comment
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
  const [replyTo, setReplyTo] = useState<{ [key: string]: string | null }>({});

  const addComment = (postId: string, text: string, parentId?: string) => {
    if (!text.trim()) return; // Prevent empty comments

    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      author: 'CurrentUser', // Replace with the logged-in user's name
      parentId,
      replies: [],
    };

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: parentId
                ? post.comments.map((comment) =>
                    comment.id === parentId
                      ? { ...comment, replies: [...(comment.replies || []), newComment] }
                      : comment
                  )
                : [...post.comments, newComment],
            }
          : post
      )
    );

    // Reset text and reply state for the specific comment
    setCommentText((prev) => ({ ...prev, [postId]: '' }));
    setReplyTo((prev) => ({ ...prev, [postId]: null }));
  };

  const renderComments = (comments: Comment[], postId: string, depth: number = 0) =>
    comments.map((comment) => (
      <div key={comment.id} style={{ marginLeft: depth * 20 }}>
        <div>
          <strong>{comment.author}</strong>:{' '}
          <span dangerouslySetInnerHTML={{ __html: comment.text }} />
          <button
            onClick={() => setReplyTo((prev) => ({ ...prev, [postId]: comment.id }))}
          >
            Reply
          </button>
        </div>
        {comment.replies && renderComments(comment.replies, postId, depth + 1)}
      </div>
    ));

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Posts</h2>
      {currentPosts.map((post) => (
        <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '20px 0' }}>
          <h3>{post.author}</h3>
          <p>{post.content}</p>
          <div>
            <h4>Comments</h4>
            {renderComments(post.comments, post.id)}

            <ReactQuill
              value={commentText[post.id] || ''}
              onChange={(value) => setCommentText((prev) => ({ ...prev, [post.id]: value }))}
              placeholder="Write a comment..."
              modules={{
                toolbar: [
                  [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                  [{size: []}],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                  ['link', 'image', 'video'],
                  ['clean'],
                ],
              }}
              style={{ marginTop: '10px' }}
            />

            <button
              onClick={() => addComment(post.id, commentText[post.id], replyTo[post.id] || undefined)}
              style={{ marginTop: '10px' }}
            >
              {replyTo[post.id] ? 'Reply' : 'Comment'}
            </button>
          </div>
        </div>
      ))}

      {/* Pagination controls */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
