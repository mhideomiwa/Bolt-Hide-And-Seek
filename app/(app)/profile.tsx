import { View, Text, TouchableOpacity, ActivityIndicator, Image, TextInput } from 'react-native';
import { useState } from 'react';
import { useAuth } from '../../context/auth';
import { useProfile } from '../../context/profile';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { profile, loading, fetchProfile } = useProfile();

  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(profile?.user_name || '');
  const [saving, setSaving] = useState(false);
  const [showDeleteProfile, setShowDeleteProfile] = useState(true);

  // Function to update username in Supabase
  const updateUsername = async () => {
    if (!newUsername.trim()) return;
    setSaving(true);

    const { error } = await supabase
        .from('profiles')
        .update({ user_name: newUsername })
        .eq('id', user?.id);

    setSaving(false);
    setEditing(false);

    if (!error) {
      fetchProfile(); // Fetch updated profile
    }
  };

  const handleDelete = async () => {

    const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user?.id);

    if (error) {
      console.error('Error deleting profile:', error.message);
      return;
    }

    // Delete the user
    const { error: userError } = await supabase.auth.admin.deleteUser(
        user?.id
    );

    await signOut();
  }

  if (loading) {
    return (
        <View className="flex-1 bg-darkBackground justify-center items-center">
          <ActivityIndicator size="large" color="#FF8C00" />
        </View>
    );
  }

  return (
      <View className="flex-1 bg-darkBackground">
        <SafeAreaView className="flex-1 justify-center items-center px-5">
          { showDeleteProfile ? (
              <View className="bg-white/10 p-6 rounded-2xl w-full max-w-md items-center">
                <Text className="text-4xl font-bold text-white mb-4">Profile</Text>

                {/* Avatar Section */}
                {profile?.avatar_url && (
                    <Image
                        source={{ uri: profile.avatar_url }}
                        className="w-24 h-24 rounded-full mb-4"
                    />
                )}

                {/* Editable Username */}
                <View className="mb-4 items-center">
                  {editing ? (
                      <View className="flex-row items-center gap-2">
                        <TextInput
                            value={newUsername}
                            onChangeText={setNewUsername}
                            className="bg-white/20 text-white px-4 py-2 rounded-md"
                            placeholder="Enter username"
                            autoFocus
                        />
                        <TouchableOpacity onPress={updateUsername} disabled={saving}>
                          <Text className="text-primaryColor font-bold">{saving ? 'Saving...' : 'Save'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setEditing(false)}>
                          <Text className="text-lightBackground">Cancel</Text>
                        </TouchableOpacity>
                      </View>
                  ) : (
                      <TouchableOpacity onPress={() => setEditing(true)}>
                        <Text className="text-xl font-semibold text-lightBackground">
                          {profile?.user_name || 'Set a Username'}
                        </Text>
                      </TouchableOpacity>
                  )}
                </View>

                {/* Stats Section */}
                <View className="flex-row justify-around w-full bg-white/20 p-4 rounded-xl mb-6">
                  <View className="items-center">
                    <Text className="text-2xl font-bold text-primaryColor">
                      {profile?.games_played ?? 0}
                    </Text>
                    <Text className="text-sm text-lightBackground">Games Played</Text>
                  </View>

                  <View className="items-center">
                    <Text className="text-2xl font-bold text-primaryColor">
                      {profile?.games_won ?? 0}
                    </Text>
                    <Text className="text-sm text-lightBackground">Games Won</Text>
                  </View>

                  <View className="items-center">
                    <Text className="text-2xl font-bold text-primaryColor">
                      {profile?.best_time ?? 'N/A'}
                    </Text>
                    <Text className="text-sm text-lightBackground">Best Time</Text>
                  </View>
                </View>

                {/* Sign Out Button */}
                <TouchableOpacity
                    className="bg-primaryColor px-6 py-3 rounded-xl w-full items-center"
                    onPress={signOut}
                >
                  <Text className="text-white text-lg font-bold">Sign Out</Text>
                </TouchableOpacity>

                {/*delete profile*/}
                <TouchableOpacity
                    className="bg-tertiaryColor px-6 py-3 rounded-xl w-full items-center mt-4"
                    onPress={() => setShowDeleteProfile(false)}
                >
                    <Text className="text-white text-lg font-bold">Delete Account</Text>
                </TouchableOpacity>

              </View>
          ) : (
              <View className="bg-white/10 p-6 rounded-2xl w-full max-w-md items-center">
                <Text className="text-4xl font-bold text-white mb-4">Delete Account</Text>
                <Text className="text-lg text-lightBackground text-center mb-4">
                  Are you sure you want to delete your account?
                </Text>
                <TouchableOpacity
                    className="bg-tertiaryColor px-6 py-3 rounded-xl w-full items-center mt-4"
                    onPress={handleDelete}
                >
                  <Text className="text-white text-lg font-bold">Delete Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="bg-gray-500 px-6 py-3 rounded-xl w-full items-center mt-4"
                    onPress={() => setShowDeleteProfile(true)}
                >
                    <Text className="text-white text-lg font-bold">Cancel</Text>
                </TouchableOpacity>
              </View>
          )}

        </SafeAreaView>
      </View>
  );
}
