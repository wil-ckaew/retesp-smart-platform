import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../../constants/theme";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

export default function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar conta</Text>
      <Text style={styles.subtitle}>Preencha os dados abaixo</Text>

      <Input label="Nome completo" placeholder="Seu nome" />
      <Input label="Email" placeholder="seu@email.com" />
      <Input label="Senha" placeholder="••••••••" secureTextEntry />

      <Button label="Cadastrar" onPress={() => navigation.goBack()} />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Já tenho uma conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.muted,
    marginBottom: 30,
  },
  link: {
    marginTop: 20,
    color: theme.colors.primary,
    fontWeight: "600",
    textAlign: "center",
  },
});
