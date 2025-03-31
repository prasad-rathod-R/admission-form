import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../AuthService';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterComponent = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user');  // Default to 'user'
    const [password, setPassword] = useState('');
    const [modalMessage, setModalMessage] = useState(''); // For modal message
    const [modalType, setModalType] = useState(''); // 'success' or 'error'
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Clear any previous message before submitting
        setModalMessage('');
        setModalType('');

        // Form validation
        if (!username || !email || !password) {
            setModalMessage('All fields are required!');
            setModalType('error');
            return;
        }

        try {
            // Sending data to the backend using AuthService
            const response = await AuthService.register({ username, role: [role], email, password });
            console.log('Backend Response:', response); // Log the response for debugging

            // Handle success response from backend
            if (response.data && response.data.message === 'User registered successfully!') {
                setModalMessage('User registered successfully!');
                setModalType('success');
                navigate('/login');  // Redirect to login page after success
            } else {
                // Handle any unexpected message structure from the backend
                setModalMessage('Registration failed. Please try again.');
                setModalType('error');
            }
        } catch (error) {
            // Handle API errors (network issues, server down, etc.)
            let errorMsg = 'An error occurred during registration.';
            if (error.response) {
                // If backend response exists, display error message from the backend
                errorMsg = error.response?.data?.message || errorMsg;
            }
            setModalMessage(errorMsg);
            setModalType('error');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Registration</div>
                        <div className="card-body">
                            <form onSubmit={handleRegister}>
                                <div className="form-group">
                                    <label>User Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Role</label>
                                    <select
                                        className="form-control"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">Register</button>
                            </form>

                            <div className="mt-3">
                                <span>Already registered? <Link to="/login">Login here</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bootstrap Modal for Success/Error */}
            <div className={`modal fade show ${modalMessage ? 'd-block' : ''}`} tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className={`modal-header ${modalType === 'error' ? 'bg-danger text-white' : 'bg-success text-white'}`}>
                            <h5 className="modal-title">{modalType === 'error' ? 'Error' : 'Success'}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setModalMessage('')}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{modalMessage}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setModalMessage('')}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;
