// UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Remplacez 'URL_BACKEND' par l'URL de votre API
    axios.get('URL_BACKEND/user')
      .then(response => {
        setUser(response.data.user);
        setPosts(response.data.posts);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des informations de l'utilisateur", error);
      });
  }, []);

  return (
    <div>
      <h1>Profil de {user.username}</h1>
      {/* Formulaire pour modifier les informations de l'utilisateur */}
      <div>
        <h2>Mes Posts</h2>
        {posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <img src={post.imageUrl} alt={post.title} />
            <p>{post.description}</p>
            <p>{post.likes} Likes</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
