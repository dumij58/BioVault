import { useState } from 'react'
import './App.css'
import Home from '../pages/home'
import Auth from '../pages/auth'
import Registration from '../pages/registration'

import InstitutionManagement from '../pages/InstitutionManagement'
import StorageLocation from "../pages/storageLocation"
import ResearchProjectPage from "../pages/ResearchProjectPage"

export function App() {
  const [page, setPage] = useState('institutions');

  const navigateTo = (nextPage) => {
    if (nextPage === page) {
      return;
    }

    setPage(nextPage);
  };

  return (
    <div className="app-shell">
      {/* QUICK NAV BAR FOR ALL MODULES */}
      <nav style={{ padding: '10px 20px', backgroundColor: '#1e293b', display: 'flex', gap: '15px' }}>
        <button onClick={() => navigateTo('home')} style={{ padding: '6px 12px', cursor: 'pointer' }}>Home</button>
        <button onClick={() => navigateTo('institutions')} style={{ padding: '6px 12px', cursor: 'pointer', fontWeight: 'bold' }}>Institution Management</button>
        <button onClick={() => navigateTo('storageLocation')} style={{ padding: '6px 12px', cursor: 'pointer' }}>Storage Location</button>
        <button onClick={() => navigateTo('projects')} style={{ padding: '6px 12px', cursor: 'pointer' }}>Projects</button>
      </nav>

      <main className={`page-shell page-shell--${page}`}>
        {page === 'home' && (
          <Home
            onLoginClick={() => navigateTo('auth')}
            onRegisterClick={() => navigateTo('registration')}
            onStorageClick={() => navigateTo('storageLocation')}
            onProjectsClick={() => navigateTo("projects")}
          />
        )}
        {page === 'auth' && (
          <Auth
            onGoHome={() => navigateTo('home')}
            onGoRegistration={() => navigateTo('registration')}
          />
        )}
        {page === 'registration' && (
          <Registration
            onGoHome={() => navigateTo('home')}
            onGoLogin={() => navigateTo('auth')}
          />
        )}

        {/* YOUR MODULE */}
        {page === 'institutions' && (
          <InstitutionManagement />
        )}

        {/* TEAMMATES' MODULES */}
        {page === 'storageLocation' && (
          <StorageLocation
            onGoHome={() => navigateTo('home')}
          />
        )}
        {page === 'projects' && (
          <ResearchProjectPage
            onGoHome={() => navigateTo('home')}
          />
        )}

      </main>
    </div>
  );
}