import React, { useState } from 'react';
import './home.css';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

function ResearcherDashboard({ onProjectsClick, onSequenceClick, onStorageClick, onSequenceTypeClick, onSampleListClick, onLogout }) {
    const { user } = useAuth();
    // State to control whether the sidebar panel drawer is open
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // Track the active dashboard body view content frame
    const [currentView, setCurrentView] = useState('overview');

    // Handle view switching inside the sidebar
    const handleViewChange = (viewId) => {
        setCurrentView(viewId);
        
        // Map the sidebar button selections back to your dashboard event triggers
        if (viewId === 'projects') onProjectsClick?.();
        if (viewId === 'sequence') onSequenceClick?.();
        if (viewId === 'storage') onStorageClick?.();
        if (viewId === 'samples' || viewId === 'sampleList') onSampleListClick?.();
        // Support both id variants used across the UI
        if (viewId === 'seq-types' || viewId === 'sequence-types') onSequenceTypeClick?.();
    };

    // Dummy placeholder handler for switching roles 
    const handleRoleSwitch = (newRole) => {
        console.log(`Switching session authorization layer context to: ${newRole}`);
    };

    return (
        <section className="home">
            {/* Embedded Reusable Sidebar Component Drawer Context Wrapper */}
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
                {/* Stack the button vertically on top of the text branding */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                    {/* Trigger Button positioned directly on top */}
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
                    
                </div>
            </div>
        </section>
    );
}

export default ResearcherDashboard;
