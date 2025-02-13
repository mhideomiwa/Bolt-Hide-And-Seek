import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

type Game = {
    id: string;
    code: string;
    host_id: string;
    seeker_id: string | null;
    hider_id: string | null;
    status: string;
    hide_time_limit: number;
    start_time: string | null;
    end_time: string | null;
    winner_id: string | null;
    created_at: string;
    coins: number;
};

type GamesContextType = {
    games: Game[];
    fetchGames: () => Promise<void>;
    createGame: (hostId: string, code: string, hideTimeLimit: number) => Promise<void>;
    updateGameStatus: (gameId: string, status: string) => Promise<void>;
};

const GamesContext = createContext<GamesContextType>({
    games: [],
    fetchGames: async () => {},
    createGame: async () => {},
    updateGameStatus: async () => {},
});

export function GamesProvider({ children }: { children: React.ReactNode }) {
    const [games, setGames] = useState<Game[]>([]);

    const fetchGames = async () => {
        const { data, error } = await supabase.from('games').select('*');
        if (error) {
            console.error('Error fetching games:', error.message);
            return;
        }
        setGames(data);
    };

    const createGame = async (hostId: string, code: string, hideTimeLimit: number) => {
        const { error } = await supabase.from('games').insert([
            {
                host_id: hostId,
                code,
                hide_time_limit: hideTimeLimit,
                status: 'waiting',
                created_at: new Date().toISOString(),
            },
        ]);
        if (error) {
            console.error('Error creating game:', error.message);
            return;
        }
        await fetchGames();
    };

    const updateGameStatus = async (gameId: string, status: string) => {
        const { error } = await supabase.from('games').update({ status }).eq('id', gameId);
        if (error) {
            console.error('Error updating game status:', error.message);
            return;
        }
        await fetchGames();
    };

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <GamesContext.Provider value={{ games, fetchGames, createGame, updateGameStatus }}>
            {children}
        </GamesContext.Provider>
    );
}

export const useGames = () => useContext(GamesContext);
