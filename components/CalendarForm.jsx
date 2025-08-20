import { ScrollView, View } from "react-native";
import React, { useState } from "react";
import { Card, Button, Dialog, Portal, Text } from "react-native-paper";

const CalendarForm = ({ onNext }) => {
  const [visible, setVisible] = useState(false);
  const [services, setServices] = useState("1");
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleNext = () => {
    // Validaciones
    if (!services) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    onNext({ services });
  };

  return (
    <View className="p-4 gap-4">
      <Text variant="titleLarge">Agenda</Text>
      <Button mode="text" textColor="#0235ED" onPress={showDialog}>
        Agregar horario
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
              <Text>Scrollable</Text>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>
      <Card>
        <Card.Title title="Test" subtitle="Testing" />
        <Card.Content>
          <Text>101</Text>
        </Card.Content>
        <Card.Actions>
          <Button>Press me</Button>
        </Card.Actions>
      </Card>
      <Button
        mode="elevated"
        disabled={services ? true : false}
        onPress={handleNext}
        buttonColor="#0235ED"
        textColor="#F5F5F5"
      >
        Siguiente
      </Button>
    </View>
  );
};

export default CalendarForm;
