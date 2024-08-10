import React, { useState } from 'react';
import axios from 'axios';

function Post({ post }) {
    const [likes, setLikes] = useState(post.likes);

    const handleLike = () => {
        axios.post(`/api/posts/${post.id}/like`)
            .then(response => setLikes(likes + 1))
            .catch(error => console.error('Error liking post:', error));
    };

    return (
        <div className="post">
            <p>{post.text}</p>
            <div className="likes" onClick={handleLike}>
                <span role="img" aria-label="like">👍</span> {likes}
            </div>
        </div>
    );
}

export default Post;
