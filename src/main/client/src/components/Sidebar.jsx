import React from 'react';
import './Sidebar.css';

export default function Sidebar({ isOpen, onClose, currentRole, onRoleSwitch, currentView, onViewChange, onLogout }) {
  // Define navigation layout menus dynamically per user group clearance level
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
  { id: 'institutions', label: 'User Institutions' }, // Matches view actions
  { id: 'projects', label: 'Research Projects' },    // Matches view actions
  { id: 'sequence', label: 'Sequence Console' },     // Matches view actions
  { id: 'sequence-types', label: 'Sequence Types' }, // Matches view actions
  { id: 'storage', label: 'Storage Locations' },     // Matches view actions
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
                onClose();
              }}
            >
              <span className="sidebar-drawer__nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Workspace Quick-Switch Action Footer Links */}
        <footer className="sidebar-drawer__footer">
          
          <button className="sidebar-drawer__logout-btn" onClick={onLogout}>
            Logout
          </button>
        </footer>
      </aside>
    </>
  );
}
