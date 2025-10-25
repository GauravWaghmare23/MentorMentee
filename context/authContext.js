import { createContext, useContext, useEffect, useState } from 'react';
import { ID, Query } from 'react-native-appwrite';
import { account, databaseId, databases, typeOfUserCollectionId } from "../appwrite/appwrite"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);


    const fetchUserAndRole = async () => {
        try {
            const response = await account.get();
            setUser(response);

            const roleResponse = await databases.listDocuments(
                databaseId,
                typeOfUserCollectionId,
                [Query.equal('email', response.email)]
            );

            if (roleResponse.documents.length > 0) {
                setRole(roleResponse.documents[0].type);
            } else {
                console.warn('No role document found');
                setRole(null);
            }
        } catch (error) {
            console.error('Error fetching user or role:', error);
            setUser(null);
            setRole(null);
        }
    };

    useEffect(() => {
        fetchUserAndRole();
    }, []);

    const signUp = async (name, email, password, roleType) => {
        try {
            const response = await account.create(ID.unique(), email, password);
            await account.updateName(name);
            await account.createEmailPasswordSession(email, password);
            setUser(response);
            try {
                await databases.createDocument(
                    databaseId,
                    typeOfUserCollectionId,
                    ID.unique(),
                    {
                        email,
                        type: roleType,
                        userId: response.$id,
                    }
                );
                setRole(roleType);
            } catch (error) {
                console.error('Error creating role document:', error);
                setRole(null);
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setUser(null);
            setRole(null);
        }
    };

    const login = async (email, password) => {
        try {
            await account.createEmailPasswordSession(email, password);
            await fetchUserAndRole();
        } catch (error) {
            console.error('Error logging in:', error);
            setUser(null);
            setRole(null);
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
            setRole(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                role,
                setRole,
                fetchUserAndRole,
                signUp,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);