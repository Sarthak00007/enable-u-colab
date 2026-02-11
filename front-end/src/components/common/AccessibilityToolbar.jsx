import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';

const AccessibilityToolbar = () => {
    const { toggleHighContrast, increaseFontSize, decreaseFontSize, resetAccessibility } = useAccessibility();

    return (
        <div className="a11y-toolbar" role="region" aria-label="Accessibility Tools">
            <button
                className="a11y-btn"
                onClick={decreaseFontSize}
                aria-label="Decrease font size"
                title="Decrease font size"
            >
                A-
            </button>
            <button
                className="a11y-btn"
                onClick={increaseFontSize}
                aria-label="Increase font size"
                title="Increase font size"
            >
                A+
            </button>
            <button
                className="a11y-btn"
                onClick={toggleHighContrast}
                aria-label="Toggle High Contrast Mode"
                title="High Contrast"
            >
                ◐
            </button>
            <button
                className="a11y-btn"
                onClick={resetAccessibility}
                aria-label="Reset accessibility settings"
                title="Reset"
            >
                ↺
            </button>
        </div>
    );
};

export default AccessibilityToolbar;
