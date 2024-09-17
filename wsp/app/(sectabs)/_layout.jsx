import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router"
import UserContextProvider from '../context/provider';
const AuthLayout = () => {
  return (
    <>
    
      <Stack>
        <Stack.Screen
          name="add-contacts"
          options={{
            headerShown: false,
          }}
        />
        
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />

   
    </>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})