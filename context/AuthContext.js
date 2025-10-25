import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from 'react';
import { ID } from "react-native-appwrite";
import { account } from "../lib/Appwrite";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [name, setName] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const session = await account.get();
            const prefs = await account.getPrefs();
            setUser(session);
            setRole(prefs.role);
            setName(prefs.name);
        } catch {
            setUser(null);
            setRole(null);
        } finally {
            setLoading(false);
        }
    };

    const signup = async (email, password, role, name) => {
        const userId = ID.unique();
        await account.create(userId, email, password, name);
        await account.createEmailPasswordSession(email, password);
        await account.updatePrefs({ role, name });
        await fetchUser();
    };

    const login = async (email, password) => {
        await account.createEmailPasswordSession(email, password);
        await fetchUser();
        router.replace('/');
    };

    const logout = async () => {
        await account.deleteSession('current');
        setUser(null);
        setRole(null);
        router.replace('LogIn');
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, name, role, loading, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);