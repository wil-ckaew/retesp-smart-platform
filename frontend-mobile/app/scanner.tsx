import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function ScannerScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="pt-16 px-6">
        <Text className="text-3xl font-bold text-gray-800">Scanner</Text>
        <Text className="text-gray-500 mt-2">
          Aqui você poderá ler selos e consultar detalhes.
        </Text>

        <View className="mt-10 items-center">
          <View className="w-64 h-64 bg-white rounded-3xl shadow-xl items-center justify-center">
            <Text className="text-gray-400">[ Preview da Câmera ]</Text>
          </View>
        </View>

        <View className="mt-10 items-center">
          <Link href="/" asChild>
            <TouchableOpacity className="bg-gray-800 px-6 py-3 rounded-2xl">
              <Text className="text-white font-semibold">Voltar</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
