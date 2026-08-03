import { useState } from 'react';
import Login from './login';
import './login.css';
import { useAuth } from '../context/AuthContext';


function Auth({ onGoRegistration, onLoginSuccess }) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const loggedInUser = await login(email, password);
            if (onLoginSuccess) onLoginSuccess(loggedInUser);
        } catch (error) {
            setErrorMessage(error.message || 'Invalid email or password! Please try again.');
        }
    };

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

