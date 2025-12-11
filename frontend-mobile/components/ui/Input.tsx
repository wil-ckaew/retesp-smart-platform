import { TextInput } from "react-native";

export default function Input({ value, onChangeText, placeholder }) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      className="bg-white border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 shadow-sm"
      placeholderTextColor="#94a3b8"
    />
  );
}
