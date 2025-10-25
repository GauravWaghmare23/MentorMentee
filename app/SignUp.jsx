import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

// Define the available roles for sign-up
const ROLES = ['Student', 'Teacher', 'College'];

const SignUp = () => {
    const navigate = useNavigation();
    const { signup } = useAuth();
    // State variables to hold the form data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(ROLES[0]); // Default role
    const [loading, setLoading] = useState(false);

    // Simple function to handle the sign-up logic
    const handleSignUp = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        setLoading(true);
        try {
            await signup(email, password, role.toLowerCase(), name);
        } catch (error) {
            Alert.alert('Sign Up Failed', error.message || 'An error occurred during sign up');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Create Account 🚀</Text>

                    {/* Name Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor="#888"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                    />

                    {/* Email Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        placeholderTextColor="#888"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    {/* Password Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#888"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true} // Hides the password input
                    />

                    {/* Role Selection */}
                    <Text style={styles.label}>Select Your Role:</Text>
                    <View style={styles.roleContainer}>
                        {ROLES.map((r) => (
                            <TouchableOpacity
                                key={r}
                                style={[
                                    styles.roleButton,
                                    role === r && styles.roleButtonActive,
                                ]}
                                onPress={() => setRole(r)}
                            >
                                <Text
                                    style={[
                                        styles.roleButtonText,
                                        role === r && styles.roleButtonTextActive,
                                    ]}
                                >
                                    {r}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Sign Up Button */}
                    <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
                        <Text style={styles.buttonText}>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
                    </TouchableOpacity>

                    {/* Optional: Link to Login */}
                    <TouchableOpacity onPress={() => { navigate.push('LogIn'); }}>
                        <Text style={styles.loginText}>
                            Already have an account? <Text style={styles.loginLink}>Log In</Text>
                        </Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// Stylesheet for a modern look
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f7fa', // Light background for a modern feel
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    container: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        marginBottom: 40,
        alignSelf: 'flex-start', // Align title to the left
    },
    // --- Input Styles ---
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        color: '#333',
        shadowColor: '#000', // Subtle shadow for a "lifted" effect
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    // --- Role Selector Styles ---
    label: {
        alignSelf: 'flex-start',
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
        marginTop: 5,
        fontWeight: '600',
    },
    roleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 25,
    },
    roleButton: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 12,
        borderRadius: 25,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    roleButtonActive: {
        backgroundColor: '#007AFF', // Primary color for active state
        borderColor: '#007AFF',
    },
    roleButtonText: {
        color: '#555',
        fontSize: 14,
        fontWeight: '600',
    },
    roleButtonTextActive: {
        color: '#fff', // White text for active state
    },
    // --- Button Styles ---
    button: {
        width: '100%',
        backgroundColor: '#007AFF', // A standard, modern blue
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    // --- Login Link ---
    loginText: {
        fontSize: 14,
        color: '#888',
    },
    loginLink: {
        color: '#007AFF', fontWeight: '600',
    },
});

export default SignUp;