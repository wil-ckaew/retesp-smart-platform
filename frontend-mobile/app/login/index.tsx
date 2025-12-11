import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import Input from "../../src/components/ui/Input";
import Button from "../../src/components/ui/Button";
import { useRouter } from "expo-router";
import { useAuth } from "../../src/contexts/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);
      await login(email, password);
      router.replace("/profile");
    } catch (err: any) {
      Alert.alert("Erro", err.message || "Falha ao entrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 bg-gray-50 p-6 justify-center">
      <Text className="text-3xl font-bold text-gray-900 mb-6">Entrar</Text>

      <Input placeholder="E-mail" value={email} onChangeText={setEmail} className="mb-3" />
      <Input
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="mb-4"
      />

      <Button title={loading ? "Aguarde..." : "Entrar"} onPress={handleLogin} disabled={loading} />

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text className="text-blue-600 text-center mt-4">Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}
