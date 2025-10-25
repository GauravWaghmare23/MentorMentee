import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthGate() {
    const navigate = useNavigation();
    const { user, role, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                navigate.push('LogIn');
                return;
            }

            switch (role) {
                case 'college':
                    navigate.push('(college)/CollegeHome');
                    break;
                case 'teacher':
                    navigate.push('(teacher)/TeacherHome');
                    break;
                case 'student':
                    navigate.push('(student)/StudentHome');
                    break;
                default:
                    navigate.push("LogIn")
            }
        }
    }, [user, role, loading, navigate]);

    return null;
}