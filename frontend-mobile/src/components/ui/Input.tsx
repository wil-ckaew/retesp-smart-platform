import React from "react";
import { TextInput, TextInputProps } from "react-native";

export default function Input(props: TextInputProps) {
  return (
    <TextInput
      {...props}
      placeholderTextColor="#9CA3AF"
      className="bg-white px-4 py-3 rounded-lg border border-gray-300 text-gray-900"
    />
  );
}
