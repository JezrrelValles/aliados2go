import React, { useRef, useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import { Button } from "react-native-paper";
import { CameraView, useCameraPermissions } from "expo-camera";
import InfoCard from "./ui/InfoCard";

const DocumentsForm = ({ onNext }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  // Fotos
  const [officialID, setOfficialID] = useState(null);
  const [selfie, setSelfie] = useState(null);

  // Flujo
  const [step, setStep] = useState("id"); // "id" o "selfie"
  const [showCamera, setShowCamera] = useState(true);

  if (!permission) {
    return <View className="flex-1" />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 p-4 items-center justify-center">
        <Text className="mb-3 text-center">
          Necesitamos permiso para acceder a tu cámara.
        </Text>
        <Button mode="contained" onPress={requestPermission}>
          Conceder permiso
        </Button>
      </View>
    );
  }

  const takePicture = async () => {
    try {
      if (!cameraRef.current) return;
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
      });

      if (!photo?.uri) {
        Alert.alert("Error", "No se pudo capturar la foto. Intenta de nuevo.");
        return;
      }

      if (step === "id") {
        setOfficialID(photo.uri);
      } else {
        setSelfie(photo.uri);
      }
      setShowCamera(false);
    } catch (err) {
      console.log("Error tomando foto", err);
      Alert.alert("Error", "Ocurrió un problema al tomar la foto.");
    }
  };

  const handleNextStep = () => {
    if (step === "id") {
      setStep("selfie");
      setShowCamera(true);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    if (!officialID || !selfie) {
      Alert.alert(
        "Faltan fotos",
        "Debes tomar ambas fotos antes de continuar."
      );
      return;
    }
    onNext?.({ officialID, selfie });
  };

  const retakePhoto = () => {
    if (step === "id") {
      setOfficialID(null);
    } else {
      setSelfie(null);
    }
    setShowCamera(true);
  };

  const renderCameraView = () => (
    <View className="flex-1 overflow-hidden rounded-2xl">
      <View style={{ flex: 1 }}>
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing={step === "id" ? "back" : "front"}
          mode="picture"
        />

        {/* Zona de interés */}
        {step === "id" ? (
          // Rectángulo para INE
          <View
            style={{
              position: "absolute",
              top: "35%",
              alignSelf: "center",
              width: "70%",
              height: "30%",
              borderWidth: 3,
              borderColor: "#0235ED",
              borderRadius: 12,
              backgroundColor: "rgba(0,0,0,0.15)",
            }}
          />
        ) : (
          // Círculo para rostro
          <View
            style={{
              position: "absolute",
              top: "15%",
              alignSelf: "center",
              width: 250,
              height: 250,
              borderWidth: 3,
              borderColor: "#0235ED",
              borderRadius: 125,
              backgroundColor: "rgba(0,0,0,0.15)",
            }}
          />
        )}

        {/* Botón de captura */}
        <View className="absolute bottom-4 w-full items-center">
          <Button
            mode="contained"
            onPress={takePicture}
            buttonColor="#0235ED"
            textColor="#F5F5F5"
            icon="camera"
          >
            {step === "id" ? "Tomar foto identificación" : "Tomar selfie"}
          </Button>
        </View>
      </View>
    </View>
  );

  const renderPreviewView = (uri) => (
    <View className="flex-1 items-center justify-center">
      <Image
        source={{ uri }}
        style={{ width: "100%", height: "100%", borderRadius: 8 }}
        resizeMode="contain"
      />
      <View className="absolute bottom-6 w-full flex-row justify-center">
        <View style={{ marginRight: 12 }}>
          <Button mode="elevated" textColor="#0235ED" buttonColor="#F5F5F5" onPress={retakePhoto} icon="camera-retake">
            Volver a tomar
          </Button>
        </View>
        <Button mode="elevated" buttonColor="#0235ED" textColor="#F5F5F5" onPress={handleNextStep} icon="check">
          {step === "id" ? "Siguiente" : "Finalizar"}
        </Button>
      </View>
    </View>
  );

  return (
    <View className="flex-1 p-4 gap-4">
      <InfoCard
        title="Documentación Oficial"
        subtitle="Toma una foto de tu identificación oficial y una selfie para comprobar tu identidad"
      />

      <View className="flex-1">
        {showCamera && renderCameraView()}
        {!showCamera &&
          step === "id" &&
          officialID &&
          renderPreviewView(officialID)}
        {!showCamera &&
          step === "selfie" &&
          selfie &&
          renderPreviewView(selfie)}
      </View>

      {/* Thumbnails de previsualización */}
      <View className="flex-row justify-between mt-2">
        {officialID && (
          <View>
            <Text className="text-center mb-1">Identificación</Text>
            <Image
              source={{ uri: officialID }}
              style={{ width: 100, height: 100, borderRadius: 8 }}
            />
          </View>
        )}
        {selfie && (
          <View>
            <Text className="text-center mb-1">Identidad</Text>
            <Image
              source={{ uri: selfie }}
              style={{ width: 100, height: 100, borderRadius: 8 }}
            />
          </View>
        )}
      </View>

      <Button
        mode="elevated"
        onPress={handleFinish}
        disabled={!officialID || !selfie}
        className="mt-4 rounded-md"
        buttonColor="#0235ED"
        textColor="#F5F5F5"
      >
        Siguiente
      </Button>
    </View>
  );
};

export default DocumentsForm;
