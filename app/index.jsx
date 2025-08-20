import { View, Text, Pressable, Image, SafeAreaView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Logo from "../assets/img/small_logo.png";
import { useRouter } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { Card } from "react-native-paper";

const Home = () => {
  const router = useRouter();

  return (
    <PaperProvider>
    <SafeAreaView className="items-center bg-background h-screen w-full">
      <View className="w-[80%] grid grid-cols-1 gap-4 items-center justify-center">
        <Image source={Logo} className="size-64" />
        <View className="grid grid-cols-1 gap-2">
          <Text className="text-4xl text-center text-foreground font-bold">
            Aliados2Go
          </Text>
          <Text className="text-foreground/50 text-xl text-center font-bold">
            Se parte de la comunidad de proveedores más grande de México
          </Text>
        </View>
        <View className="grid grid-cols-1 gap-4 w-full">
          <Pressable
            className="bg-primary rounded-full p-4"
            onPress={() => router.replace("/login")}
          >
            <Text className="color-background text-center font-bold">
              Proveedores
            </Text>
          </Pressable>
          <Pressable
            className="bg-background rounded-full border-foreground border-1 p-4"
            onPress={() => router.replace("/login")}
          >
            <Text className="color-primary text-center font-bold">
              Clientes
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
    </PaperProvider>
  );
};

export default Home;
