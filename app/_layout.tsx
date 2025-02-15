import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../context/auth';
import { ProfileProvider } from '../context/profile'; // Import ProfileProvider

export default function RootLayout() {
    return (
        <AuthProvider>
            <ProfileProvider> {/* Wrap ProfileProvider inside AuthProvider */}
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(app)" options={{ headerShown: false }} />
                </Stack>
                <StatusBar style="dark" />
            </ProfileProvider>
        </AuthProvider>
    );
}
