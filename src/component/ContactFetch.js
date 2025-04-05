import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactFetch = () => {
  const [contactData, setContactData] = useState(null);
  const [error, setError] = useState('');

  const token = localStorage.getItem("token");


  useEffect(() => {
    axios.get('http://localhost:8081/contact',{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setContactData(response.data);
      })
      .catch(error => {
        console.error('Error fetching contact data:', error);
        setError('Failed to fetch contact information.');
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Contact Information</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {contactData ? (
        <pre className="bg-light p-3 rounded">{JSON.stringify(contactData, null, 2)}</pre>
      ) : (
        <p>Loading contact details...</p>
      )}
    </div>
  );
};

export default ContactFetch;
