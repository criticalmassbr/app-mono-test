import React, { useState } from 'react';
import axios from 'axios';

function PostForm({ onPostCreated }) {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;

    try {
      const response = await axios.post('/api/posts', { text });
      setText('');
      if (onPostCreated) {
        onPostCreated(response.data);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
        rows="3"
      ></textarea>
      <button type="submit">Post</button>
    </form>
  );
}

export default PostForm;
