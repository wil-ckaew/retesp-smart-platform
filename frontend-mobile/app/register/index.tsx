import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Input from "../../src/components/ui/Input";
import Button from "../../src/components/ui/Button";
import { useRouter } from "expo-router";
import { useAuth } from "../../src/contexts/AuthContext";

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    try {
      await register(name, email, password);
      router.replace("/profile");
    } catch (err: any) {
      Alert.alert("Erro", err.message || "Não foi possível registrar");
    }
  }

  return (
    <View className="flex-1 bg-gray-50 p-6 justify-center">
      <Text className="text-3xl font-bold text-gray-900 mb-6">Criar Conta</Text>

      <Input placeholder="Nome" value={name} onChangeText={setName} className="mb-3" />
      <Input placeholder="E-mail" value={email} onChangeText={setEmail} className="mb-3" />
      <Input
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="mb-4"
      />

      <Button title="Registrar" onPress={handleRegister} />

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text className="text-blue-600 text-center mt-4">Já tenho conta</Text>
      </TouchableOpacity>
    </View>
  );
}
