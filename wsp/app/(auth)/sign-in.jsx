import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants";
import { Image } from 'react-native';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, useRouter } from "expo-router";
import { signIn } from '../../appwrite/appwrite'; // Import the signIn function
import { checkSession } from '../../appwrite/appwrite';

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  useState(()=>{
    checkSession();
  },[])

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // Initialize the router for navigation

  const submit = async () => {
    setIsSubmitting(true);
    try {
      
      const user = await signIn(form.email, form.password);
      console.log("User signed in:", user);

     
      router.push('/home');
    } catch (error) {
      console.error("Sign in failed: ", error.message);
      Alert.alert("Sign In Error", error.message || "An error occurred during sign in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary w-full h-full">
      <ScrollView>
        <View className="w-full h-full justify-center px-4">
          <View className="flex flex-row items-end">
            <Image source={images.wsaLogo} resizeMode="contain"
              className="w-[47px] ml-[-7px] h-[35px] mt-[60px]"
            />
            <Text className="text-white text-2xl font-psemibold">Safe </Text>
            <Text className="text-second text-2xl font-psemibold">Her</Text>
          </View>

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to your Account
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
           
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7 bg-second"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-second"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
