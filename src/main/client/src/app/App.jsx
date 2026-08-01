import { useState } from 'react'
import './App.css'
import Home from '../pages/home'
import Auth from '../pages/auth'
import Registration from '../pages/registration'
import InstitutionManagement from '../pages/InstitutionManagement'
import StorageLocation from "../pages/storageLocation"
import ResearchProjectPage from "../pages/ResearchProjectPage"

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
            onInstitutionsClick={() => navigateTo("institutions")}
            onProjectsClick={() => navigateTo("projects")}
            onStorageClick={() => navigateTo('storageLocation')}
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
        

      </main>
    </div>
  );
}