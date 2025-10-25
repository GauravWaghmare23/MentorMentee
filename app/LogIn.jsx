import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

const LogIn = () => {
    const navigate = useNavigation();
    const { login } = useAuth();
    // State variables for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Function to handle the login logic
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        setLoading(true);
        try {
            await login(email, password);
        } catch (error) {
            Alert.alert('Login Failed', error.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Welcome Back 👋</Text>

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

                    {/* Forgot Password Link */}
                    <TouchableOpacity
                        style={styles.forgotPasswordContainer}
                        onPress={() => console.log('Forgot Password Pressed')}
                    >
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    {/* Log In Button */}
                    <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                        <Text style={styles.buttonText}>{loading ? 'Logging In...' : 'Log In'}</Text>
                    </TouchableOpacity>

                    {/* Link to Sign Up */}
                    <TouchableOpacity onPress={() => navigate.push('SignUp')}>
                        <Text style={styles.signupText}>
                            Don&apos;t have an account? <Text style={styles.signupLink}>Sign Up</Text>
                        </Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// Stylesheet using the same modern theme as the Sign Up page
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f7fa',
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
        alignSelf: 'flex-start',
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    // --- Forgot Password Link ---
    forgotPasswordContainer: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 30,
    },
    forgotPasswordText: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '600',
    },
    // --- Button Styles ---
    button: {
        width: '100%',
        backgroundColor: '#007AFF', // Primary color
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
    // --- Sign Up Link ---
    signupText: {
        fontSize: 14,
        color: '#888',
    },
    signupLink: {
        color: '#007AFF',
        fontWeight: '600',
    },
});

export default LogIn;