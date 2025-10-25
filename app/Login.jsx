import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/authContext';

const Login = () => {

  const { login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-white px-6 justify-center">
      <View className="space-y-6">
        <Text className="text-3xl font-bold text-center text-gray-800">Login</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          className="border border-gray-300 rounded-md px-4 py-3 text-base"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          className="border border-gray-300 rounded-md px-4 py-3 text-base"
        />

        <TouchableOpacity className="bg-blue-600 py-3 rounded-md">
          <Text onPress={(e) => {
            handleLogin(e);
          }} className="text-white text-center font-semibold text-base">Login</Text>
        </TouchableOpacity>

        <Text className="text-center text-sm text-gray-500">
          Don&apos;t have an account? <Text className="text-blue-600">Sign up</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;