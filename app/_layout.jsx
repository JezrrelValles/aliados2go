import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { Stack } from "expo-router";
import React from "react";
import "../global.css";
import { Colors } from "../constants/Colors";
import { PaperProvider } from "react-native-paper";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="(auth)/login"
          options={{
            title: "Iniciar Sesión",
            headerStyle: { backgroundColor: "#2305ED" },
            headerTintColor: "#F5F5F5",
          }}
        />
        <Stack.Screen
          name="(auth)/signup"
          options={{
            title: "Registro",
            headerStyle: { backgroundColor: "#2305ED" },
            headerTintColor: "#F5F5F5",
          }}
        />
      </Stack>
    </PaperProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
