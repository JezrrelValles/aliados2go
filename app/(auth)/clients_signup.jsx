import { View, Text } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import ClientsForm from "../../components/ClientsForm";

const ClientsSignUp = () => {
  const router = useRouter();

  return (
    <View className="grid grid-cols-1 p-4 h-screen w-full bg-background">
      <ClientsForm />
    </View>
  );
};

export default ClientsSignUp;
