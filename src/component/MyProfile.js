import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyProfile() {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8081/api/user/profile")
      .then(res => setProfile(res.data))
      .catch(err => setError("Failed to fetch profile"));
  }, []);

  return (
    <div className="container mt-5">
      <h2>My Profile</h2>

      {error && (
        <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
          <i className="bi bi-x-circle-fill fs-5"></i>
          {error}
        </div>
      )}

      {!error && (
        <ul className="list-group mt-3">
          <li className="list-group-item"><strong>Username:</strong> {profile.username}</li>
          <li className="list-group-item"><strong>Email:</strong> {profile.email}</li>
          <li className="list-group-item"><strong>Role:</strong> {profile.role?.join(', ')}</li>
        </ul>
      )}
    </div>
  );
}
