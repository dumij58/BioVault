import { useState } from 'react'
import './App.css'
import Home from '../pages/home'
import Auth from '../pages/auth'
import Registration from '../pages/registration'

import InstitutionManagement from '../pages/InstitutionManagement'

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
        {/* QUICK NAV BAR TO SWITCH BETWEEN PAGES */}
        <nav style={{ padding: '10px 20px', backgroundColor: '#e5e7eb', display: 'flex', gap: '15px' }}>
          <button onClick={() => navigateTo('home')} style={{ padding: '5px 10px', cursor: 'pointer' }}>Home</button>
          <button onClick={() => navigateTo('institutions')} style={{ padding: '5px 10px', cursor: 'pointer', fontWeight: 'bold' }}>Institution Management</button>
        </nav>

        <main className={`page-shell page-shell--${page}`}>
          {page === 'home' && (
              <Home
                  onLoginClick={() => navigateTo('auth')}
                  onRegisterClick={() => navigateTo('registration')}
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

          {/* 3. RENDER YOUR INSTITUTION MANAGEMENT PAGE */}
          {page === 'institutions' && (
              <InstitutionManagement />
          )}

        </main>
      </div>
  );
}