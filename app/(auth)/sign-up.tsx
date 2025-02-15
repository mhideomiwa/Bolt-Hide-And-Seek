import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../../context/auth";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../lib/supabase"; // Ensure you import Supabase

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState(""); // New field
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();

    const handleSignUp = async () => {
        if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return;
        }

        if (username.length < 3) {
            Alert.alert("Invalid Username", "Username must be at least 3 characters long.");
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

            // Create the user in Supabase
            const { data, error } = await supabase.auth.signUp({ email, password });

            if (error) throw error;
            const user = data.user;
            if (!user) throw new Error("User creation failed.");

            // Insert profile data into 'profiles' table
            const { error: profileError } = await supabase.from("profiles").insert({
                id: user.id, // Associate profile with user ID
                user_name: username,
                games_played: 0,
                games_won: 0,
                best_time: 0,
                avatar_url: null,
            });

            if (profileError) throw profileError;

            Alert.alert("Success", "Account created! Please sign in.");
            router.replace("/(auth)/sign-in");
        } catch (error) {
            Alert.alert("Sign Up Failed", error instanceof Error ? error.message : "An unknown error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-lightBackground">
            <SafeAreaView className="flex-1 justify-center px-5">
                <View className="bg-darkBackground p-5 rounded-2xl items-center">
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
                        placeholder="Username"
                        placeholderTextColor="#9e9e9e"
                        value={username}
                        onChangeText={setUsername}
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
                        className={`w-full h-12 bg-primaryColor rounded-lg justify-center items-center mt-4 ${loading ? "opacity-70" : ""}`}
                        onPress={handleSignUp}
                        disabled={loading}
                    >
                        <Text className="text-white text-lg font-bold">{loading ? "Signing Up..." : "Sign Up"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="mt-4" onPress={() => router.push("/sign-in")}>
                        <Text className="text-white text-base">
                            Already have an account? <Text className="text-primaryColor font-bold">Sign in</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}
