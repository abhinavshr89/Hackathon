import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { logout, getCurrentAccount } from '../../appwrite/appwrite';
import { useRouter } from 'expo-router';
import { images } from '../../constants';

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
 
  const router = useRouter();

  // Function to handle logout
  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      router.push('/sign-in');
    }
  };

  // Fetch the current user information when the component mounts
  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const accountData = await getCurrentAccount();
        setUserInfo(accountData);
       
        
      } catch (error) {
        console.error("Error fetching account info:", error.message);
      }
    };

    fetchAccountInfo();
  }, []);


  const handlePress=()=>{
    router.push("/add-contacts")
  }

  return (
    <View className="flex-1 px-4 h-[100vh] bg-primary">
      <View className="flex flex-row items-end">
        <Image
          source={images.wsaLogo}
          resizeMode="contain"
          className="w-[47px] ml-[-7px] h-[35px] mt-[60px]"
        />
        <Text className="text-white text-2xl font-psemibold">Safe </Text>
        <Text className="text-second text-2xl font-psemibold">Her</Text>
      </View>

      {/* Display user information */}
      {userInfo ? (
        <View>
          <Text className="text-white font-psemibold mt-6 text-xl">
            Welcome, {userInfo.name}!
          </Text>
        </View>
      ) : (
        <Text className="text-white mt-6 font-psemibold text-xl">Loading user information...</Text>
      )}

      {/* Box with 3D effect */}
      <TouchableOpacity style={styles.box} className=" flex justify-center px-4 border-[3px] border-second bg-black-200"
      onPress={handlePress}
      >
        <Text className="text-2xl font-pmedium text-second ">Add Contacts</Text>
      </TouchableOpacity>

      <View style={styles.box} className=" flex justify-center px-4 border-[3px] border-second bg-black-200" >
        <Text className="text-2xl font-pmedium text-second ">Panic mode</Text>
      </View>

      <View className="mt-8">
        <Button
          title="Logout"
          onPress={handleLogout}
          color="#FF0000" // Optional: change the button color
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 70,
    borderRadius: 16,
    marginTop: 24,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,


    transform: [
      { perspective: 1000 },

    ],
  },
});

export default Home;
