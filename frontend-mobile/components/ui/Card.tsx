import { View } from "react-native";

export default function Card({ children, className = "" }) {
  return (
    <View className={\`bg-white rounded-3xl p-5 shadow-lg \${className}\`}>
      {children}
    </View>
  );
}
