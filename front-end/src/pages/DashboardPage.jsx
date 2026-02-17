import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStats, useLeaderboard } from '../hooks/useAuth';
import AccessibilityToolbar from '../components/common/AccessibilityToolbar';
import usePageTitle from '../hooks/usePageTitle';

const DashboardPage = () => {
    usePageTitle('Dashboard');
    const navigate = useNavigate();
    const { data: stats, isLoading: statsLoading, isError: statsError } = useStats();
    const { data: leaderboard, isLoading: lbLoading, isError: lbError } = useLeaderboard();

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const headingRef = useRef(null);

    useEffect(() => {
        if (headingRef.current) {
            headingRef.current.focus();
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Fallback data for API-ready demo
    const displayStats = stats || {
        gamesPlayed: 12,
        totalScore: 84,
        avgScore: 7.0,
        rank: 42
    };

    const displayLeaderboard = leaderboard || [
        { id: 1, name: 'AccessibilityPro', score: 98 },
        { id: 2, name: 'ReactWizard', score: 95 },
        { id: 3, name: 'InclusionHero', score: 92 },
        { id: 4, name: 'WebWarrior', score: 88 }
    ];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="welcome-section">
                    <h1 ref={headingRef} tabIndex="-1">Welcome back, {user.fullName || 'User'}!</h1>
                    <p>Track your progress and climb the leaderboard.</p>
                </div>
                <button className="btn" onClick={handleLogout} style={{ width: 'auto', padding: '0.5rem 1.5rem' }}>
                    Logout
                </button>
            </header>

            <section className="stats-grid" aria-label="Performance Statistics">
                <div className="stat-card">
                    <span className="stat-value">{displayStats.gamesPlayed}</span>
                    <span className="stat-label">Games Played</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{displayStats.totalScore}</span>
                    <span className="stat-label">Total Score</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{displayStats.avgScore}</span>
                    <span className="stat-label">Avg. Score</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">#{displayStats.rank}</span>
                    <span className="stat-label">Global Rank</span>
                </div>
            </section>

            <div className="dashboard-sections">
                <section className="leaderboard-section">
                    <h2>Leaderboard</h2>
                    <ul className="leaderboard-list">
                        {displayLeaderboard.map((player, index) => (
                            <li key={player.id} className={`leaderboard-item rank-${index + 1}`}>
                                <div className="rank-badge">{index + 1}</div>
                                <div className="user-info">
                                    <span className="user-name">{player.name}</span>
                                </div>
                                <span className="user-score">{player.score}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <aside className="action-section">
                    <div className="game-promo-card">
                        <h2>Ready to Play?</h2>
                        <p>Challenge yourself with a new round of accessibility questions.</p>
                        <button className="btn" onClick={() => navigate('/game')}>
                            Start New Game
                        </button>
                    </div>
                </aside>
            </div>

            <AccessibilityToolbar />
        </div>
    );
};

export default DashboardPage;
