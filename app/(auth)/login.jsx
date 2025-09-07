import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button, Divider } from "react-native-paper";
import InfoCard from "../../components/ui/InfoCard";
import { login } from "../../services/services";

const Login = () => {
  const router = useRouter();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handLeLogin = async () => {
    if (!credential || !password) {
      Alert.alert("Por favor, ingresa tus credenciales");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await login(credential, password);
      console.log("Login exitoso: ", userCredential.user);

      router.replace("(dashboard)/home");
    } catch (error) {
      console.error("Error en login: ", error.message);
      Alert.alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-screen w-full items-center bg-background">
      <View className="w-[80%] grid grid-cols-1 items-center bg-background">
        <InfoCard
          title="Proveedores"
          subtitle="Inicia sesión para acceder a tus servicios y gestionar tus solicitudes."
        />
        <View className="w-full gap-4 pt-4">
          <TextInput
            label="Correo electrónico o teléfono"
            value={credential}
            onChangeText={setCredential}
            mode="outlined"
            style={{ backgroundColor: "#F5F5F5" }}
            activeOutlineColor="#0235ED"
            outlineColor="#0235ED"
            placeholder="Escribe aqui..."
          />
          <TextInput
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            activeOutlineColor="#0235ED"
            outlineColor="#0235ED"
            style={{ backgroundColor: "#F5F5F5" }}
            placeholder="Escribe aqui..."
          />
          <Button mode="elevated" buttonColor="#2305ED" textColor="#F5F5F5" onPress={handLeLogin} loading={loading}>
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
