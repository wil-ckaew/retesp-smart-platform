import React from "react";
import { View, Text } from "react-native";

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-gray-50 p-6">
      <Text className="text-2xl font-bold">Configurações</Text>
      <Text className="mt-4">Tema, notificações e conta</Text>
    </View>
  );
}
