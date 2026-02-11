import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthLayout from '../components/layout/AuthLayout';
import { useRegister } from '../hooks/useAuth';
import usePageTitle from '../hooks/usePageTitle';

const RegisterPage = () => {
    usePageTitle('Register');
    const navigate = useNavigate();
    const registerMutation = useRegister();

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .min(2, 'Name must be at least 2 characters')
                .required('Full name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required'),
        }),
        onSubmit: (values) => {
            const { confirmPassword, ...registerData } = values;
            registerMutation.mutate(registerData, {
                onSuccess: () => {
                    alert('Registration successful! Please login.');
                    navigate('/login');
                },
            });
        },
    });

    return (
        <AuthLayout title="Create Account">
            <form onSubmit={formik.handleSubmit} aria-labelledby="auth-title" noValidate>
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
                        name="fullName"
                        className={`form-control ${formik.touched.fullName && formik.errors.fullName ? 'invalid' : ''}`}
                        required
                        autoComplete="name"
                        {...formik.getFieldProps('fullName')}
                        aria-required="true"
                        aria-invalid={formik.touched.fullName && !!formik.errors.fullName}
                        aria-describedby={formik.touched.fullName && formik.errors.fullName ? 'name-error' : undefined}
                        disabled={registerMutation.isPending}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                        <div id="name-error" className="error-text" role="alert">{formik.errors.fullName}</div>
                    )}
                </div>

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
                        disabled={registerMutation.isPending}
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
                        autoComplete="new-password"
                        {...formik.getFieldProps('password')}
                        aria-required="true"
                        aria-invalid={formik.touched.password && !!formik.errors.password}
                        aria-describedby={formik.touched.password && formik.errors.password ? 'password-error' : undefined}
                        disabled={registerMutation.isPending}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div id="password-error" className="error-text" role="alert">{formik.errors.password}</div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'invalid' : ''}`}
                        required
                        autoComplete="new-password"
                        {...formik.getFieldProps('confirmPassword')}
                        aria-required="true"
                        aria-invalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                        aria-describedby={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'confirm-password-error' : undefined}
                        disabled={registerMutation.isPending}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <div id="confirm-password-error" className="error-text" role="alert">{formik.errors.confirmPassword}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn"
                    disabled={registerMutation.isPending || !formik.isValid}
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
