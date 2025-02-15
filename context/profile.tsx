import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

interface UserProfile {
    id: string;
    user_name: string;
    games_played: number;
    games_won: number;
    best_time: number;
    avatar_url: string | null;
}

interface ProfileContextType {
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
    fetchProfile: () => Promise<void>;
    updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
    signOut: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInitialProfile = async () => {
            setLoading(true);
            await fetchProfile();
            setLoading(false);
        };

        fetchInitialProfile();
    }, []);

    // Fetch user profile from Supabase
    const fetchProfile = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) {
                setProfile(null);
                return;
            }

            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", session.user.id)
                .single();

            if (error) throw error;
            setProfile(data);
        } catch (err: any) {
            setError(err.message || "Failed to fetch profile");
        }
    };

    // Update user profile in Supabase
    const updateProfile = async (updates: Partial<UserProfile>) => {
        try {
            setLoading(true);
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) throw new Error("User not logged in");

            const { error } = await supabase
                .from("profiles")
                .update(updates)
                .eq("id", session.user.id);

            if (error) throw error;

            // Refresh profile after update
            await fetchProfile();
        } catch (err: any) {
            setError(err.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    // Sign out user
    const signOut = async () => {
        await supabase.auth.signOut();
        setProfile(null);
    };

    return (
        <ProfileContext.Provider value={{ profile, loading, error, fetchProfile, updateProfile, signOut }}>
            {children}
        </ProfileContext.Provider>
    );
}

// Hook to use profile context
export function useProfile() {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error("useProfile must be used within a ProfileProvider");
    }
    return context;
}
