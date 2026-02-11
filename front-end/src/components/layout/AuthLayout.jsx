import React, { useEffect, useRef } from 'react';
import AccessibilityToolbar from '../common/AccessibilityToolbar';

const AuthLayout = ({ children, title }) => {
    const titleRef = useRef(null);

    useEffect(() => {
        // Focus the title on page load for screen reader context
        if (titleRef.current) {
            titleRef.current.focus();
        }
    }, [title]);

    return (
        <div className="auth-container">
            <a href="#main-content" className="skip-link">Skip to main content</a>

            <main id="main-content" className="auth-card" role="main">
                <h1
                    id="auth-title"
                    ref={titleRef}
                    tabIndex="-1"
                    style={{ outline: 'none' }}
                >
                    {title}
                </h1>
                <div aria-live="polite" className="sr-only">
                    {`Currently on ${title} page`}
                </div>
                {children}
            </main>

            <AccessibilityToolbar />
        </div>
    );
};

export default AuthLayout;
