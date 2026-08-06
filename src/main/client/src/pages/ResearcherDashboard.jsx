import React, { useState } from 'react';
import './home.css';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

function ResearcherDashboard({ onProjectsClick, onAddProjectClick, onSequenceClick, onStorageClick, onLogout, onSequenceTypeClick, onSampleListClick, onResearchersClick }) {
    const { user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentView, setCurrentView] = useState('overview');

    const handleViewChange = (viewId) => {
        setCurrentView(viewId);

        if (viewId === 'researchers') onResearchersClick?.();
        if (viewId === 'projects') onProjectsClick?.();
        if (viewId === 'samples' || viewId === 'sampleList') onSampleListClick?.();
        if (viewId === 'storage') onStorageClick?.();
        if (viewId === 'sequence') onSequenceClick?.();
        if (viewId === 'seq-types' || viewId === 'sequence-types') onSequenceTypeClick?.();
    };

    const handleRoleSwitch = (newRole) => {
        console.log(`Switching session authorization layer context to: ${newRole}`);
    };

    return (
        <section className="home">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                currentRole="researcher"
                onRoleSwitch={handleRoleSwitch}
                currentView={currentView}
                onViewChange={handleViewChange}
                onLogout={onLogout}
            />

            <header className="home__topbar">
                <div className="home__header-left">
                    <button
                        type="button"
                        className="home__menu-toggle-btn"
                        onClick={() => setIsSidebarOpen(true)}
                        aria-label="Toggle navigation menu"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                    <div className="home__brand-group">
                        <h2 className="home__brand">BioVault</h2>
                        <span className="home__brand-copy">Researcher Dashboard{user?.name ? ` — ${user.name}` : ''}</span>
                    </div>
                </div>
                <div className="home__nav-actions">
                    <button type="button" className="home__primary-button" onClick={onLogout}>Logout</button>
                </div>
            </header>

            <div className="home__hero">
                <div className="home__hero-copy">
                    <p className="home__eyebrow">Welcome back{user?.name ? `, ${user.name}` : ''}</p>
                    <h1>Manage your research projects, samples, and sequences.</h1>
                    <p className="home__lead">
                        Use the shortcuts above to jump into your active work.
                    </p>
                    <div className="home__cta-row">
                        <button type="button" className="home__primary-button" onClick={onAddProjectClick}>+ Add Project</button>
                    </div>

                </div>

                <div className="home__feature-panel">
                    <article className="home__feature-card">
                        <p>Your workspace</p>
                        <h2>What you can do here</h2>
                        <ul>
                            <li>Create and manage your research projects</li>
                            <li>Track biological samples with full metadata</li>
                            <li>Store DNA, RNA, and protein sequences securely</li>
                            <li>Map samples to exact storage locations</li>
                        </ul>
                    </article>
                    <article className="home__feature-card home__feature-card--soft">
                        <p>Built for researchers</p>
                        <h2>Pre-computational data organisation</h2>
                        <span>Sequence lengths are calculated automatically so you can focus on the science, not the bookkeeping.</span>
                    </article>
                </div>
            </div>

            <section className="home__highlights">
                <button type="button" className="home__highlight-card home__highlight-button" onClick={onProjectsClick}>
                    <div className="home__highlight-header">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="home__highlight-icon">
                            <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55A1 1 0 0 0 5.58 22h12.84a1 1 0 0 0 .86-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
                            <path d="M8.5 2h7" />
                            <path d="M7 16h10" />
                        </svg>
                        <h3>My Projects</h3>
                    </div>
                    <p>Browse all your research projects, add new ones, and navigate to their associated samples and sequences.</p>
                </button>
                <button type="button" className="home__highlight-card home__highlight-button" onClick={onSampleListClick}>
                    <div className="home__highlight-header">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="home__highlight-icon">
                            <path d="M6 18h8" />
                            <path d="M3 22h18" />
                            <path d="M14 22a7 7 0 1 0-14 0" />
                            <path d="M9 14l2-2" />
                            <path d="M12 6l3 3-6.5 6.5a2.12 2.12 0 0 1-3 0 2.12 2.12 0 0 1 0-3L12 6z" />
                            <path d="M15 3l3 3" />
                        </svg>
                        <h3>Sample Tracking</h3>
                    </div>
                    <p>Log species types, collection timelines, and map exact repository links back to your active research projects.</p>
                </button>
                <button type="button" className="home__highlight-card home__highlight-button" onClick={onSequenceClick}>
                    <div className="home__highlight-header">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="home__highlight-icon">
                            <path d="M2 15c6.667-6 13.333 0 20-6" />
                            <path d="M2 9c6.667 6 13.333 0 20 6" />
                            <path d="M6 12v3" />
                            <path d="M10 9.5v5" />
                            <path d="M14 9.5v5" />
                            <path d="M18 9v3" />
                        </svg>
                        <h3>Sequences</h3>
                    </div>
                    <p>Store nucleic acid and protein strings securely alongside auto-calculated metrics ready for downstream tools.</p>
                </button>
            </section>
        </section>
    );
}

export default ResearcherDashboard;
