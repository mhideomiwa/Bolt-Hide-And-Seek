import {Tabs} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import "../global.css"
import {GamesProvider} from "@/context/gameSetUp";

export default function AppLayout() {
    return (
        <GamesProvider>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#1a237e',
                        borderTopColor: '#311b92',
                    },
                    tabBarActiveTintColor: '#7c4dff',
                    tabBarInactiveTintColor: '#9e9e9e',
                    headerStyle: {
                        backgroundColor: '#1a237e',
                    },
                    headerTintColor: '#ffffff',
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Games',
                        tabBarIcon: ({size, color}) => (
                            <Ionicons name="game-controller" size={size} color={color}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({size, color}) => (
                            <Ionicons name="person" size={size} color={color}/>
                        ),
                    }}
                />
            </Tabs>
        </GamesProvider>
    );
}