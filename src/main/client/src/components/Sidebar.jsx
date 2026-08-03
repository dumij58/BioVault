import React from 'react';
import './Sidebar.css';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ isOpen, onClose, currentRole, onRoleSwitch, currentView, onViewChange, onLogout }) {
  const { user } = useAuth();

  const researcherMenu = [
    { id: 'overview', label: 'Analysis Dashboard' },
    { id: 'seq-types', label: 'Sequence Types' },
    { id: 'projects', label: 'Research Projects' },
    { id: 'storage', label: 'Storage Locations' },
    { id: 'sequence', label: 'Sequence Console' },
    {id: 'samples', label: 'Sample List' }
  ];

  const adminMenu = [
  { id: 'overview', label: 'System Overview' },
  { id: 'institutions', label: 'Institutions' },
  { id: 'researchers', label: 'Researchers' },
  { id: 'projects', label: 'Research Projects' },
  { id: 'samples', label: 'Sample List' },
  { id: 'sequence', label: 'Sequence Console' },
  { id: 'sequence-types', label: 'Sequence Types' },
  { id: 'storage', label: 'Storage Locations' },
];


  const activeMenu = currentRole === 'admin' ? adminMenu : researcherMenu;

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar-drawer ${isOpen ? 'sidebar-drawer--open' : ''}`}>
        <div className="sidebar-drawer__header">
          <div className="sidebar-drawer__profile">
            <div className="sidebar-drawer__avatar">
              {currentRole === 'admin' ? 'A' : 'R'}
            </div>
            <div>
              <h4 className="sidebar-drawer__user-name">{currentRole === 'admin' ? `${user?.email || 'Unknown Administrator'}` : `${user?.name || 'Unknown User'}`}</h4>
              <span className="sidebar-drawer__role-badge">{currentRole}</span>
            </div>
          </div>
          <button className="sidebar-drawer__close-btn" onClick={onClose}>×</button>
        </div>

        <nav className="sidebar-drawer__nav">
          <p className="sidebar-drawer__section-title">Navigation Ledger</p>
          {activeMenu.map((item) => (
            <button
              key={item.id}
              className={`sidebar-drawer__nav-item ${currentView === item.id ? 'sidebar-drawer__nav-item--active' : ''}`}
              onClick={() => {
                onViewChange(item.id);
                onClose();
              }}
            >
              <span className="sidebar-drawer__nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <footer className="sidebar-drawer__footer">
          
          <button className="sidebar-drawer__logout-btn" onClick={onLogout}>
            Logout
          </button>
        </footer>
      </aside>
    </>
  );
}
