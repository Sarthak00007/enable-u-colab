import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
    const [highContrast, setHighContrast] = useState(false);
    const [fontScale, setFontScale] = useState(1);

    useEffect(() => {
        document.documentElement.setAttribute('data-high-contrast', highContrast);
    }, [highContrast]);

    useEffect(() => {
        document.documentElement.style.setProperty('--scale-factor', fontScale);
    }, [fontScale]);

    const toggleHighContrast = () => setHighContrast(prev => !prev);

    const increaseFontSize = () => {
        setFontScale(prev => Math.min(prev + 0.2, 2));
    };

    const decreaseFontSize = () => {
        setFontScale(prev => Math.max(prev - 0.2, 1));
    };

    const resetAccessibility = () => {
        setHighContrast(false);
        setFontScale(1);
    };

    return (
        <AccessibilityContext.Provider value={{
            highContrast,
            toggleHighContrast,
            fontScale,
            increaseFontSize,
            decreaseFontSize,
            resetAccessibility
        }}>
            {children}
        </AccessibilityContext.Provider>
    );
};

export const useAccessibility = () => {
    const context = useContext(AccessibilityContext);
    if (!context) {
        throw new Error('useAccessibility must be used within an AccessibilityProvider');
    }
    return context;
};
