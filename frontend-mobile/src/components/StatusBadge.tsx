import React from "react";
import { View, Text } from "react-native";

export default function StatusBadge({ status }: { status: string }) {
  const bg = status === "operating" ? "#ECFDF5" : status === "warning" ? "#FFFBEB" : "#FEF2F2";
  const color = status === "operating" ? "#059669" : status === "warning" ? "#D97706" : "#DC2626";
  return (
    <View style={{ backgroundColor: bg, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
      <Text style={{ color, fontWeight: "600", fontSize: 12 }}>{status}</Text>
    </View>
  );
}
