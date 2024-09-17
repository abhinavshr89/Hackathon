import { ScrollView, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants";
import { Image } from 'react-native';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from "expo-router";
import { createUser } from '../../appwrite/appwrite';

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    phone: "",
    username: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async () => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Call createUser function to register the user
      const newUser = await createUser(
        form.email,
        form.password,
        form.username,
        form.phone
      );

      if (newUser) {
        // If successful, redirect to home screen
        router.push("/home");
      }
    } catch (error) {
      // Handle any errors that occur during registration
      setErrorMessage(error.message || "Something went wrong during registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary w-full h-full">
      <ScrollView>
        <View className="w-full h-full justify-center px-4">
          <View className="flex flex-row items-end">
            <Image
              source={images.wsaLogo}
              resizeMode="contain"
              className="w-[47px] ml-[-7px] h-[35px] mt-[60px]"
            />
            <Text className="text-white text-2xl font-psemibold">Safe </Text>
            <Text className="text-second text-2xl font-psemibold">Her</Text>
          </View>
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign Up
          </Text>

          {errorMessage ? (
            <Text className="text-red-500 mt-2">{errorMessage}</Text>
          ) : null}

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(text) => setForm({ ...form, username: text })}
            otherStyles="mt-7"
          />

          <FormField
            title="Mobile No"
            value={form.phone}
            handleChangeText={(text) => setForm({ ...form, phone: text })}
            otherStyles="mt-7"
            keyboardType="phone-pad"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(text) => setForm({ ...form, email: text })}
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
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7 bg-second"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-second"
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
