import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { io } from 'socket.io-client';

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
    // Example posts
    { id: 'post1', content: 'This is the first post.', author: 'Author1', comments: [] },
    { id: 'post2', content: 'Another post!', author: 'Author2', comments: [] },
    { id: 'post3', content: 'Testing pagination on comments.', author: 'Author3', comments: [] },
  ]);

  const postsPerPage = 2;
  const commentsPerPage = 2; // Comments per page
  const [currentPage, setCurrentPage] = useState(1);
  const [commentPage, setCommentPage] = useState<{ [key: string]: number }>({});
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
  const [replyTo, setReplyTo] = useState<{ [key: string]: string | null }>({});

  // Display current posts based on the page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const addComment = (postId: string, text: string, parentId?: string) => {
    if (!text.trim()) return;

    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      author: 'CurrentUser',
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

    setCommentText((prev) => ({ ...prev, [postId]: '' }));
    setReplyTo((prev) => ({ ...prev, [postId]: null }));
  };

  const renderComments = (comments: Comment[], postId: string, depth: number = 0) => {
    const currentCommentPage = commentPage[postId] || 1;
    const startIndex = (currentCommentPage - 1) * commentsPerPage;
    const currentComments = comments.slice(startIndex, startIndex + commentsPerPage);

    return (
      <>
        {currentComments.map((comment) => (
          <div key={comment.id} style={{ marginLeft: depth * 20 }}>
            <div>
              <strong>{comment.author}</strong>: <span dangerouslySetInnerHTML={{ __html: comment.text }} />
              <button onClick={() => setReplyTo((prev) => ({ ...prev, [postId]: comment.id }))}>Reply</button>
            </div>
            {comment.replies && renderComments(comment.replies, postId, depth + 1)}
          </div>
        ))}
        {comments.length > commentsPerPage && (
          <div className="pagination">
            {Array.from({ length: Math.ceil(comments.length / commentsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCommentPage((prev) => ({ ...prev, [postId]: i + 1 }))}
                className={i + 1 === currentCommentPage ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </>
    );
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const socket = io('http://localhost:5000');

  useEffect(() => {
    socket.on('newPost', (newPost) => {
      setPosts((prevPosts) => [...prevPosts, newPost]);
    });

    socket.on('newComment', ({ postId, comment }) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
        )
      );
    });

    socket.on('newReply', ({ postId, commentId, reply }) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, replies: [...(comment.replies || []), reply] }
                  : comment
              ),
            };
          }
          return post;
        })
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
                  [{ header: '1' }, { header: '2' }, { font: [] }],
                  [{ size: [] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
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
