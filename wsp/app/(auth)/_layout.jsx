import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router"
import UserContextProvider from '../context/provider';
const AuthLayout = () => {
  return (
    <>
    <UserContextProvider>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </UserContextProvider>
    </>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})