import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/img/small_logo.png";
import { TextInput, Button, Divider } from "react-native-paper";

const Login = () => {
  const router = useRouter();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="h-screen w-full items-center bg-background">
      <View className="w-[80%] grid grid-cols-1 items-center bg-background">
        <Image source={Logo} className="size-32" />
        <View className="grid grid-cols-1 gap-2">
          <Text className="text-4xl text-center text-foreground font-bold">
            Aliados2Go
          </Text>
          <Text className="text-foreground/50 text-xl text-center font-bold">
            Se parte de la comunidad de proveedores más grande de México
          </Text>
        </View>
        <View className="w-full gap-4 pt-4">
          <TextInput
            label="Correo electrónico o teléfono"
            value={credential}
            onChangeText={(text) => setCredential(text)}
            mode="outlined"
            style={{ backgroundColor: "#F5F5F5" }}
            activeOutlineColor="#0235ED"
            outlineColor="#0235ED"
            placeholder="Escribe aqui..."
          />
          <TextInput
            label="Contraseña"
            value={password}
            onChangeText={(text) => setPassword(text)}
            mode="outlined"
            activeOutlineColor="#0235ED"
            outlineColor="#0235ED"
            style={{ backgroundColor: "#F5F5F5" }}
            placeholder="Escribe aqui..."
          />
          <Button mode="elevated" buttonColor="#2305ED" textColor="#F5F5F5">
            <Text>Iniciar sesión</Text>
          </Button>
          <Divider bold />
        </View>
        <Button
          onPress={() => router.replace("(auth)/signup")}
          mode="elevated"
          buttonColor="#F5F5F5"
          className="mt-4 w-full"
        >
          <Text className="color-primary">
            No tienes cuenta? Registrate aquí
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Login;
