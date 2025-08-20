import { ScrollView, View, Text, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Card, Button, Dialog, Portal, TextInput } from "react-native-paper";
import InfoCard from "./ui/InfoCard";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";

const ServicesForm = ({ onNext }) => {
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState();
  const [subcategory, setSubcategory] = useState();
  const [selectedTags, setSelectedTags] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    clearFields();
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });

      console.log(result);

      if (result) {
        setSelectedDocument(result);
      }
    } catch (e) {
      console.error(e);
      Alert.alert(
        "Error",
        "No se pudo seleccionar el documento. Inténtalo de nuevo."
      );
    }
  };

  const clearFields = () => {
    setCategory(undefined);
    setSubcategory(undefined);
    setSelectedTags([]);
  };

  const categories = [
    {
      id: 1,
      name: "Servicios Generales",
      subcategories: [
        "Plomería",
        "Electricidad",
        "Carpintería",
        "Pintura",
        "Limpieza",
      ],
      tags: [
        "Instalación",
        "Reparación",
        "Mantenimiento",
        "Residencial",
        "Industrial",
      ],
    },
    {
      id: 2,
      name: "Automotriz",
      subcategories: ["Mecánica", "Carrocería", "Cerrajería automotriz"],
      tags: ["diagnóstico", "reparación"],
    },
    {
      id: 3,
      name: "Salud y Bienestar",
      subcategories: [
        "Médicos",
        "Dentistas",
        "Psicología",
        "Nutrición",
        "Bienestar",
      ],
      tags: ["consulta", "especialista"],
    },
    {
      id: 4,
      name: "Eventos y Entretenimiento",
      subcategories: [
        "Fotografía",
        "Música",
        "Banquetes",
        "Decoración",
        "Animación",
      ],
      tags: ["boda", "cumpleaños", "corporativo"],
    },
    {
      id: 5,
      name: "Profesionales",
      subcategories: ["Legales", "Contabilidad", "Diseño", "Consultoría"],
      tags: ["asesoría", "proyecto", "cotización", "especialista"],
    },
  ];

  const handleAddService = () => {
    if (!category || !subcategory) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    const newService = {
      id: Date.now(),
      categoryId: category,
      subcategory,
      tags: selectedTags,
    };

    setServices((currentServices) => [...currentServices, newService]);
    hideDialog();
  };

  const handleNext = () => {
    if (services.length === 0) {
      Alert.alert("Error", "Debes agregar al menos un servicio.");
      return;
    }
    onNext({ services });
  };

  return (
    <View className="p-4 gap-4">
      <InfoCard
        title="Servicios"
        subtitle="Agrega todos los servicios que ofreces"
      />

      <Button
        mode="elevated"
        buttonColor="#F5F5F5"
        style={{ borderColor: "#0235ED" }}
        textColor="#0235ED"
        onPress={showDialog}
      >
        Agregar servicio
      </Button>

      {/* Lista de servicios agregados */}
      {services.map((service) => (
        <Card
          key={service.id}
          mode="elevated"
          style={{ backgroundColor: "#F5F5F5", marginTop: 8 }}
        >
          <Card.Title
            title={categories.find((cat) => cat.id === service.categoryId)?.name}
            subtitle={service.subcategory}
            subtitleNumberOfLines={2}
            titleVariant="titleLarge"
            subtitleVariant="bodyMedium"
          />
          <Card.Content className="flex-row items-center gap-2 mt-4">
            <Text className="bg-primary/20 text-primary rounded p-2">
              {categories.find((cat) => cat.id === service.categoryId)?.name} - {service.subcategory}
            </Text>
            <View>
              {service.tags.map((tag) => (
                <Text
                  key={tag}
                  className="bg-success/20 p-2 text-success rounded"
                >
                  {tag}
                </Text>
              ))}
            </View>
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
                <Text className="text-2xl">Agregar Servicio</Text>
                {/* Picker de categoría */}
                <Picker
                  selectedValue={category}
                  onValueChange={(itemValue) => {
                    setCategory(itemValue);
                    setSubcategory(undefined); // reset subcategoría al cambiar categoría
                    setSelectedTags([]);
                  }}
                >
                  <Picker.Item
                    label="Selecciona una categoría"
                    value={undefined}
                  />
                  {categories.map((cat) => (
                    <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
                  ))}
                </Picker>

                {/* Picker de subcategoría */}
                {category && (
                  <Picker
                    selectedValue={subcategory}
                    onValueChange={(itemValue) => setSubcategory(itemValue)}
                  >
                    <Picker.Item
                      label="Selecciona una subcategoría"
                      value={undefined}
                    />
                    {categories
                      .find((cat) => cat.id === category)
                      ?.subcategories.map((sub, index) => (
                        <Picker.Item key={index} label={sub} value={sub} />
                      ))}
                  </Picker>
                )}

                {/* Selección de tags */}
                {subcategory && (
                  <View className="flex-row flex-wrap gap-2 mt-2 items-center justify-center">
                    {categories
                      .find((cat) => cat.id === category)
                      ?.tags.map((tag) => (
                        <Button
                          key={tag}
                          mode={
                            selectedTags.includes(tag)
                              ? "contained"
                              : "outlined"
                          }
                          onPress={() => {
                            if (selectedTags.includes(tag)) {
                              setSelectedTags(
                                selectedTags.filter((t) => t !== tag)
                              );
                            } else {
                              setSelectedTags([...selectedTags, tag]);
                            }
                          }}
                          style={{
                            margin: 4,
                            backgroundColor: selectedTags.includes(tag)
                              ? "#0235ED"
                              : "#F5F5F5",
                            borderColor: selectedTags.includes(tag)
                              ? "#0235ED"
                              : "#0235ED",
                          }}
                        >
                          <Text
                            className={
                              selectedTags.includes(tag)
                                ? "text-background"
                                : "text-primary"
                            }
                          >
                            {tag}
                          </Text>
                        </Button>
                      ))}
                  </View>
                )}

                {selectedTags.length > 0 && (
                  <TouchableOpacity
                    onPress={pickDocument}
                    className="border-2 border-dashed border-primary p-6 rounded-md items-center"
                  >
                    {/* Aquí se usa una lógica condicional para mostrar el nombre del archivo o el texto por defecto */}
                    <Text className="text-blue-500 font-bold" numberOfLines={1}>
                      {selectedDocument
                        ? selectedDocument.assets[0].name
                        : "Subir documento"}
                    </Text>
                  </TouchableOpacity>
                )}
                <View className="flex-row justify-end gap-2 mt-4">
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
                    onPress={handleAddService}
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

export default ServicesForm;
