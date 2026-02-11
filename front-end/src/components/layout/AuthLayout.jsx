import React from 'react';
import AccessibilityToolbar from '../common/AccessibilityToolbar';

const AuthLayout = ({ children, title }) => {
    return (
        <div className="auth-container">
            <a href="#main-content" className="skip-link">Skip to main content</a>

            <main id="main-content" className="auth-card">
                <h1 id="auth-title">{title}</h1>
                {children}
            </main>

            <AccessibilityToolbar />
        </div>
    );
};

export default AuthLayout;
