import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Remplacez 'URL_BACKEND' par l'URL de votre API
    axios.get('URL_BACKEND/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur!", error);
      });
  }, []);

  return (
    <div>
      <h1>Feed</h1>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <img src={post.imageUrl} alt={post.title} />
          <p>{post.description}</p>
          <Link to={`/s/${post.subject}`}>#{post.subject}</Link>
          <p>{post.likes} Likes</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
