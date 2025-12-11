import React from "react";
import { View, Text, ScrollView } from "react-native";

export default function HistoryScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-bold mb-4">Histórico de Scans</Text>
      <View className="bg-white p-4 rounded-xl shadow">
        <Text>Sem registros ainda (mock)</Text>
      </View>
    </ScrollView>
  );
}
