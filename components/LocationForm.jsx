import { ScrollView, View, Alert } from "react-native";
import React, { useState } from "react";
import {
  Card,
  Button,
  Dialog,
  Portal,
  Text,
  Checkbox,
  TextInput,
} from "react-native-paper";
import InfoCard from "./ui/InfoCard";

const LocationForm = ({ onNext }) => {
  const [zipCode, setZipCode] = useState("");
  const [hasLocal, setHasLocal] = useState(false);
  const [address, setAddress] = useState("");

  const handleNext = () => {
    if (!zipCode) {
      Alert.alert("Error", "Por favor, ingresa tu código postal.");
      return;
    }

    const locationData = {
      zipCode,
      hasLocal,
      address: hasLocal ? address : null,
    };

    onNext(locationData);
  };

  return (
    <View className="p-4 gap-4">
      <InfoCard title="Ubicación" subtitle="Agrega tu código postal" />
      <TextInput
        label="Código Postal"
        value={zipCode}
        onChangeText={setZipCode}
        style={{ backgroundColor: "#F5F5F5" }}
        activeOutlineColor="#0235ED"
        outlineColor="#0235ED"
        mode="outlined"
        keyboardType="numeric"
      />

      <View className="flex-row items-center gap-2">
        <Checkbox
          status={hasLocal ? "checked" : "unchecked"}
          onPress={() => setHasLocal(!hasLocal)}
          color="#0235ED"
        />
        <Text className="text-lg">
          Tengo un local y deseo agregar mi dirección
        </Text>
      </View>

      {hasLocal && (
        <TextInput
          label="Dirección (Calle, número, colonia)"
          value={address}
          onChangeText={setAddress}
          style={{ backgroundColor: "#F5F5F5" }}
          activeOutlineColor="#0235ED"
          outlineColor="#0235ED"
          mode="outlined"
        />
      )}

      <Button
        mode="elevated"
        disabled={!zipCode} // Desactiva el botón si el zipCode está vacío
        onPress={handleNext}
        buttonColor="#0235ED"
        textColor="#F5F5F5"
      >
        Siguiente
      </Button>
    </View>
  );
};

export default LocationForm;
