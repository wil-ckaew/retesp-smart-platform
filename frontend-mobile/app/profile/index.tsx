import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../src/contexts/AuthContext";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user]);

  if (!user) return null;

  return (
    <View className="flex-1 bg-gray-50 p-6">
      <Text className="text-3xl font-bold text-gray-900 mb-6">Meu Perfil</Text>

      <View className="bg-white rounded-xl p-6 shadow">
        <Text className="text-gray-500">Nome</Text>
        <Text className="text-xl font-semibold mb-4">{user.name ?? user.email}</Text>

        <Text className="text-gray-500">E-mail</Text>
        <Text className="text-lg mb-6">{user.email}</Text>
      </View>

      <TouchableOpacity
        onPress={logout}
        className="bg-red-600 py-3 rounded-lg items-center justify-center mt-6"
      >
        <Text className="text-white font-bold">Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
