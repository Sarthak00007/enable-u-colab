import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import { useLogin } from '../hooks/useAuth';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const loginMutation = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutate(formData, {
            onSuccess: () => {
                navigate('/dashboard'); // or wherever you want to redirect
            },
            onError: (error) => {
                console.error('Login failed:', error);
            }
        });
    };

    return (
        <AuthLayout title="Login">
            <form onSubmit={handleSubmit} aria-labelledby="auth-title">
                {loginMutation.isError && (
                    <div className="error-message" role="alert">
                        {loginMutation.error?.response?.data?.message || 'Invalid email or password'}
                    </div>
                )}

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
                        disabled={loginMutation.isPending}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        required
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        aria-required="true"
                        disabled={loginMutation.isPending}
                    />
                </div>

                <button
                    type="submit"
                    className="btn"
                    disabled={loginMutation.isPending}
                >
                    {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
                </button>

                <div className="auth-links">
                    <Link to="/register">Don't have an account? Register</Link>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default LoginPage;
