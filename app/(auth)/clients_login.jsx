import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button, Divider } from "react-native-paper";
import InfoCard from "../../components/ui/InfoCard";

const ClientsLogin = () => {
  const router = useRouter();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="h-screen w-full items-center bg-background">
      <View className="w-[80%] grid grid-cols-1 items-center bg-background">
        <InfoCard
          title="Clientes"
          subtitle="Inicia sesión para solicitar servicios y gestionar tus solicitudes."
        />
        <View className="w-full gap-4 pt-4">
          <TextInput
            label="Teléfono"
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
          onPress={() => router.replace("(auth)/clients_signup")}
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

export default ClientsLogin;
