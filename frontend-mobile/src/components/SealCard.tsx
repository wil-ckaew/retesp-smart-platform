import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../utils/constants";

export default function SealCard({ serial, batch, health, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginBottom: 12 }}>
      <View style={{ backgroundColor: "#fff", padding: 14, borderRadius: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", elevation: 2 }}>
        <View>
          <Text style={{ fontWeight: "700" }}>{serial}</Text>
          <Text style={{ color: "#64748b" }}>{batch}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "700", color: health >= 80 ? "#10B981" : health >= 60 ? "#F59E0B" : "#EF4444" }}>{health}%</Text>
          <Text style={{ color: "#94a3b8", fontSize: 12 }}>Saúde</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
