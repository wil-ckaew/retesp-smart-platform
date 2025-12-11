import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { theme } from "../../../constants/theme";
import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>Resumo dos últimos 30 dias</Text>

      {/* CARDS */}
      <View style={styles.cardRow}>
        <View style={styles.card}>
          <Ionicons name="people-outline" size={36} color={theme.colors.primary} />
          <Text style={styles.cardNumber}>127</Text>
          <Text style={styles.cardLabel}>Alunos ativos</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="checkmark-done-outline" size={36} color={theme.colors.success} />
          <Text style={styles.cardNumber}>82%</Text>
          <Text style={styles.cardLabel}>Presenças</Text>
        </View>
      </View>

      <View style={styles.cardRow}>
        <View style={styles.card}>
          <Ionicons name="alert-circle-outline" size={36} color={theme.colors.danger} />
          <Text style={styles.cardNumber}>12</Text>
          <Text style={styles.cardLabel}>Advertências</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="videocam-outline" size={36} color={theme.colors.primary} />
          <Text style={styles.cardNumber}>34</Text>
          <Text style={styles.cardLabel}>Vídeos enviados</Text>
        </View>
      </View>

      {/* GRÁFICO */}
      <Text style={styles.sectionTitle}>Frequência mensal</Text>

      <LineChart
        data={{
          labels: ["01", "05", "10", "15", "20", "25"],
          datasets: [
            {
              data: [65, 70, 80, 77, 88, 92],
            },
          ],
        }}
        width={Dimensions.get("window").width - 20}
        height={220}
        yAxisSuffix="%"
        chartConfig={{
          backgroundColor: theme.colors.card,
          backgroundGradientFrom: theme.colors.card,
          backgroundGradientTo: theme.colors.card,
          decimalPlaces: 0,
          color: () => theme.colors.primary,
          labelColor: () => theme.colors.muted,
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: theme.colors.primary,
          },
        }}
        bezier
        style={styles.chart}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: theme.colors.text,
  },
  subtitle: {
    color: theme.colors.muted,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.text,
    marginTop: 20,
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  card: {
    width: "48%",
    height: 130,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
  cardLabel: {
    fontSize: 14,
    color: theme.colors.muted,
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.text,
    marginVertical: 4,
  },
  chart: {
    borderRadius: 16,
    marginTop: 8,
  },
});
