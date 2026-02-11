import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthLayout from '../components/layout/AuthLayout';
import { useForgotPassword } from '../hooks/useAuth';
import usePageTitle from '../hooks/usePageTitle';

const ForgotPasswordPage = () => {
    usePageTitle('Reset Password');
    const forgotMutation = useForgotPassword();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
        }),
        onSubmit: (values) => {
            forgotMutation.mutate(values.email);
        },
    });

    return (
        <AuthLayout title="Reset Password">
            <p style={{ marginBottom: '1.5rem' }}>
                Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={formik.handleSubmit} aria-labelledby="auth-title" noValidate>
                {forgotMutation.isError && (
                    <div className="error-message" role="alert">
                        {forgotMutation.error?.response?.data?.message || 'Failed to send reset link.'}
                    </div>
                )}

                {forgotMutation.isSuccess && (
                    <div className="success-message" role="alert">
                        Check your email for the reset link!
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
                        disabled={forgotMutation.isPending}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div id="email-error" className="error-text" role="alert">{formik.errors.email}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn"
                    disabled={forgotMutation.isPending || !formik.isValid}
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
