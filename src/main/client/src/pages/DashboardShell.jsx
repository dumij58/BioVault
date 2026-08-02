import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import SequenceTypePage from './SequenceTypePage';
import StorageLocation from './storageLocation';
import './DashboardShell.css';

export default function DashboardShell({
  isOpen = false,
  onClose,
  currentRole = 'researcher',
  onRoleSwitch,
  currentView = 'overview',
  onViewChange,
  onLogout,
  onOpenMenu,
  onGoHome,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(Boolean(isOpen));

  useEffect(() => {
    setSidebarOpen(Boolean(isOpen));
  }, [isOpen]);

  const closeSidebar = () => {
    setSidebarOpen(false);
    if (onClose) onClose();
  };

  const openSidebar = () => {
    setSidebarOpen(true);
    if (onOpenMenu) onOpenMenu();
  };

  const isAdmin = currentRole === 'admin';

  const renderOverview = () => (
    <div className="dash-grid">
      <div className={`dash-card dash-card--hero ${isAdmin ? 'admin-gradient' : ''}`}>
        <span className="dash-card__eyebrow">{isAdmin ? 'System operations' : 'Research workspace'}</span>
        <h3>{isAdmin ? 'Administrative command center' : 'Research collaboration hub'}</h3>
        <p>
          {isAdmin
            ? 'Monitor system health, manage the registry, and oversee storage operations from one workspace.'
            : 'Review sequence classifications, manage your projects, and keep your research records in sync.'}
        </p>
      </div>
      <div className="dash-subgrid">
        <div className="dash-stat">
          <strong>{isAdmin ? '12' : '4'}</strong>
          <span>{isAdmin ? 'Active modules' : 'Open projects'}</span>
        </div>
        <div className="dash-stat">
          <strong>{isAdmin ? '98%' : '76%'}</strong>
          <span>{isAdmin ? 'System readiness' : 'Data completeness'}</span>
        </div>
        <div className="dash-stat">
          <strong>{isAdmin ? '24/7' : 'Live'}</strong>
          <span>{isAdmin ? 'Operational monitoring' : 'Research activity'}</span>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'seq-types':
        return <SequenceTypePage onGoHome={onGoHome || onLogout} />;
      case 'storage-locs':
        return <StorageLocation onGoHome={onGoHome || onLogout} />;
      case 'users':
        return (
          <div className="dash-card">
            <h3>User management</h3>
            <p>Admin controls for role assignment and access policies will appear here.</p>
          </div>
        );
      case 'projects':
        return (
          <div className="dash-card">
            <h3>Research projects</h3>
            <p>Project details and collaboration tools will appear here.</p>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="dash-shell">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        currentRole={currentRole}
        onRoleSwitch={(nextRole) => {
          if (onRoleSwitch) onRoleSwitch(nextRole);
          closeSidebar();
        }}
        currentView={currentView}
        onViewChange={(nextView) => {
          if (onViewChange) onViewChange(nextView);
          closeSidebar();
        }}
        onLogout={onLogout}
      />

      <header className="dash-shell__topbar">
        <div className="dash-shell__left-cluster">
          <button className="dash-shell__menu-btn" onClick={openSidebar}>☰ Menu</button>
          <div>
            <h2 className="dash-shell__system-logo">BioVault Workspace</h2>
            <div className="dash-shell__status-indicator">
              {isAdmin ? 'Administrator access' : 'Researcher access'}
            </div>
          </div>
        </div>
        <div className="dash-shell__status-indicator">Viewing {currentView}</div>
      </header>

      <div className="dash-shell__content">
        {renderContent()}
      </div>
    </div>
  );
}
