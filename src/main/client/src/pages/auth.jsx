import { useState, useEffect } from 'react';
import Login from './login';
import './login.css';


function Auth({ onGoHome, onGoRegistration }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState('guest');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        document.body.style.backgroundColor = '';
        document.body.style.display = '';
        document.body.style.alignItems = '';
        document.body.style.justifyContent = '';
        document.body.style.minHeight = '';
    }, []);

    const credentials = {
        student: { email: 'student@school.com', password: 'student123' },
        manager: { email: 'manager@lab.com', password: 'manager123' },
        admin: { email: 'admin@system.com', password: 'admin123' }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (email === credentials.student.email && password === credentials.student.password) {
            setUserRole('student');
        } else if (email === credentials.manager.email && password === credentials.manager.password) {
            setUserRole('manager');
        } else if (email === credentials.admin.email && password === credentials.admin.password) {
            setUserRole('admin');
        } else {
            setErrorMessage('Invalid email or password! Please try again.');
        }
    };

    const handleLogout = () => {
        setUserRole('guest');
        setEmail('');
        setPassword('');
        if (onGoHome) onGoHome();
    };

    if (userRole === 'student') {
        return <Student onLogout={handleLogout} />;
    }

    if (userRole === 'manager') {
        return <LabManager onLogout={handleLogout} />;
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