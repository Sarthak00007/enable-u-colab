import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthLayout from '../components/layout/AuthLayout';
import { useLogin } from '../hooks/useAuth';

const LoginPage = () => {
    const navigate = useNavigate();
    const loginMutation = useLogin();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
        }),
        onSubmit: (values) => {
            loginMutation.mutate(values, {
                onSuccess: () => {
                    navigate('/dashboard');
                },
            });
        },
    });

    return (
        <AuthLayout title="Login">
            <form onSubmit={formik.handleSubmit} aria-labelledby="auth-title" noValidate>
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
                        name="email"
                        className={`form-control ${formik.touched.email && formik.errors.email ? 'invalid' : ''}`}
                        required
                        autoComplete="email"
                        {...formik.getFieldProps('email')}
                        aria-required="true"
                        aria-invalid={formik.touched.email && !!formik.errors.email}
                        aria-describedby={formik.touched.email && formik.errors.email ? 'email-error' : undefined}
                        disabled={loginMutation.isPending}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div id="email-error" className="error-text" role="alert">{formik.errors.email}</div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={`form-control ${formik.touched.password && formik.errors.password ? 'invalid' : ''}`}
                        required
                        autoComplete="current-password"
                        {...formik.getFieldProps('password')}
                        aria-required="true"
                        aria-invalid={formik.touched.password && !!formik.errors.password}
                        aria-describedby={formik.touched.password && formik.errors.password ? 'password-error' : undefined}
                        disabled={loginMutation.isPending}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div id="password-error" className="error-text" role="alert">{formik.errors.password}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn"
                    disabled={loginMutation.isPending || !formik.isValid}
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
