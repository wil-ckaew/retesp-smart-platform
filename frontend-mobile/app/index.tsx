import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-100">
      <View className="items-center space-y-4">
        <Text className="text-3xl font-bold text-gray-900">
          🚀 Retesp Mobile
        </Text>
        <Text className="text-gray-500 text-center px-10">
          Plataforma moderna com Expo + NativeWind + Navegação elegante
        </Text>

        <Link href="/scanner" asChild>
          <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-2xl shadow-lg">
            <Text className="text-white font-semibold">Abrir Scanner</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}
