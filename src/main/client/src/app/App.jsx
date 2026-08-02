import { useState } from 'react'
import './App.css'
import Home from '../pages/home'
import Auth from '../pages/auth'
import Registration from '../pages/registration'
import Sequence from '../pages/sequence'
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
            onSequenceClick={() => navigateTo('sequence')}
            onInstitutionsClick={() => navigateTo("institutions")}
            onProjectsClick={() => navigateTo("projects")}
            onStorageClick={() => navigateTo('storageLocation')}
          />
        )}

        {page === 'auth' && (
          <Auth
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
        

      </main>
    </div>
  );
}