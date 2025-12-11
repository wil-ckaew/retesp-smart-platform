import { View, Text, StyleSheet, Image } from "react-native";
import { theme } from "../constants/theme";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.pravatar.cc/300" }}
        style={styles.avatar}
      />

      <Text style={styles.name}>Wilson Silva</Text>
      <Text style={styles.role}>Administrador</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    color: theme.colors.text,
  },
  role: {
    fontSize: 16,
    color: theme.colors.textLight,
    marginTop: 4,
  },
});
