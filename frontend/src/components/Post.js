// src/components/Post.js
import React from 'react';

const Post = ({ post, onLike }) => {
  return (
    <div className="post">
      <h2>{post.description}</h2>
      <img src={`http://localhost:8000/storage/${post.image_path}`} alt={post.description} />
      <p>{post.likes} likes</p>
      <button onClick={() => onLike(post.id)}>Like</button>
    </div>
  );
};

export default Post;
