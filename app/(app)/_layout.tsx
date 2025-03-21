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
                        backgroundColor: '#1B3A4B',
                        borderTopColor: '#1B3A4B',},
                    tabBarActiveTintColor: '#FF8C00',
                    tabBarInactiveTintColor: '#9e9e9e',
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