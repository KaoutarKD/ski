import React, { useEffect, useState } from 'react';
import axios from '../api/posts';
import { getAuthToken } from '../utils/auth';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = getAuthToken();
    axios.get('/notifications', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the notifications!', error);
      });
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      {notifications.map(notification => (
        <div key={notification.id}>
          <p>{notification.type}: {notification.data}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
