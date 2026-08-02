import React, { useState, useEffect } from 'react'; // MUST have curly braces around useState and useEffect
import Sidebar from '../components/Sidebar';         // Correct path to Sidebar
import SequenceTypePage from './SequenceTypePage';
import StorageLocation from './storageLocation';
import './DashboardShell.css';                      // Correct path to DashboardShell's own CSS


export default function DashboardShell({ isOpen, onClose, currentRole, onRoleSwitch, currentView, onViewChange, onLogout }) {
  // 1. FIXED: Set the id to 'seq-types' and added professional label matching your theme
  const researcherMenu = [
    { id: 'overview', label: 'Analysis Dashboard', icon: '📊' },
    { id: 'seq-types', label: 'Sequence Type Registry', icon: '🧬' }, 
    { id: 'projects', label: 'Research Projects', icon: '📁' },
  ];

  const adminMenu = [
    { id: 'overview', label: 'System Overview', icon: '🛡️' },
    { id: 'users', label: 'User Management', icon: '👥' },
    { id: 'seq-types', label: 'Sequence Type Registry', icon: '⚙️' },
    { id: 'storage-locs', label: 'Storage Locations', icon: '📍' },
  ];

  const activeMenu = currentRole === 'admin' ? adminMenu : researcherMenu;

  return (
    <>
      {/* Background Dimming Backdrop overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      {/* Main Drawer Slide Panel */}
      <aside className={`sidebar-drawer ${isOpen ? 'sidebar-drawer--open' : ''}`}>
        <div className="sidebar-drawer__header">
          <div className="sidebar-drawer__profile">
            <div className="sidebar-drawer__avatar">
              {currentRole === 'admin' ? 'A' : 'R'}
            </div>
            <div>
              <h4 className="sidebar-drawer__user-name">Dr. Dumij Vault</h4>
              <span className="sidebar-drawer__role-badge">{currentRole}</span>
            </div>
          </div>
          <button className="sidebar-drawer__close-btn" onClick={onClose}>×</button>
        </div>

        {/* Dynamic Navigation Items */}
        <nav className="sidebar-drawer__nav">
          <p className="sidebar-drawer__section-title">Navigation Ledger</p>
          {activeMenu.map((item) => (
            <button
              key={item.id}
              className={`sidebar-drawer__nav-item ${currentView === item.id ? 'sidebar-drawer__nav-item--active' : ''}`}
              onClick={() => {
                onViewChange(item.id);
                onClose(); // Auto-close sidebar panel after clicking an option
              }}
            >
              <span className="sidebar-drawer__nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Workspace Quick-Switch Action Footer Links */}
        <footer className="sidebar-drawer__footer">
          <button 
            className="sidebar-drawer__toggle-btn"
            onClick={() => {
              onRoleSwitch(currentRole === 'admin' ? 'researcher' : 'admin');
              onClose();
            }}
          >
            🔄 Simulation Swap Profile
          </button>
          <button className="sidebar-drawer__logout-btn" onClick={onLogout}>
            🚪 Terminate Session
          </button>
        </footer>
      </aside>
    </>
  );
}
