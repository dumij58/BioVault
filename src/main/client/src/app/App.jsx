import { useState } from 'react'
import './App.css'
import Home from '../pages/home'
import Auth from '../pages/auth'
import Registration from '../pages/registration'
import ResearchProjectPage from '../pages/ResearchProjectPage'


export function App() {
  const [page, setPage] = useState('home');

  const navigateTo = (nextPage) => {
    if (nextPage === page) {
      return;
    }

    setPage(nextPage);
  };

  return (
    <div className="app-shell">
      <main className={`page-shell page-shell--${page}`}>
        {page === 'home' && (
          <Home
            onLoginClick={() => navigateTo('auth')}
            onRegisterClick={() => navigateTo('registration')}
            onProjectsClick={() => navigateTo('projects')}
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
        {page === 'projects' && (
            <ResearchProjectPage
                onGoHome={() => navigateTo('home')}
            />
        )}
        
      </main>
    </div>
  );
}
