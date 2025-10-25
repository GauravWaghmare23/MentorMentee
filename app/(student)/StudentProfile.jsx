import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';

const StudentProfile = () => {
    const { user, role, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.replace('LogIn');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileCard}>
                <Text style={styles.title}>🎓 Student Profile</Text>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{user?.name || 'N/A'}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{user?.email || 'N/A'}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Role:</Text>
                    <Text style={styles.value}>{role || 'Student'}</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default StudentProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFEFE',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    profileCard: {
        width: '100%',
        backgroundColor: '#F4F6F7',
        borderRadius: 12,
        padding: 24,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 20,
        color: '#2C3E50',
        textAlign: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#34495E',
    },
    value: {
        fontSize: 16,
        color: '#566573',
    },
    button: {
        marginTop: 30,
        backgroundColor: '#58D68D',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});