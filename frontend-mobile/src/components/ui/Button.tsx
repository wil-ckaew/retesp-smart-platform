import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

export default function Button({
  title,
  ...rest
}: TouchableOpacityProps & { title?: string }) {
  return (
    <TouchableOpacity
      {...rest}
      className="bg-blue-600 py-3 rounded-lg items-center justify-center"
    >
      <Text className="text-white font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}
