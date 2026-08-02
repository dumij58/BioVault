import { useState } from 'react'
import './App.css'
import Home from '../pages/home'
import Auth from '../pages/auth'
import Registration from '../pages/registration'
import Sequence from '../pages/sequence'
import InstitutionManagement from '../pages/InstitutionManagement'
import StorageLocation from "../pages/storageLocation"
import ResearchProjectPage from "../pages/ResearchProjectPage"
import SequenceTypePage from "../pages/SequenceTypePage"
import DashboardShell from "../pages/DashboardShell" // Import the master dashboard shell

export function App() {
  const [page, setPage] = useState('home');
  // Tracks who is active inside the system ('admin' or 'researcher')
  const [userRole, setUserRole] = useState('researcher');
  const [dashboardView, setDashboardView] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigateTo = (nextPage) => {
    if (nextPage === page) {
      return;
    }
    setPage(nextPage);
  };

  // Called automatically when credentials match in your corrected Auth.jsx page
  const handleLoginSuccess = (roleFromDatabase) => {
    setUserRole(roleFromDatabase); // Lock session clearance level context
    setDashboardView('overview');
    setSidebarOpen(false);
    navigateTo('dashboard');      // Direct route straight into the interactive dashboard workspace
  };

  const handleLogout = () => {
    setUserRole('guest');
    setDashboardView('overview');
    setSidebarOpen(false);
    navigateTo('home');
  };

  const handleRoleSwitch = (nextRole) => {
    setUserRole(nextRole);
    setDashboardView('overview');
  };

  return (
    <div className="app-shell">
      {/* 2. Global Navigation Header for testing your integration routes (Kept exactly as requested) */}
      <nav style={{ padding: '12px', background: '#222', color: '#fff', display: 'flex', gap: '15px', alignItems: 'center' }}>
        <button onClick={() => navigateTo('home')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>Home</button>
        <button onClick={() => navigateTo('storageLocation')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>Storage Locations</button>
        <button onClick={() => navigateTo('sequenceType')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: page === 'sequenceType' ? 'bold' : 'normal' }}>Sequence Types (Isolated)</button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
          <button onClick={() => navigateTo('auth')} style={{ background: '#5f41e4', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer' }}>🧪 Test Login Gate</button>
          {page === 'dashboard' && <button onClick={handleLogout} style={{ background: '#ff6e6e', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer' }}>🚪 Dev Logout</button>}
        </div>
      </nav>

      <main className={`page-shell page-shell--${page}`}>

        {page === 'home' && (
          <Home
            onLoginClick={() => navigateTo('auth')}
            onRegisterClick={() => navigateTo('registration')}
            onSequenceClick={() => navigateTo('sequence')}
            onInstitutionsClick={() => navigateTo("institutions")}
            onProjectsClick={() => navigateTo("projects")}
            onStorageClick={() => navigateTo('storageLocation')}
          />
        )}
        {page === 'auth' && (
          <Auth
            onLoginSuccess={handleLoginSuccess}
            onGoHome={() => navigateTo('home')}
            onGoRegistration={() => navigateTo('registration')}
            onGoSequence={() => navigateTo('sequence')}
          />
        )}
        {page === 'registration' && (
          <Registration
            onGoHome={() => navigateTo('home')}
            onGoLogin={() => navigateTo('auth')}
          />
        )}
        
        {page === 'sequence' && (
          <Sequence
            onGoHome={() => navigateTo('home')}
          />
        )}

        {page === 'institutions' && (
          <InstitutionManagement 
            onGoHome={() => navigateTo('home')}
          />
        )}

        {page === 'projects' && (
          <ResearchProjectPage
            onGoHome={() => navigateTo('home')}
          />
        )}
        
        {page === 'storageLocation' && (
          <StorageLocation
            onGoHome={() => navigateTo('home')}
          />
        )}
      
        
        {page === 'sequenceType' && (
            <SequenceTypePage
                onGoHome={() => navigateTo('home')}
            />
        )}

        {page === 'dashboard' && (
            <DashboardShell
                currentRole={userRole}
                currentView={dashboardView}
                onViewChange={setDashboardView}
                onRoleSwitch={handleRoleSwitch}
                onLogout={handleLogout}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onOpenMenu={() => setSidebarOpen(true)}
                onGoHome={handleLogout}
            />
        )}
      </main>
    </div>
  );
}