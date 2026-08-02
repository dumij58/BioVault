import { useState } from 'react';
import Login from './login';
import './login.css';

// 1. Destructure the onLoginSuccess tracking prop passed from App.jsx
function Auth({ onGoHome, onGoRegistration, onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Static credential vault configuration mappings
    const credentials = {
        researcher: { email: 'Researcher@school.com', password: 'researcher123' },
        admin: { email: 'admin@system.com', password: 'admin123' }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setErrorMessage('');

        // 2. Validate user role matching parameters
        if (email === credentials.researcher.email && password === credentials.researcher.password) {
            // Clear input forms safely on success
            clearForm();
            // Signal to App.jsx that a Researcher successfully logged in
            if (onLoginSuccess) onLoginSuccess('researcher');
            
        }  else if (email === credentials.admin.email && password === credentials.admin.password) {
            clearForm();
            // Signal to App.jsx that an Admin successfully logged in
            if (onLoginSuccess) onLoginSuccess('admin');
            
        } else {
            setErrorMessage('Invalid email or password! Please try again.');
        }
    };

    const clearForm = () => {
        setEmail('');
        setPassword('');
        setErrorMessage('');
    };

    // 3. Render the interactive login form cleanly (No more buggy hardcoded sub-screens!)
    return (
        <div className="auth-login-stage">
            <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                errorMessage={errorMessage}
                onGoRegistration={onGoRegistration}
            />
        </div>
    );
}

export default Auth;
