import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import { useForgotPassword } from '../hooks/useAuth';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const forgotMutation = useForgotPassword();

    const handleSubmit = (e) => {
        e.preventDefault();
        forgotMutation.mutate(email, {
            onSuccess: () => {
                alert('Reset link sent! Please check your email.');
            },
        });
    };

    return (
        <AuthLayout title="Reset Password">
            <p style={{ marginBottom: '1.5rem' }}>
                Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} aria-labelledby="auth-title">
                {forgotMutation.isError && (
                    <div className="error-message" role="alert">
                        {forgotMutation.error?.response?.data?.message || 'Failed to send reset link.'}
                    </div>
                )}

                {forgotMutation.isSuccess && (
                    <div className="success-message" role="alert" style={{ color: 'green', marginBottom: '1rem' }}>
                        Check your email for the reset link!
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-required="true"
                        disabled={forgotMutation.isPending}
                    />
                </div>

                <button
                    type="submit"
                    className="btn"
                    disabled={forgotMutation.isPending}
                >
                    {forgotMutation.isPending ? 'Sending...' : 'Send Reset Link'}
                </button>

                <div className="auth-links">
                    <Link to="/login">Back to Login</Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;
