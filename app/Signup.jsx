import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/authContext';

const roles = ['student', 'teacher', 'college'];

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, user } = useAuth();
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await signUp(name, email, password, selectedRole);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-6 justify-center">
      <View className="space-y-6">
        <Text className="text-3xl font-bold text-center text-gray-800">Sign Up</Text>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          className="border border-gray-300 rounded-md px-4 py-3 text-base"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          className="border border-gray-300 rounded-md px-4 py-3 text-base"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="border border-gray-300 rounded-md px-4 py-3 text-base"
        />

        <Text className="text-lg font-semibold text-gray-700">Select Role:</Text>
        <View className="flex-row justify-between">
          {roles.map((role) => (
            <TouchableOpacity
              key={role}
              className={`px-4 py-2 rounded-md border ${selectedRole === role ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                }`}
              onPress={() => setSelectedRole(role)}
            >
              <Text
                className={`text-sm font-medium ${selectedRole === role ? 'text-white' : 'text-gray-700'
                  }`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity className="bg-green-600 py-3 rounded-md mt-4">
          <Text onPress={(e) => {
            handleSignup(e);
          }} className="text-white text-center font-semibold text-base">Create Account</Text>
        </TouchableOpacity>

        <Text className="text-center text-sm text-gray-500">
          Already have an account? <Text className="text-blue-600">Login</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Signup;