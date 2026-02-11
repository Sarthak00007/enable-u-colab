import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import { useRegister } from '../hooks/useAuth';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });
    const registerMutation = useRegister();

    const handleSubmit = (e) => {
        e.preventDefault();
        registerMutation.mutate(formData, {
            onSuccess: () => {
                alert('Registration successful! Please login.');
                navigate('/login');
            },
            onError: (error) => {
                console.error('Registration failed:', error);
            }
        });
    };

    return (
        <AuthLayout title="Create Account">
            <form onSubmit={handleSubmit} aria-labelledby="auth-title">
                {registerMutation.isError && (
                    <div className="error-message" role="alert">
                        {registerMutation.error?.response?.data?.message || 'Registration failed. Please try again.'}
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        className="form-control"
                        required
                        autoComplete="name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        aria-required="true"
                        disabled={registerMutation.isPending}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        aria-required="true"
                        disabled={registerMutation.isPending}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        required
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        aria-required="true"
                        disabled={registerMutation.isPending}
                    />
                </div>

                <button
                    type="submit"
                    className="btn"
                    disabled={registerMutation.isPending}
                >
                    {registerMutation.isPending ? 'Registering...' : 'Register'}
                </button>

                <div className="auth-links">
                    <Link to="/login">Already have an account? Login</Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default RegisterPage;
