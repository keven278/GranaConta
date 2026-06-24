import { UserCircle2 } from "lucide-react-native";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function ReportScreen() {
  const gastosCategoria = [
    {
      name: "Alimentação",
      value: 450,
      color: "#ef4444",
      legendFontColor: "#4b5563",
      legendFontSize: 9,
    },
    {
      name: "Transporte",
      value: 280,
      color: "#3b82f6",
      legendFontColor: "#4b5563",
      legendFontSize: 9,
    },
    {
      name: "Moradia",
      value: 700,
      color: "#f59e0b",
      legendFontColor: "#4b5563",
      legendFontSize: 9,
    },
    {
      name: "Lazer",
      value: 190,
      color: "#8b5cf6",
      legendFontColor: "#4b5563",
      legendFontSize: 9,
    },
  ];

  const gastosPagamento = [
    {
      name: "Débito",
      value: 620,
      color: "#10b981",
      legendFontColor: "#4b5563",
      legendFontSize: 9,
    },
    {
      name: "Crédito",
      value: 540,
      color: "#3b82f6",
      legendFontColor: "#4b5563",
      legendFontSize: 9,
    },
    {
      name: "Dinheiro",
      value: 260,
      color: "#f59e0b",
      legendFontColor: "#4b5563",
      legendFontSize: 9,
    },
    {
      name: "PIX",
      value: 200,
      color: "#8b5cf6",
      legendFontColor: "#4b5563",
      legendFontSize: 9,
    },
  ];

  const evolucaoData = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        data: [500, 800, 600, 1000, 900, 1100, 950],
        color: () => "#3b82f6",
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: () => "#3b82f6",
    labelColor: () => "#6b7280",
    propsForDots: {
      r: "3",
      strokeWidth: "1",
      stroke: "#3b82f6",
    },
    propsForBackgroundLines: {
      strokeWidth: 0,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.emptyIconSpace} />

        <Text style={styles.headerTitle}>RELATÓRIO</Text>

        <UserCircle2 size={26} color="#ffffff" />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.receitasLabel}>RECEITAS</Text>
            <Text style={styles.summaryValue}>R$ 2.000,00</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.despesasLabel}>DESPESAS</Text>
            <Text style={styles.summaryValue}>R$ 1620,00</Text>
          </View>
        </View>

        <View style={styles.chartsRow}>
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>GASTOS POR CATEGORIA</Text>

            <PieChart
              data={gastosCategoria}
              width={(screenWidth - 48) / 2}
              height={105}
              chartConfig={chartConfig}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft="0"
              center={[15, 0]}
              absolute={false}
              hasLegend={false}
            />

            <View style={styles.legendContainer}>
              {gastosCategoria.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendColor,
                      { backgroundColor: item.color },
                    ]}
                  />
                  <Text style={styles.legendText}>{item.name}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>GASTOS POR FORMA DE PAGAMENTO</Text>

            <PieChart
              data={gastosPagamento}
              width={(screenWidth - 48) / 2}
              height={105}
              chartConfig={chartConfig}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft="0"
              center={[15, 0]}
              absolute={false}
              hasLegend={false}
            />

            <View style={styles.legendContainer}>
              {gastosPagamento.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendColor,
                      { backgroundColor: item.color },
                    ]}
                  />
                  <Text style={styles.legendText}>{item.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>
            DESPESAS ESSENCIAIS VS NÃO ESSENCIAIS
          </Text>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.essentialValue}>R$ 950,00</Text>
              <Text style={styles.infoDescription}>Essenciais</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.nonEssentialValue}>R$ 670,00</Text>
              <Text style={styles.infoDescription}>Não Essenciais</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>ECONOMIA</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.goalValue}>R$ 500,00</Text>
              <Text style={styles.infoDescription}>Meta Mensal</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.currentSavingValue}>R$ 380,00</Text>
              <Text style={styles.infoDescription}>Economia Atual</Text>
            </View>
          </View>
        </View>

        <View style={styles.lineChartCard}>
          <Text style={styles.infoTitle}>EVOLUÇÃO DOS GASTOS</Text>

          <LineChart
            data={evolucaoData}
            width={screenWidth - 56}
            height={150}
            chartConfig={chartConfig}
            bezier
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLabels={false}
            withHorizontalLabels={false}
            style={styles.lineChart}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const cardShadow = {
  shadowColor: "#000",
  shadowOpacity: 0.06,
  shadowRadius: 4,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  elevation: 2,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    paddingBottom: 64,
  },

  header: {
    backgroundColor: "#1e3a5f",
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  emptyIconSpace: {
    width: 26,
  },

  headerTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
  },

  content: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 18,
  },

  summaryRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    ...cardShadow,
  },

  receitasLabel: {
    color: "#22c55e",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 5,
  },

  despesasLabel: {
    color: "#ef4444",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 5,
  },

  summaryValue: {
    color: "#1f2937",
    fontSize: 18,
    fontWeight: "800",
  },

  chartsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },

  chartCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
    ...cardShadow,
  },

  chartTitle: {
    color: "#374151",
    fontSize: 10,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 4,
  },

  legendContainer: {
    gap: 3,
    marginTop: 2,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  legendColor: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },

  legendText: {
    color: "#4b5563",
    fontSize: 9,
  },

  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 12,
    ...cardShadow,
  },

  infoTitle: {
    color: "#374151",
    fontSize: 10,
    fontWeight: "800",
    marginBottom: 10,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  infoItem: {
    alignItems: "center",
  },

  essentialValue: {
    color: "#ef4444",
    fontSize: 15,
    fontWeight: "800",
  },

  nonEssentialValue: {
    color: "#3b82f6",
    fontSize: 15,
    fontWeight: "800",
  },

  goalValue: {
    color: "#3b82f6",
    fontSize: 15,
    fontWeight: "800",
  },

  currentSavingValue: {
    color: "#22c55e",
    fontSize: 15,
    fontWeight: "800",
  },

  infoDescription: {
    color: "#6b7280",
    fontSize: 9,
    marginTop: 3,
  },

  lineChartCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
    ...cardShadow,
  },

  lineChart: {
    marginLeft: -18,
    marginTop: -8,
  },
});
