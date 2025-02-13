import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Share, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/auth';
import { supabase } from '../../lib/supabase';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function HostGame() {
    const { user } = useAuth();
    const [gameCode, setGameCode] = useState('');
    const [gameId, setGameId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const generateCode = () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            return Array.from({ length: 6 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
        };

        const createGame = async () => {
            if (!user) return;
            const newCode = generateCode();
            setGameCode(newCode);

            const { data, error } = await supabase
                .from('games')
                .insert([{ code: newCode, host_id: user.id, status: 'waiting' }])
                .select('id')
                .single();

            if (error) {
                Alert.alert('Error', 'Failed to create game.');
                router.replace('/(app)');
                return;
            }

            setGameId(data.id);
            setLoading(false);
        };

        createGame();

        return () => {
            if (gameId) {
                supabase.from('games').delete().eq('id', gameId);
            }
        };
    }, [user]);

    useEffect(() => {
        if (!gameId) return;

        const subscription = supabase
            .channel(`game-${gameId}`)
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'games', filter: `id=eq.${gameId}` }, (payload) => {
                if (payload.new.seeker_id || payload.new.hider_id) {
                    router.replace('/gameSetup');
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [gameId]);

    const shareCode = async () => {
        try {
            await Share.share({ message: `Join my Hide & Seek game! Use this code: ${gameCode}` });
        } catch (error) {
            Alert.alert('Error', 'Failed to share game code.');
        }
    };

    const cancelGame = async () => {
        if (gameId) {
            await supabase.from('games').delete().eq('id', gameId);
        }
        router.replace('/(app)');
    };

    if (loading) return <ActivityIndicator size="large" color="#fff" style={{ flex: 1, justifyContent: 'center' }} />;

    return (
        <LinearGradient colors={['#1a237e', '#311b92']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: 20, borderRadius: 15, alignItems: 'center' }}>
                <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#ffffff', marginBottom: 8 }}>Game Code</Text>
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#7c4dff', marginBottom: 16 }}>{gameCode}</Text>

                <TouchableOpacity onPress={shareCode} style={{ backgroundColor: '#7c4dff', padding: 15, borderRadius: 10, marginBottom: 10 }}>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Share Code</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={cancelGame} style={{ backgroundColor: '#ff5252', padding: 15, borderRadius: 10 }}>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Cancel Game</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}
