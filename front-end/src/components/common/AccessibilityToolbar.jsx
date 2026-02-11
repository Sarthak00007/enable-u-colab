import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';

const AccessibilityToolbar = () => {
    const {
        toggleHighContrast, highContrast,
        increaseFontSize, decreaseFontSize, fontScale,
        toggleDyslexicFont, dyslexicFont,
        toggleReducedMotion, reducedMotion,
        toggleLargeCursor, largeCursor,
        resetAccessibility
    } = useAccessibility();

    const [announcement, setAnnouncement] = useState('');
    const [toastKey, setToastKey] = useState(0);

    const announce = (msg) => {
        setAnnouncement(msg);
        setToastKey(prev => prev + 1);

        // Auto-clear after toast animation (3s)
        setTimeout(() => {
            setAnnouncement('');
        }, 3000);
    };

    const handleContrast = () => {
        toggleHighContrast();
        announce(`High contrast mode ${!highContrast ? 'enabled' : 'disabled'}`);
    };

    const handleDyslexic = () => {
        toggleDyslexicFont();
        announce(`Dyslexic font ${!dyslexicFont ? 'enabled' : 'disabled'}`);
    };

    const handleMotion = () => {
        toggleReducedMotion();
        announce(`Reduced motion ${!reducedMotion ? 'enabled' : 'disabled'}`);
    };

    const handleCursor = () => {
        toggleLargeCursor();
        announce(`Large cursor ${!largeCursor ? 'enabled' : 'disabled'}`);
    };

    const handleReset = () => {
        resetAccessibility();
        announce('Settings reset to default');
    };

    return (
        <div className="a11y-toolbar" role="region" aria-label="Accessibility settings">
            {announcement && (
                <div
                    key={toastKey}
                    aria-live="assertive"
                    className="a11y-toast"
                >
                    {announcement}
                </div>
            )}

            <button
                className="a11y-btn"
                onClick={() => { decreaseFontSize(); announce('Font size decreased'); }}
                aria-label="Decrease font size"
                title="Decrease font size"
            >
                A-
            </button>
            <button
                className="a11y-btn"
                onClick={() => { increaseFontSize(); announce('Font size increased'); }}
                aria-label="Increase font size"
                title="Increase font size"
            >
                A+
            </button>
            <button
                className={`a11y-btn ${dyslexicFont ? 'active' : ''}`}
                onClick={handleDyslexic}
                aria-label="Toggle Dyslexic Font"
                title="Dyslexic Font"
            >
                D
            </button>
            <button
                className={`a11y-btn ${reducedMotion ? 'active' : ''}`}
                onClick={handleMotion}
                aria-label="Toggle Reduced Motion"
                title="Reduced Motion"
            >
                ≋
            </button>
            <button
                className={`a11y-btn ${largeCursor ? 'active' : ''}`}
                onClick={handleCursor}
                aria-label="Toggle Large Cursor"
                title="Large Cursor"
            >
                ➚
            </button>
            <button
                className={`a11y-btn ${highContrast ? 'active' : ''}`}
                onClick={handleContrast}
                aria-label="Toggle High Contrast"
                title="High Contrast"
            >
                ◐
            </button>
            <button
                className="a11y-btn"
                onClick={handleReset}
                aria-label="Reset all settings"
                title="Reset"
            >
                ↺
            </button>
        </div>
    );
};

export default AccessibilityToolbar;
