import React, { useState, useEffect } from 'react';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://owlqr.com:3000/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data || []); // Ensure `users` is an array
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>All Wp Users</h1>
      {users && users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <p>Name: {user.display_name}</p>
              <p>Email: {user.user_email}</p>
              <p>Login: {user.user_login}</p>
              <p>ID: {user.ID}</p>
              <p>Registered: {new Date(user.user_registered).toLocaleDateString()}</p>
              <p>URL: <a href={user.user_url} target="_blank" rel="noopener noreferrer">{user.user_url}</a></p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default UsersPage;
