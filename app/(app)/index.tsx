import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useState} from 'react';
import {router} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';

export default function GamesScreen() {
    const [showCreateGame, setShowCreateGame] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Hide & Seek</Text>
            </View>

            <View style={styles.content}>
                {!showCreateGame ? (
                    <View style={styles.actions}>
                        <TouchableOpacity
                            style={[styles.button, styles.hostButton]}
                            onPress={() => setShowCreateGame(true)}
                        >
                            <Ionicons name="add-circle" size={24} color="#ffffff"/>
                            <Text style={styles.buttonText}>Host Game</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.joinButton]}
                            onPress={() => router.push('/join-game')}
                        >
                            <Ionicons name="enter" size={24} color="#ffffff"/>
                            <Text style={styles.buttonText}>Join Game</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.createGame}>

                        <TouchableOpacity
                            style={[styles.button, styles.createButton]}
                            onPress={() => {
                                router.push('/hostGame');
                                setShowCreateGame(false);
                            }}
                        >
                            <Text style={styles.buttonText}>Create Game</Text>
                        </TouchableOpacity>

                        <TouchableOpacitzy
                            style={[styles.button, styles.cancelButton]}
                            onPress={() => setShowCreateGame(false)}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacitz/
                        y>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 16,
        backgroundColor: '#1a237e',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    actions: {
        flex: 1,
        justifyContent: 'center',
        gap: 16,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        gap: 8,
    },
    hostButton: {
        backgroundColor: '#7c4dff',
    },
    joinButton: {
        backgroundColor: '#311b92',
    },
    createButton: {
        backgroundColor: '#7c4dff',
        marginTop: 16,
    },
    cancelButton: {
        backgroundColor: '#9e9e9e',
        marginTop: 8,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    createGame: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#1a237e',
    },
});