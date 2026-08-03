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
import ResearcherDashboard from '../pages/ResearcherDashboard'
import AdminDashboard from '../pages/AdminDashboard'
import { useAuth } from '../context/AuthContext'

export function App() {
  const { user, logout } = useAuth();
  const [page, setPage] = useState(() => {
    if (user?.role === 'ADMIN') return 'adminDashboard';
    if (user?.role === 'RESEARCHER') return 'researcherDashboard';
    return 'home';
  });

  const navigateTo = (nextPage) => {
    if (nextPage === page) {
      return;
    }
    setPage(nextPage);
  };

  const navigateBack = () => {
    if (user?.role === 'ADMIN') return navigateTo('adminDashboard');
    if (user?.role === 'RESEARCHER') return navigateTo('researcherDashboard');
    navigateTo('home');
  };

  const handleLoginSuccess = (loggedInUser) => {
    navigateTo(loggedInUser.role === 'ADMIN' ? 'adminDashboard' : 'researcherDashboard');
  };

  const handleLogout = () => {
    logout();
    navigateTo('home');
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
            onSequenceTypeClick={() => navigateTo('sequenceType')}
          />
        )}
        {page === 'auth' && (
          <Auth
            onGoHome={() => navigateTo('home')}
            onGoRegistration={() => navigateTo('registration')}
            onLoginSuccess={handleLoginSuccess}
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
            onGoHome={navigateBack}
          />
        )}

        {page === 'institutions' && (
          <InstitutionManagement 
            onGoHome={navigateBack}
          />
        )}

        {page === 'projects' && (
          <ResearchProjectPage
            onGoHome={navigateBack}
          />
        )}
        
        {page === 'storageLocation' && (
          <StorageLocation
            onGoHome={navigateBack}
          />
        )}
        
        {page === 'sequenceType' && (
            <SequenceTypePage
                onGoHome={navigateBack}
            />
        )}
        
        {page === 'researcherDashboard' && (
          <ResearcherDashboard
            onProjectsClick={() => navigateTo('projects')}
            onSequenceClick={() => navigateTo('sequence')}
            onStorageClick={() => navigateTo('storageLocation')}
            onSequenceTypeClick={() => navigateTo('sequenceType')}
            onLogout={handleLogout}
          />
        )}

        {page === 'adminDashboard' && (
          <AdminDashboard
            onInstitutionsClick={() => navigateTo('institutions')}
            onProjectsClick={() => navigateTo('projects')}
            onSequenceClick={() => navigateTo('sequence')}
            onStorageClick={() => navigateTo('storageLocation')}
            onSequenceTypeClick={() => navigateTo('sequenceType')}
            onLogout={handleLogout}
          />
        )}
      </main>
    </div>
  );
}