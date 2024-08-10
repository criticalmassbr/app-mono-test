import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Timeline from '../components/Timeline';
import PostForm from '../components/PostForm';

function TimelinePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/posts')
        .then(response => setPosts(response.data))
        .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
      <div className="timeline-page">
        <Link to="/profile" className="profile-link">Go to Profile</Link>
        <PostForm onPostCreated={handlePostCreated} />
        <Timeline posts={posts} />
      </div>
  );
}

export default TimelinePage;
