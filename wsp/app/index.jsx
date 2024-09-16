import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router'; // Import Link from expo-router
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../constants"
import { Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';
export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">


      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >


        <View className="w-full flex justify-center items-center h-full px-4">
          <View className="flex flex-row px-2 justify-center items-center relative">
            <Image
              source={images.wsaLogo}
              className="w-[70px] h-[64px]"
              resizeMode="contain"
            />
            
            <Text className="text-white text-2xl font-psemibold">Safe </Text>
            <Text className="text-second text-2xl font-psemibold">Her</Text>
            {/* <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute bottom-2 -right-10"
              resizeMode="contain"
            /> */}
          </View>

          <Image
            source={images.unitedHands}
            className="max-w-[380px] w-[70%] h-[298px] "
            resizeMode="contain"
          />

          <View className="relative mt-3">
            <Text className="text-2xl text-white font-bold text-center">
              Empower Her, Protect Her{"\n"}
              Safety at Her Fingertips{" "}
              {/* <Text className="text-secondary-200">Aora</Text> */}
            </Text>

          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
          Your Safety, Our Priority – Anytime, Anywhere
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7 bg-second"
          />
        </View>

      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}

