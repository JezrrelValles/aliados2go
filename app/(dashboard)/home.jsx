import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Card, IconButton, ProgressBar, Colors } from "react-native-paper";

// Datos de ejemplo para el dashboard
const dashboardData = {
  overview: [
    { title: "Ventas Totales", value: "$12,450", icon: "cash" },
    { title: "Nuevos Clientes", value: "358", icon: "account-plus" },
    { title: "Pedidos Pendientes", value: "12", icon: "clipboard-list" },
  ],
  progress: {
    title: "Completado del mes",
    current: 75,
    goal: 100,
  },
  recentActivity: [
    { id: 1, text: "Nuevo pedido de Juan Pérez (#1001)", type: "new_order" },
    { id: 2, text: "Mensaje de soporte de Ana Gómez", type: "message" },
    { id: 3, text: "Pago recibido de Empresa XYZ", type: "payment" },
    { id: 4, text: "Nuevo cliente registrado", type: "registration" },
  ],
};

const getIconForActivity = (type) => {
  switch (type) {
    case "new_order":
      return "cart-plus";
    case "message":
      return "message-text";
    case "payment":
      return "currency-usd";
    case "registration":
      return "account-check";
    default:
      return "information-outline";
  }
};

const Dashboard = () => {
  return (
    <View className="flex-1 bg-[#f5f5f5]">
      {/* Encabezado del Dashboard */}
      <View className="flex-row justify-between items-center p-4 bg-white border-b border-b-[#eee] shadow-md">
        <View className="flex-col">
          <Text className="text-2xl font-bold text-[#333]">Dashboard</Text>
          <Text className="text-base text-[#666]">Resumen de tu negocio</Text>
        </View>
        <IconButton
          icon="bell-outline"
          size={24}
          onPress={() => console.log("Notificaciones")}
        />
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Sección de Resumen */}
        <Text className="text-xl font-bold my-4 text-[#333]">
          Resumen General
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {dashboardData.overview.map((item, index) => (
            <Card key={index} className="w-[48%] mb-4 bg-white rounded-xl">
              <Card.Content>
                <IconButton
                  icon={item.icon}
                  color="#0235ED"
                  size={30}
                  className="mb-2"
                />
                <Text className="text-2xl font-bold">{item.value}</Text>
                <Text className="text-sm text-[#666]">{item.title}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Sección de Progreso */}
        <Card className="mb-5 rounded-xl">
          <Card.Content>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-base">{dashboardData.progress.title}</Text>
              <Text className="text-base font-bold text-[#0235ED]">
                {Math.round(
                  (dashboardData.progress.current /
                    dashboardData.progress.goal) *
                    100
                )}
                %
              </Text>
            </View>
            <ProgressBar
              progress={
                dashboardData.progress.current / dashboardData.progress.goal
              }
              color="#0235ED"
              className="h-2.5 rounded-full"
            />
          </Card.Content>
        </Card>

        {/* Sección de Actividad Reciente */}
        <Text className="text-xl font-bold my-4 text-[#333]">
          Actividad Reciente
        </Text>
        <View>
          {dashboardData.recentActivity.map((activity) => (
            <Card key={activity.id} className="mb-2.5 rounded-xl">
              <Card.Content className="flex-row items-center">
                <IconButton
                  icon={getIconForActivity(activity.type)}
                  color="#0235ED"
                  size={24}
                />
                <Text className="ml-2.5 text-base">{activity.text}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
