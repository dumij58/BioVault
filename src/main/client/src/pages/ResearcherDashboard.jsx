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

            <header className="home__topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                    <button 
                        type="button" 
                        className="home__menu-toggle-btn"
                        onClick={() => setIsSidebarOpen(true)}
                        style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'inherit', padding: 0 }}
                    >
                        ☰
                    </button>
                    <div>
                        <p className="home__brand">BioVault</p>
                        <span className="home__brand-copy">Researcher Dashboard{user?.name ? ` — ${user.name}` : ''}</span>
                    </div>
                </div>
                <div className="home__nav-actions">
                    <button type="button" className="home__primary-button" onClick={onLogout}>Logout</button>
                </div>
            </header>

            <div className="home__hero">
                <div className="home__hero-copy">
                    <p className="home__eyebrow">Welcome back</p>
                    <h1>Manage your research projects, samples, and sequences.</h1>
                    <p className="home__lead">
                        Use the shortcuts above to jump into your active work.
                    </p>
                    <div className="home__cta-row">
                        <button type="button" className="home__primary-button" onClick={onAddProjectClick}>+ Add Project</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ResearcherDashboard;
