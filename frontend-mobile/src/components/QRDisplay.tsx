import React from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function QRDisplay({ data, size = 160 }: { data: string; size?: number }) {
  return (
    <View style={{ backgroundColor: "#fff", padding: 18, borderRadius: 16, alignItems: "center", justifyContent: "center" }}>
      <QRCode value={data} size={size} />
    </View>
  );
}
