import React, { useState } from 'react';
import ReactQuill from 'react-quill';  // Import the rich-text editor
import 'react-quill/dist/quill.snow.css';  // Styles for the editor
import './PostCreation.css';

const PostCreation: React.FC = () => {
  const [postContent, setPostContent] = useState('');

  const handleChange = (value: string) => {
    setPostContent(value);  // Update content as user types
  };

  const handleSubmit = () => {
    console.log('Post content:', postContent);
    // Here you can send the post content to the backend
  };

  return (
    <div className="post-creation-container">
      <h2>Create a Post</h2>
      <ReactQuill
        value={postContent}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['link'],
            ['blockquote'],
            [{ 'align': [] }],
            ['image', 'video'],
          ],
        }}
      />
      <button onClick={handleSubmit} className="button">Post</button>
    </div>
  );
};

export default PostCreation;
