import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";
import { colors } from "../utils/constants";
import SealCard from "../components/SealCard";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [{ data: [90, 85, 88, 86, 87] }],
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold">Olá, Admin</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Scanner")}>
          <View style={{ backgroundColor: colors.blue, padding: 10, borderRadius: 12 }}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>Escanear</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="bg-white p-4 rounded-xl shadow mb-4">
        <Text className="font-semibold mb-2">Visão Geral — Saúde média</Text>
        {/* Small chart using react-native-chart-kit (if installed). This is a placeholder */}
        <LineChart
          data={data}
          width={320}
          height={140}
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: () => colors.blue,
            labelColor: () => (theme === "dark" ? "#94a3b8" : "#475569"),
          }}
          bezier
          style={{ borderRadius: 12 }}
        />
      </View>

      <Text className="text-lg font-semibold mb-2">Retentores com atenção</Text>
      <SealCard
        serial="RET-0001"
        batch="BATCH-2024-01"
        health={72}
        onPress={() => navigation.navigate("SealDetail", { sealId: "0001" })}
      />
      <SealCard
        serial="RET-0002"
        batch="BATCH-2024-02"
        health={95}
        onPress={() => navigation.navigate("SealDetail", { sealId: "0002" })}
      />
    </ScrollView>
  );
}
