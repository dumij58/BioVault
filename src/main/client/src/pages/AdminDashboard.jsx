import React, { useState } from 'react';
import './home.css';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

function AdminDashboard({ onInstitutionsClick, onProjectsClick, onSequenceClick, onStorageClick, onLogout, onSequenceTypeClick, onSampleListClick }) {
    const { user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentView, setCurrentView] = useState('overview');

    const handleViewChange = (viewId) => {
        setCurrentView(viewId);

        if (viewId === 'institutions') onInstitutionsClick?.();
        if (viewId === 'projects') onProjectsClick?.();
        if (viewId === 'sequence') onSequenceClick?.();
        if (viewId === 'storage') onStorageClick?.();
        if (viewId === 'samples' || viewId === 'sampleList') onSampleListClick?.();
        if (viewId === 'sequence-types' || viewId === 'seq-types') onSequenceTypeClick?.();
    };

    const handleRoleSwitch = (newRole) => {
        console.log(`Switching session authorization layer context to: ${newRole}`);
    };

    return (
        <section className="home">

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                currentRole="admin"
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
                        <span className="home__brand-copy">Admin Dashboard{user?.name ? ` — ${user.name}` : ''}</span>
                    </div>
                </div>
                <div className="home__nav-actions">
                    <button type="button" className="home__primary-button" onClick={onLogout}>Logout</button>
                </div>
            </header>

            <div className="home__hero">
                <div className="home__hero-copy">
                    <p className="home__eyebrow">Administration</p>
                    <h1>Oversee institutions and repository-wide research data.</h1>
                    <p className="home__lead">
                        Monitor every project, researcher, sample, and biological sequence from one central control panel.
                    </p>
                    <div className="home__cta-row">
                        <button type="button" className="home__primary-button" onClick={onInstitutionsClick}>Institutions</button>
                        <button type="button" className="home__ghost-button" onClick={onProjectsClick}>Projects</button>
                        <button type="button" className="home__ghost-button" onClick={onSampleListClick}>Samples</button>
                        <button type="button" className="home__ghost-button" onClick={onSequenceClick}>Sequences</button>
                        <button type="button" className="home__ghost-button" onClick={onSequenceTypeClick}>Sequence Types</button>
                        <button type="button" className="home__ghost-button" onClick={onStorageClick}>Storage Locations</button>
                    </div>

                </div>

                <div className="home__feature-panel">
                    <article className="home__feature-card">
                        <p>Platform overview</p>
                        <h2>Administrative Modules</h2>
                        <ul>
                            <li>Manage collaborating institutions and their researchers</li>
                            <li>Oversee all research projects repository-wide</li>
                            <li>Review biological samples and storage locations</li>
                            <li>Configure sequence types and metadata</li>
                        </ul>
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
                        <h3>Projects</h3>
                    </div>
                    <p>Browse and manage all active research projects across every institution in the repository.</p>
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
                        <h3>Samples</h3>
                    </div>
                    <p>Track species types, collection timelines, and map exact repository links back to active research projects.</p>
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
                    <p>Store nucleic acid and protein strings securely alongside auto-calculated metrics for downstream tools.</p>
                </button>
            </section>
        </section>
    );
}

export default AdminDashboard;
