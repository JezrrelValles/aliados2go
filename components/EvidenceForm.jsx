import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Card, Button, Dialog, Portal, TextInput } from "react-native-paper";
import InfoCard from "./ui/InfoCard";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";

const EvidenceForm = ({ onNext }) => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState();
  const [minPrice, setMinPrice] = useState("");
  const [services, setServices] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    clearFields();
  };

  // 👈 Nueva función para limpiar los campos del formulario
  const clearFields = () => {
    setName("");
    setDescription("");
    setCategory(undefined);
    setMinPrice("");
  };

  const categories = [
    { id: 1, name: "Hogar" },
    { id: 2, name: "Climatización" },
    { id: 3, name: "Electricidad" },
    { id: 4, name: "Eventos" },
    { id: 5, name: "Catering" },
  ];

  // 👈 Nueva función para agregar un servicio a la lista
  const handleAddService = () => {
    if (!name || !description || !category || !minPrice) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    const newService = {
      id: Date.now(), // 👈 Genera un ID único para cada servicio
      name,
      description,
      categoryId: category,
      minPrice: minPrice,
    };

    setServices((currentServices) => [...currentServices, newService]); // 👈 Actualiza el estado de los servicios
    hideDialog(); // Cierra el diálogo y limpia los campos
  };

  const handleNext = () => {
    if (services.length === 0) {
      Alert.alert("Error", "Debes agregar al menos un servicio.");
      return;
    }
    // Llama a la prop onNext pasando la lista completa de servicios
    onNext({ services });
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });
      console.log("Resultado del DocumentPicker:", result); // Agrega esta línea

      if (result.assets) {
        const newDoc = {
          uri: result.assets[0].uri,
          name: result.assets[0].name,
        };
        setSelectedDocuments([...selectedDocuments, newDoc]);
      }
    } catch (e) {
      console.error(e);
      Alert.alert(
        "Error",
        "No se pudo seleccionar el documento. Inténtalo de nuevo."
      );
    }
  };

  return (
    <View className="p-4 gap-4">
      <InfoCard
        title="Evidencias"
        subtitle="Agrega a tu carpeta de evidencias tus servicios previos"
      />
      <Button
        mode="elevated"
        buttonColor="#F5F5F5"
        style={{ borderColor: "#2305ED" }}
        textColor="#0235ED"
        onPress={showDialog}
      >
        Agregar evidencia
      </Button>

      {/* 👈 Muestra la lista de servicios agregados */}
      {services.map((service) => (
        <Card
          key={service.id}
          mode="elevated"
          style={{ backgroundColor: "#F5F5F5", marginTop: "4" }}
        >
          <Card.Title
            title={service.name}
            subtitle={service.description}
            subtitleNumberOfLines={2}
            titleVariant="titleLarge"
            subtitleVariant="bodyMedium"
          />
          <Card.Content className="flex-row gap-2 items-center mt-4 justify-end">
            <Text color className="bg-primary/20 text-primary rounded p-2">
              {categories.find((cat) => cat.id === service.categoryId)?.name}
            </Text>
            <Text className="bg-success/20 p-2 text-success rounded">
              Desde: {service.minPrice}
            </Text>
          </Card.Content>
        </Card>
      ))}

      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{ backgroundColor: "#F5F5F5" }}
        >
          <Dialog.ScrollArea>
            <ScrollView>
              <View className="flex-1 gap-2 p-2">
                <Text className="text-2xl">Agregar Evidencia</Text>
                <Text className="text-xl">
                  Completa los campos para continuar
                </Text>
                <TextInput
                  label="Nombre del servicio"
                  placeholder="Ingresa el nombre del servicio"
                  value={name}
                  onChangeText={setName}
                  mode="outlined"
                  activeOutlineColor="#0235ED"
                  outlineColor="#0235ED"
                  style={{ backgroundColor: "#F5F5F5" }}
                />
                <TextInput
                  label="Descripción"
                  placeholder="Ingresa la descripción del servicio"
                  value={description}
                  onChangeText={setDescription}
                  mode="outlined"
                  multiline={true}
                  activeOutlineColor="#0235ED"
                  outlineColor="#0235ED"
                  className="p-2"
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingTop: "8",
                    paddingBottom: "8",
                  }}
                />
                <Picker
                  selectedValue={category}
                  onValueChange={(itemValue) => setCategory(itemValue)}
                >
                  <Picker.Item
                    label="Selecciona una categoría"
                    value={undefined}
                  />
                  {categories.map((cat) => (
                    <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
                  ))}
                </Picker>
                <TouchableOpacity
                  onPress={pickDocument}
                  className="border-2 border-dashed border-primary p-6 rounded-md items-center"
                >
                  <Text className="text-blue-500 font-bold">
                    Seleccionar Documento
                  </Text>
                </TouchableOpacity>
                <View className="flex-row justify-end gap-2">
                  <Button
                    mode="elevated"
                    buttonColor="#F5F5F5"
                    textColor="#0235ED"
                    onPress={hideDialog}
                  >
                    Cancelar
                  </Button>
                  <Button
                    mode="elevated"
                    buttonColor="#0235ED"
                    textColor="#F5F5F5"
                    onPress={handleAddService} // 👈 Llama a la nueva función
                  >
                    Agregar
                  </Button>
                </View>
              </View>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>

      <Button
        mode="elevated"
        onPress={handleNext}
        buttonColor="#0235ED"
        textColor="#F5F5F5"
      >
        Siguiente
      </Button>
    </View>
  );
};

export default EvidenceForm;
