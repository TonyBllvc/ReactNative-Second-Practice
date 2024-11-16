import { Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in" // has to bare same name as..
          // .. the component you're referencing
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up" // has to bare same name as..
          // .. the component you're referencing
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      {/* Helps with the status bar color */}
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
