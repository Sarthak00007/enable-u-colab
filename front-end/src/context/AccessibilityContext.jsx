import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

const AccessibilityProvider = ({ children }) => {
    const [highContrast, setHighContrast] = useState(false);
    const [fontScale, setFontScale] = useState(1);
    const [dyslexicFont, setDyslexicFont] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [largeCursor, setLargeCursor] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-high-contrast', highContrast);
    }, [highContrast]);

    useEffect(() => {
        document.documentElement.style.setProperty('--scale-factor', fontScale);
    }, [fontScale]);

    useEffect(() => {
        document.documentElement.setAttribute('data-dyslexic', dyslexicFont);
    }, [dyslexicFont]);

    useEffect(() => {
        document.documentElement.setAttribute('data-reduced-motion', reducedMotion);
    }, [reducedMotion]);

    useEffect(() => {
        document.documentElement.setAttribute('data-large-cursor', largeCursor);
    }, [largeCursor]);

    const toggleHighContrast = () => setHighContrast(prev => !prev);
    const toggleDyslexicFont = () => setDyslexicFont(prev => !prev);
    const toggleReducedMotion = () => setReducedMotion(prev => !prev);
    const toggleLargeCursor = () => setLargeCursor(prev => !prev);

    const increaseFontSize = () => setFontScale(prev => Math.min(prev + 0.2, 2.4));
    const decreaseFontSize = () => setFontScale(prev => Math.max(prev - 0.2, 0.8));

    const resetAccessibility = () => {
        setHighContrast(false);
        setFontScale(1);
        setDyslexicFont(false);
        setReducedMotion(false);
        setLargeCursor(false);
    };

    return (
        <AccessibilityContext.Provider value={{
            highContrast, toggleHighContrast,
            fontScale, increaseFontSize, decreaseFontSize,
            dyslexicFont, toggleDyslexicFont,
            reducedMotion, toggleReducedMotion,
            largeCursor, toggleLargeCursor,
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
