import React, { useState, useEffect, useRef } from 'react';
import { MOCK_QUESTIONS } from '../utils/mockData';
import AccessibilityToolbar from '../components/common/AccessibilityToolbar';
import usePageTitle from '../hooks/usePageTitle';
import { useQuestions, useSubmitScore } from '../hooks/useGame';

const GamePage = () => {
    usePageTitle('MCQ Challenge');
    const [gameState, setGameState] = useState('intro'); // intro, playing, results
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    const headingRef = useRef(null);

    // API Integration
    const { data: apiQuestions, isLoading, isError, refetch } = useQuestions();
    const submitScoreMutation = useSubmitScore();

    // Use API questions if available, otherwise fallback to mock
    const questions = apiQuestions || MOCK_QUESTIONS;

    // Auto-focus heading when game state changes for screen readers
    useEffect(() => {
        if (headingRef.current) {
            headingRef.current.focus();
        }
    }, [gameState, currentIndex]);

    const startGame = () => {
        if (isError) {
            refetch(); // Try fetching again if it failed before
        }
        setGameState('playing');
        setCurrentIndex(0);
        setScore(0);
        setSelectedOption(null);
    };

    const handleOptionSelect = (index) => {
        setSelectedOption(index);
    };

    const nextQuestion = () => {
        const isCorrect = selectedOption === questions[currentIndex].correctAnswer;
        const newScore = isCorrect ? score + 1 : score;

        if (isCorrect) {
            setScore(newScore);
        }

        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
        } else {
            setGameState('results');
            // API call to submit final score
            submitScoreMutation.mutate({
                score: newScore,
                totalQuestions: questions.length,
                timestamp: new Date().toISOString()
            });
        }
    };

    const progress = ((currentIndex + 1) / questions.length) * 100;

    if (isLoading && gameState === 'playing') {
        return (
            <div className="auth-container">
                <main className="game-container game-intro" role="main">
                    <h1 ref={headingRef} tabIndex="-1">Loading Challenge...</h1>
                </main>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <a href="#game-content" className="skip-link">Skip to game content</a>

            <main id="game-content" className="game-container" role="main">
                {gameState === 'intro' && (
                    <div className="game-intro">
                        <h1 ref={headingRef} tabIndex="-1">Welcome to the Challenge</h1>
                        <p style={{ margin: '1.5rem 0', fontSize: '1.2rem' }}>
                            Test your knowledge with {questions.length} questions on Web Accessibility and React.
                        </p>
                        {isError && (
                            <div className="error-message" role="alert" style={{ marginBottom: '1.5rem' }}>
                                Note: Could not connect to the live quiz server. Playing in Offline Mode.
                            </div>
                        )}
                        <button className="btn" onClick={startGame} style={{ maxWidth: '200px' }}>
                            Enter Contest
                        </button>
                    </div>
                )}

                {gameState === 'playing' && (
                    <div className="question-card">
                        <div className="game-progress" aria-hidden="true">
                            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                        </div>

                        <span className="sr-only" aria-live="polite">
                            Question {currentIndex + 1} of {questions.length}
                        </span>

                        <h2 ref={headingRef} tabIndex="-1" className="question-text">
                            {questions[currentIndex].question}
                        </h2>

                        <div className="options-grid" role="radiogroup" aria-label="Answer options">
                            {questions[currentIndex].options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`option-btn ${selectedOption === index ? 'selected' : ''}`}
                                    onClick={() => handleOptionSelect(index)}
                                    aria-checked={selectedOption === index}
                                    role="radio"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        <button
                            className="btn"
                            onClick={nextQuestion}
                            disabled={selectedOption === null}
                        >
                            {currentIndex + 1 === questions.length ? 'Finish Challenge' : 'Next Question'}
                        </button>
                    </div>
                )}

                {gameState === 'results' && (
                    <div className="game-results">
                        <h1 ref={headingRef} tabIndex="-1">Challenge Completed!</h1>
                        <p style={{ fontSize: '1.2rem' }}>Your final score is:</p>
                        <div className="score-display" aria-label={`Score: ${score} out of ${questions.length}`}>
                            {score} / {questions.length}
                        </div>

                        {submitScoreMutation.isPending && (
                            <p aria-live="polite">Saving your score to the leaderboard...</p>
                        )}

                        <p style={{ marginBottom: '2rem' }}>
                            {score >= 7 ? "Amazing work! You're an accessibility pro." : "Good effort! Keep learning about inclusion."}
                        </p>
                        <button className="btn" onClick={() => setGameState('intro')} style={{ maxWidth: '200px' }}>
                            Play Again
                        </button>
                    </div>
                )}
            </main>

            <AccessibilityToolbar />
        </div>
    );
};

export default GamePage;
