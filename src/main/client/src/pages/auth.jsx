import { useState } from 'react';
import Login from './login';
import './login.css';


function Auth({ onGoHome, onGoRegistration, onGoSequence }) {
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

    if (userRole === 'student') {
        return (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#fff' }}>
                <h1>🎓 Student Dashboard</h1>
                <p>Your research samples and sequences will appear here.</p>
                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: '1.5rem', padding: '0.75rem 2rem',
                        background: '#5F41E4', color: '#fff', border: 'none',
                        borderRadius: '8px', fontSize: '1rem', cursor: 'pointer'
                    }}
                >
                    Logout
                </button>
                <button
                    onClick={onGoSequence}
                    style={{
                        marginTop: '0.75rem', marginLeft: '0.75rem', padding: '0.75rem 2rem',
                        background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)',
                        borderRadius: '8px', fontSize: '1rem', cursor: 'pointer'
                    }}
                >
                    Open Sequence Console
                </button>
            </div>
        );
    }

    if (userRole === 'manager') {
        return (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#fff' }}>
                <h1>🔬 Lab Manager Dashboard</h1>
                <p>Manage laboratory samples, sequences, and researcher access here.</p>
                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: '1.5rem', padding: '0.75rem 2rem',
                        background: '#5F41E4', color: '#fff', border: 'none',
                        borderRadius: '8px', fontSize: '1rem', cursor: 'pointer'
                    }}
                >
                    Logout
                </button>
                <button
                    onClick={onGoSequence}
                    style={{
                        marginTop: '0.75rem', marginLeft: '0.75rem', padding: '0.75rem 2rem',
                        background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)',
                        borderRadius: '8px', fontSize: '1rem', cursor: 'pointer'
                    }}
                >
                    Open Sequence Console
                </button>
            </div>
        );
    }

    if (userRole === 'admin') {
        return (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#fff' }}>
                <h1>⚙️ Admin Dashboard</h1>
                <p>Welcome to the system configurations and user management panel.</p>
                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: '1.5rem', padding: '0.75rem 2rem',
                        background: '#5F41E4', color: '#fff', border: 'none',
                        borderRadius: '8px', fontSize: '1rem', cursor: 'pointer'
                    }}
                >
                    Logout
                </button>
                <button
                    onClick={onGoSequence}
                    style={{
                        marginTop: '0.75rem', marginLeft: '0.75rem', padding: '0.75rem 2rem',
                        background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)',
                        borderRadius: '8px', fontSize: '1rem', cursor: 'pointer'
                    }}
                >
                    Open Sequence Console
                </button>
            </div>
        );
    }

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
