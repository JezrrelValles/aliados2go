import React, { useState } from "react";
import { View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button, Text } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";

const VerifyCode = () => {
  const router = useRouter();
  const { confirmationResult } = useLocalSearchParams(); // recibido desde SignUp
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const confirmCode = async () => {
    if (!code) return Alert.alert("Error", "Ingresa el código recibido");
    try {
      setLoading(true);
      // confirmationResult viene de SignUp
      const credential = await confirmationResult.confirm(code);

      // Usuario autenticado con Firebase
      console.log("Usuario autenticado:", credential.user);

      // Aquí puedes guardar datos extra en Firestore si quieres
      // e.g., nombre, apellido, teléfono...

      Alert.alert("Éxito", "Tu número de teléfono ha sido verificado");
      router.replace("/(home)"); // redirige a home
    } catch (error) {
      Alert.alert("Error", "Código incorrecto: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center p-4 bg-white">
      <Text variant="headlineSmall" className="mb-4">
        Verifica tu código
      </Text>

      <TextInput
        label="Código de 6 dígitos"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        mode="outlined"
        style={{ width: "100%", backgroundColor: "#F5F5F5", marginBottom: 20 }}
      />

      <Button
        mode="contained"
        onPress={confirmCode}
        loading={loading}
        disabled={loading || code.length < 6}
      >
        Confirmar código
      </Button>
    </SafeAreaView>
  );
};

export default VerifyCode;
