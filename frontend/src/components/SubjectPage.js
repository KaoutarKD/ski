// SubjectPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SubjectPage = () => {
  const [posts, setPosts] = useState([]);
  const { subject } = useParams();

  useEffect(() => {
    axios.get(`URL_BACKEND/subjects/${subject}/posts`)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des posts du sujet", error);
      });
  }, [subject]);

  return (
    <div>
      <h1>Posts sur {subject}</h1>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <img src={post.imageUrl} alt={post.title} />
          <p>{post.description}</p>
          <p>{post.likes} Likes</p>
        </div>
      ))}
    </div>
  );
};

export default SubjectPage;
