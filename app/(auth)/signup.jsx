import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { ProgressBar, Colors } from "react-native-paper";

import PersonalInfoForm from "../../components/PersonalInfoForm";
import ServicesForm from "../../components/ServicesForm";
import DocumentsForm from "../../components/DocumentsForm";
import EvidenceForm from "../../components/EvidenceForm";

const SignUp = () => {
  const router = useRouter();
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(true);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);

  const handleStepOne = (data) => {
    console.log("Información personal: ", data);
    Alert.alert("Datos enviados: " + JSON.stringify(data));
    setStepOne(true);
  };

  const handleStepTwo = (data) => {
    console.log("Servicios: ", data);
    Alert.alert("Datos enviados: " + JSON.stringify(data));
    setStepTwo(true);
  };

  const handleStepThree = (data) => {
    console.log("Documentos oficiales: ", data);
    Alert.alert("Datos enviados: " + JSON.stringify(data));
    setStepThree(true);
  };

  const handleStepFour = (data) => {
    console.log("Evidencias: ", data);
    Alert.alert("Datos enviados: " + JSON.stringify(data));
    setStepFour(true);
  };

  // Calcula el progreso
  const progress = 
    (stepOne ? 1 : 0) +
    (stepTwo ? 1 : 0) +
    (stepThree ? 1 : 0) +
    (stepFour ? 1 : 0);
    
  const progressPercentage = progress / 4; // divide entre total de pasos

  return (
    <View className="grid grid-cols-1 p-4 h-screen w-full bg-background">
      <ProgressBar 
        progress={progressPercentage}
        theme={{ colors: { primary: "#0235ED"}}}
        style={{ height: 10, borderRadius: 5, marginBottom: 16, backgroundColor: "#CCD6F9" }} 
      />
      {!stepOne && <PersonalInfoForm onNext={handleStepOne} />}
      {stepOne && !stepTwo && <ServicesForm onNext={handleStepTwo} />}
      {stepTwo && !stepThree && <DocumentsForm onNext={handleStepThree} />}
      {stepThree && !stepFour && <EvidenceForm onNext={handleStepFour} />}
    </View>
  );
};

export default SignUp;
