import { createContext, useContext, useState, useEffect } from 'react';
import { ALLOWED_EMAILS, getNameFromEmail, getEmployeeByEmail } from '../lib/constants';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('itc_voting_user');
        return stored ? JSON.parse(stored) : null;
    });

    const login = (email) => {
        const lowerEmail = email.toLowerCase().trim();
        if (!ALLOWED_EMAILS.has(lowerEmail)) {
            return { success: false, error: 'Энэ имэйл хаяг зөвшөөрөгдөөгүй байна.' };
        }
        const emp = getEmployeeByEmail(lowerEmail);
        const userData = {
            email: lowerEmail,
            name: emp ? emp.name : getNameFromEmail(lowerEmail),
            employeeId: emp ? emp.id : null,
        };
        localStorage.setItem('itc_voting_user', JSON.stringify(userData));
        setUser(userData);
        return { success: true };
    };

    const logout = () => {
        localStorage.removeItem('itc_voting_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
