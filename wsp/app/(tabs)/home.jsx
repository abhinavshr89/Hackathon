import { View, Text, Button } from 'react-native';
import React from 'react';
import { logout } from '../../appwrite/appwrite'; // Import the logout function
import { useRouter } from 'expo-router'; // To navigate after logout

const Home = () => {
  const router = useRouter(); // Initialize the router for navigation

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      // Redirect to the sign-in screen after successful logout
      router.push('/sign-in');
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-center text-[50px] mt-9">Home</Text>
      {/* Temporary Logout Button */}
      <Button
        title="Logout"
        onPress={handleLogout}
        color="#FF0000" // Optional: change the button color
      />
    </View>
  );
};

export default Home;
