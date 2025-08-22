import { ScrollView, View, Alert } from "react-native";
import React, { useState } from "react";
import {
  Card,
  Button,
  Dialog,
  Portal,
  Text,
  Checkbox,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import InfoCard from "./ui/InfoCard";

const initialSchedule = {
  lunes: {
    isOpen: false,
    startTime: new Date(new Date().setHours(6, 0, 0, 0)),
    endTime: new Date(new Date().setHours(22, 0, 0, 0)),
  },
  martes: {
    isOpen: false,
    startTime: new Date(new Date().setHours(6, 0, 0, 0)),
    endTime: new Date(new Date().setHours(22, 0, 0, 0)),
  },
  miercoles: {
    isOpen: false,
    startTime: new Date(new Date().setHours(6, 0, 0, 0)),
    endTime: new Date(new Date().setHours(22, 0, 0, 0)),
  },
  jueves: {
    isOpen: false,
    startTime: new Date(new Date().setHours(6, 0, 0, 0)),
    endTime: new Date(new Date().setHours(22, 0, 0, 0)),
  },
  viernes: {
    isOpen: false,
    startTime: new Date(new Date().setHours(6, 0, 0, 0)),
    endTime: new Date(new Date().setHours(22, 0, 0, 0)),
  },
};

const CalendarForm = ({ onNext }) => {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [showTimePicker, setShowTimePicker] = useState({
    visible: false,
    day: "",
    type: "",
  });

  const handleToggleDay = (day) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: {
        ...prevSchedule[day],
        isOpen: !prevSchedule[day].isOpen,
      },
    }));
  };

  const handleTimeChange = (event, selectedDate) => {
    const { day, type } = showTimePicker;
    setShowTimePicker({ visible: false, day: "", type: "" });
    if (selectedDate) {
      setSchedule((prevSchedule) => ({
        ...prevSchedule,
        [day]: {
          ...prevSchedule[day],
          [type]: selectedDate,
        },
      }));
    }
  };

  const handleNext = () => {
    const isAnyDayOpen = Object.values(schedule).some((day) => day.isOpen);
    if (!isAnyDayOpen) {
      Alert.alert("Error", "Debes seleccionar al menos un día de servicio.");
      return;
    }

    onNext(schedule);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const days = Object.keys(schedule);

  return (
    <View>
      <InfoCard
        title="Calendario"
        subtitle="Define tus días y horas de servicio"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {days.map((day) => (
          <View
            key={day}
            style={{ marginBottom: 10, marginTop: 10 }}
            className="border-2 border-primary rounded-lg"
          >
            <Checkbox.Item
              label={day.charAt(0).toUpperCase() + day.slice(1)}
              status={schedule[day].isOpen ? "checked" : "unchecked"}
              onPress={() => handleToggleDay(day)}
              color="#0235ED"
              uncheckedColor="#0235ED"
            />
            {schedule[day].isOpen && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  paddingHorizontal: 20,
                  marginTop: 10,
                  marginBottom: 10,
                  gap: 10,
                }}
              >
                <Button
                  onPress={() =>
                    setShowTimePicker({ visible: true, day, type: "startTime" })
                  }
                  textColor="#0235ED"
                  mode="elevated"
                  buttonColor="#F5F5F5"
                >
                  {formatTime(schedule[day].startTime)}
                </Button>
                <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
                  -
                </Text>
                <Button
                  onPress={() =>
                    setShowTimePicker({ visible: true, day, type: "endTime" })
                  }
                  textColor="#0235ED"
                  mode="elevated"
                  buttonColor="#F5F5F5"
                >
                  {formatTime(schedule[day].endTime)}
                </Button>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {showTimePicker.visible && (
        <DateTimePicker
          value={
            showTimePicker.type === "startTime"
              ? schedule[showTimePicker.day].startTime
              : schedule[showTimePicker.day].endTime
          }
          mode="time"
          is24Hour={true}
          onChange={handleTimeChange}
          minimumDate={new Date(new Date().setHours(6, 0, 0, 0))}
          maximumDate={new Date(new Date().setHours(22, 0, 0, 0))}
        />
      )}
      <Button
        mode="elevated"
        disabled={!Object.values(schedule).some((day) => day.isOpen)}
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
