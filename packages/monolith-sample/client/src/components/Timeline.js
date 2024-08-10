import React from 'react';
import Post from './Post';

function Timeline({ posts }) {
  return (
    <div className="timeline">
      <h2>Timeline</h2>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Timeline;
