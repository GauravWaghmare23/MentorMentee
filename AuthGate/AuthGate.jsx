import { router } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthGate() {
    const { user, role, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.replace('LogIn');
                return;
            }

            switch (role) {
                case 'college':
                    router.replace('(college)/CollegeHome');
                    break;
                case 'teacher':
                    router.replace('(teacher)/TeacherHome');
                    break;
                case 'student':
                    router.replace('(student)/StudentHome');
                    break;
                default:
                    router.replace("LogIn")
            }
        }
    }, [user, role, loading]);

    return null;
}
