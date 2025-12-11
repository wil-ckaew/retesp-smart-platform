import { TouchableOpacity, Text } from "react-native";

export default function Button({ title, onPress, className = "" }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={\`bg-blue-600 py-3 px-6 rounded-2xl shadow-md active:bg-blue-700 \${className}\`}
    >
      <Text className="text-white font-semibold text-center">{title}</Text>
    </TouchableOpacity>
  );
}
