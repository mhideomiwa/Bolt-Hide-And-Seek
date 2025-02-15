import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GamesScreen() {
    const [showCreateGame, setShowCreateGame] = useState(false);

    return (
        <View className="flex-1 bg-[#1a237e]">
            <SafeAreaView className="flex-1 justify-center items-center px-5">
                <View className="bg-white/10 p-6 rounded-2xl w-full max-w-md items-center">
                    <Text className="text-4xl font-bold text-white mb-2">Hide & Seek</Text>

                    {!showCreateGame ? (
                        <View className="w-full mt-6 space-y-4">
                            <TouchableOpacity
                                className="flex-row items-center justify-center gap-2 bg-purple-600 p-4 rounded-xl"
                                onPress={() => setShowCreateGame(true)}
                            >
                                <Ionicons name="add-circle" size={24} color="#ffffff" />
                                <Text className="text-white text-lg font-bold">Host Game</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="flex-row items-center justify-center gap-2 bg-indigo-900 p-4 rounded-xl mt-4"
                                onPress={() => router.push('/join-game')}
                            >
                                <Ionicons name="enter" size={24} color="#ffffff" />
                                <Text className="text-white text-lg font-bold">Join Game</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View className="w-full mt-6 space-y-4">
                            <TouchableOpacity
                                className="bg-purple-600 p-4 rounded-xl justify-center items-center"
                                onPress={() => {
                                    router.push('/hostGame');
                                    setShowCreateGame(false);
                                }}
                            >
                                <Text className="text-white text-lg font-bold">Create Game</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="bg-gray-500 p-4 rounded-xl justify-center items-center mt-4"
                                onPress={() => setShowCreateGame(false)}
                            >
                                <Text className="text-white text-lg font-bold">Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </View>
    );
}
