import React, { useState } from 'react';
import axios from '../api/posts';
import { getAuthToken } from '../utils/auth';

const PostForm = () => {
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('description', description);
    formData.append('subject', subject);
    formData.append('image', image);

    axios.post('/posts', formData, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
      .then(response => {
        console.log(response.data);
        setDescription('');
        setSubject('');
        setImage(null);
      })
      .catch(error => {
        console.error('There was an error creating the post!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default PostForm;
