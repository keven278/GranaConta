import { useState } from "react";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import { Alert } from "react-native";
import {
  UserCircle2,
  Crown,
  FileDown,
} from "lucide-react-native";
import { Dimensions, ScrollView, StyleSheet, Text, View,TouchableOpacity, } from "react-native";
import { PieChart, LineChart } from "react-native-chart-kit";
import PremiumModal from "./PremiumModal";
import ExportModal from "./ExportModal";
const screenWidth = Dimensions.get("window").width;

export default function ReportScreen() {
  const [metaMensal, setMetaMensal] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [receitas, setReceitas] = useState(0);
  const [despesas, setDespesas] = useState(0);
  const [economia, setEconomia] = useState(0);
  const [gastosCategoria, setGastosCategoria] = useState<any[]>([]);

  const [evolucaoData, setEvolucaoData] = useState({
  labels: [] as string[],
  datasets: [
    {
      data: [0],
      color: () => "#3B82F6",
      strokeWidth: 2,
    },
  ],
});

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 0,
  color: () => "#3B82F6",
  labelColor: () => "#6b7280",

  fillShadowGradient: "#3B82F6",
  fillShadowGradientOpacity: 0.15,

  propsForDots: {
    r: "3",
    strokeWidth: "1",
    stroke: "#3B82F6",
  },
};

async function carregarResumo() {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await api.get("/transacoes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let totalReceitas = 0;
    let totalDespesas = 0;
    const categorias: any = {};
    let saldo = 0;
    const saldoAcumulado: number[] = [];

    response.data.transações.forEach((item: any) => {
      const valor = parseFloat(
         String(item.valor).replace(",", ".")
        );
        saldo += valor;saldoAcumulado.push(saldo);
  if (valor >= 0) {
    totalReceitas += valor;
  } else {
    totalDespesas += Math.abs(valor);
    const categoria = item.categoria || "Outros";
    categorias[categoria] =
      (categorias[categoria] || 0) +
      Math.abs(valor);
  }

});

    setReceitas(totalReceitas);
    setDespesas(totalDespesas);
    setEconomia(totalReceitas - totalDespesas);
    const cores = ["#EF4444","#3B82F6","#F59E0B","#8B5CF6","#10B981","#EC4899","#06B6D4","#84CC16",];

const dadosCategoria = Object.keys(categorias).map(
  (categoria, index) => ({
    name: categoria,
    value: categorias[categoria],
    color: cores[index % cores.length],
    legendFontColor: "#4B5563",
    legendFontSize: 9,
  })
);

setGastosCategoria(dadosCategoria);
setEvolucaoData({
  labels: saldoAcumulado.map((_, index) => `${index + 1}`),
  datasets: [
    {
      data: saldoAcumulado.length ? saldoAcumulado : [0],
      color: () => "#3B82F6",
      strokeWidth: 2,
    },
  ],
});
  } catch (error) {
    console.log(error);
  }
}

async function carregarMeta() {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await api.get("/metas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.metas.length > 0) {
      const valor = parseFloat(
        response.data.metas[0].valor.replace(",", ".")
      );

      setMetaMensal(valor);
    } else {
      setMetaMensal(0);
    }

  } catch (error) {
    console.log(error);
  }
}

async function verificarPremium() {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await api.get("/usuario", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);

    setIsPremium(Boolean(response.data.premium));

  } catch (error) {
    console.log(error);
  }
}
useEffect(() => {
  verificarPremium();
  carregarResumo();
  carregarMeta();
}, []);

async function gerarRelatorio() {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await api.get("/relatorios", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "text",
    });

    const caminhoArquivo =
      FileSystem.documentDirectory + "relatorio.csv";

    await FileSystem.writeAsStringAsync(
      caminhoArquivo,
      response.data,
      {
        encoding: FileSystem.EncodingType.UTF8,
      }
    );

    const disponivel = await Sharing.isAvailableAsync();

    if (disponivel) {
      await Sharing.shareAsync(caminhoArquivo, {
        mimeType: "text/csv",
        dialogTitle: "Compartilhar relatório",
      });
    } else {
      Alert.alert(
        "Sucesso",
        "Relatório salvo em:\n" + caminhoArquivo
      );
    }

  } catch (error: any) {
    console.log(error);

    if (error.response?.status === 403) {
      setShowPremium(true);
      return;
    }

    Alert.alert(
      "Erro",
      "Não foi possível gerar o relatório."
    );
  }
}

function formatarValor(valor: number) {
  return valor.toFixed(2).replace(".", ",");
}

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
    <TouchableOpacity
     activeOpacity={0.9}
     style={styles.premiumBanner}
    >
    <View style={styles.premiumContent}>

    <View style={styles.crownContainer}>
      <Crown color="#FFD54F" size={20} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.premiumTitle}>
        PREMIUM
      </Text>
      <Text style={styles.premiumSubtitle}>
        {isPremium
          ? "Exportar relatório em arquivo CSV"
          : "Assine o Premium para exportar relatórios CSV"}
      </Text>
    </View>
     <TouchableOpacity
      activeOpacity={0.8}
      style={styles.csvButton}
      onPress={() => {
        if (isPremium) {
          gerarRelatorio();
        } else {
          setShowPremium(true);
        }
      }}
     >
      <FileDown size={16} color="#1E3A5F" />
      <Text style={styles.csvText}>
        {isPremium ? "CSV" : "ASSINAR"}
      </Text>
     </TouchableOpacity>
    </View>
   </TouchableOpacity>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.receitasLabel}>RECEITAS</Text>
            <Text style={styles.summaryValue}>R$ {formatarValor(receitas)}</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.despesasLabel}>DESPESAS</Text>
            <Text style={styles.summaryValue}>R$ {formatarValor(despesas)}</Text>
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

        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>ECONOMIA</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.goalValue}>R$ {formatarValor(metaMensal)}</Text>
              <Text style={styles.infoDescription}>Meta Mensal</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.currentSavingValue}>R$ {formatarValor(economia)}</Text>
              <Text style={styles.infoDescription}>Economia Atual</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}> EVOLUÇÃO DO SALDO</Text>
  <LineChart
    data={evolucaoData}
    width={screenWidth - 60}
    height={180}
    chartConfig={chartConfig}
    bezier
    withInnerLines={false}
    withOuterLines={false}
    style={{
      borderRadius: 12,
    }}
  />
</View>
      </ScrollView>
      <PremiumModal
      visible={showPremium}
      onClose={() => setShowPremium(false)}/>
      <ExportModal
        visible={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
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

  lineChart: {
    marginLeft: -18,
    marginTop: -8,
  },
  premiumBanner: {
  marginBottom: 14,
  borderRadius: 16,
  backgroundColor: "#2E4F87",
  overflow: "hidden",
  elevation: 4,
},

premiumContent: {
  flexDirection: "row",
  alignItems: "center",
  padding: 14,
},

crownContainer: {
  width: 40,
  height: 40,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: "#FFD54F",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 12,
},

premiumTitle: {
  color: "#FFD54F",
  fontWeight: "800",
  fontSize: 12,
},

premiumSubtitle: {
  color: "#FFF",
  fontSize: 11,
  marginTop: 2,
},

csvButton: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#FFC107",
  borderRadius: 10,
  paddingHorizontal: 12,
  paddingVertical: 8,
},

csvText: {
  color: "#1E3A5F",
  fontWeight: "800",
  marginLeft: 5,
},
});
