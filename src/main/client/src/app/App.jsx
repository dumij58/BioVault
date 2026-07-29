import {useEffect, useState} from 'react'
import { Env } from "./Env";
import './App.css'
import Home from './pages/home'
import Auth from './pages/auth'
import Registration from './pages/registration'


function App() {

  useEffect(() => {
    fetch(`${Env.API_BASE_URL}/ping`)
        .then(response => response.text())
        .then(body => console.log(body));
  }, []);

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
        
      </main>
    </div>
  );
}


export default App
