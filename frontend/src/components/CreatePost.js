import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreatePost() {
  const [description, setDescription] = useState(''); // État pour la description du post
  const [subject, setSubject] = useState(''); // État pour le sujet du post
  const [image, setImage] = useState(null); // État pour l'image du post
  const [subjects, setSubjects] = useState([]); // État pour la liste des sujets

  // Récupération des sujets existants depuis l'API
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('/api/subjects');
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects', error);
      }
    };

    fetchSubjects();
  }, []);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('description', description);
    formData.append('subject', subject);
    formData.append('image', image);

    try {
      await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Rediriger ou mettre à jour l'UI après la création réussie du post
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description" 
      />
      <select value={subject} onChange={(e) => setSubject(e.target.value)}>
        {subjects.map(sub => (
          <option key={sub.id} value={sub.id}>{sub.name}</option>
        ))}
      </select>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Create Post</button>
    </form>
  );
}

export default CreatePost;
