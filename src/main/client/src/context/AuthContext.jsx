import { createContext, useContext, useState } from 'react';
import { loginApi } from '../service/authApi';
import { storeCredentials, clearCredentials } from '../service/authHeader';

const AuthContext = createContext(null);

const STORAGE_KEY = 'biovault_user';

function loadStoredUser() {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(loadStoredUser);

    const login = async (email, password) => {
        const loggedInUser = await loginApi(email, password);
        storeCredentials(email, password);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        return loggedInUser;
    };

    const logout = () => {
        clearCredentials();
        sessionStorage.removeItem(STORAGE_KEY);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
