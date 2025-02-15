import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../context/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();

    const handleSignUp = async () => {
        if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Weak Password", "Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Password Mismatch", "Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            await signUp(email, password);
            Alert.alert("Success", "Account created! Please sign in.");
            router.replace("/(auth)/sign-in"); // Redirect to sign-in after sign-up
        } catch (error) {
            Alert.alert("Sign Up Failed", error instanceof Error ? error.message : "An unknown error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-[#1a237e]">
            <LinearGradient colors={['#1a237e', '#311b92']} style={{ flex: 1 }}>
                <SafeAreaView className="flex-1 justify-center px-5">
                    <View className="bg-white/10 p-5 rounded-2xl items-center">
                        <Text className="text-4xl font-bold text-white mb-2">Hide & Seek</Text>
                        <Text className="text-lg text-gray-300 mb-8">Join the Ultimate Real-World Game</Text>

                        <TextInput
                            className="w-full h-12 bg-white/10 rounded-lg mb-4 px-4 text-white"
                            placeholder="Email"
                            placeholderTextColor="#9e9e9e"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            editable={!loading}
                        />

                        <TextInput
                            className="w-full h-12 bg-white/10 rounded-lg mb-4 px-4 text-white"
                            placeholder="Password"
                            placeholderTextColor="#9e9e9e"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            editable={!loading}
                        />

                        <TextInput
                            className="w-full h-12 bg-white/10 rounded-lg mb-4 px-4 text-white"
                            placeholder="Confirm Password"
                            placeholderTextColor="#9e9e9e"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            editable={!loading}
                        />

                        <TouchableOpacity
                            className={`w-full h-12 bg-purple-600 rounded-lg justify-center items-center mt-4 ${loading ? 'opacity-70' : ''}`}
                            onPress={handleSignUp}
                            disabled={loading}
                        >
                            <Text className="text-white text-lg font-bold">{loading ? 'Signing Up...' : 'Sign Up'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="mt-4" onPress={() => router.push('/sign-in')}>
                            <Text className="text-white text-base">
                                Already have an account? <Text className="text-purple-400 font-bold">Sign in</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </View>
    );
}
