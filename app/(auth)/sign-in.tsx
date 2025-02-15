import {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useAuth} from '../../context/auth';
import {LinearGradient} from 'expo-linear-gradient';
import {router} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const {signIn} = useAuth();

    const handleSignIn = async () => {
        try {
            setLoading(true);
            await signIn(email, password);
        } catch (error) {
            Alert.alert('Error', 'Failed to sign in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-lightBackground">
            <SafeAreaView className="flex-1 justify-center px-5">
                <View className="bg-darkBackground p-5 rounded-2xl items-center">
                    <Text className="text-4xl font-bold text-white mb-2">Hide & Seek</Text>
                    <Text className="text-lg text-gray-300 mb-8">The Ultimate Real-World Game</Text>

                    <TextInput
                        className="w-full h-12 bg-white/10 rounded-lg mb-4 px-4 text-white"
                        placeholder="Email"
                        placeholderTextColor="white"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        editable={!loading}
                    />

                    <TextInput
                        className="w-full h-12 bg-white/10 rounded-lg mb-4 px-4 text-white"
                        placeholder="Password"
                        placeholderTextColor="white"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        editable={!loading}
                    />

                    <TouchableOpacity
                        className={`w-full h-12 bg-primaryColor rounded-lg justify-center items-center mt-4 ${loading ? 'opacity-70' : ''}`}
                        onPress={handleSignIn}
                        disabled={loading}
                    >
                        <Text className="text-white text-lg font-bold">{loading ? 'Signing In...' : 'Sign In'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="mt-4" onPress={() => router.push('/sign-up')}>
                        <Text className="text-white text-base">Don't have an account? <Text
                            className="text-primaryColor font-bold">Sign up</Text></Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}
