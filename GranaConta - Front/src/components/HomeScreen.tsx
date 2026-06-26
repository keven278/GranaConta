import {
  Briefcase,
  Coffee,
  DollarSign,
  Edit2,
  Film,
  Fuel,
  Plus,
  ShoppingCart,
  UserCircle2,
  UtensilsCrossed,
} from "lucide-react-native";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface HomeScreenProps {
  onOpenAddTransaction: () => void;
  onOpenAddFixedExpense: () => void;
  onOpenProfile: () => void;
}

export default function HomeScreen({
  onOpenAddTransaction,
  onOpenAddFixedExpense,
  onOpenProfile,
}: HomeScreenProps) {
  const historicoFinanceiro = [
    { nome: "Salário", valor: 2000, tipo: "receita", icon: Briefcase },
    { nome: "Café", valor: 8.5, tipo: "gasto", icon: Coffee },
    { nome: "Supermercado", valor: 150, tipo: "gasto", icon: ShoppingCart },
    { nome: "Freela", valor: 380, tipo: "receita", icon: DollarSign },
    { nome: "Combustível", valor: 60, tipo: "gasto", icon: Fuel },
    { nome: "Almoço", valor: 30, tipo: "gasto", icon: UtensilsCrossed },
    { nome: "Cinema", valor: 45, tipo: "gasto", icon: Film },
  ];

  const gastosFixos = [
    { valor: 600, nome: "Aluguel" },
    { valor: 120, nome: "Luz" },
    { valor: 80, nome: "Água" },
    { valor: 90, nome: "Internet" },
    { valor: 60, nome: "Celular" },
    { valor: 50, nome: "Academia" },
    { valor: 40, nome: "Streaming" },
    { valor: 35, nome: "Transporte" },
  ];

  function formatarValor(valor: number) {
    return valor.toFixed(2).replace(".", ",");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.emptyIconSpace} />

          <Text style={styles.appName}>GRANACONTA</Text>

          <TouchableOpacity activeOpacity={0.7} onPress={onOpenProfile}>
            <UserCircle2 size={26} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.saldoLabel}>Saldo Atual</Text>

        <View style={styles.saldoContainer}>
          <Text style={styles.saldoValor}>R$ 1620,00</Text>

          <TouchableOpacity activeOpacity={0.7} style={styles.editButton}>
            <Edit2 size={17} color="rgba(255,255,255,0.75)" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>HISTÓRICO FINANCEIRO</Text>

        <View style={styles.historicoLista}>
          {historicoFinanceiro.map((item, index) => {
            const Icon = item.icon;
            const isReceita = item.tipo === "receita";

            return (
              <View key={index} style={styles.historicoItem}>
                <View style={styles.historicoInfo}>
                  <Icon size={16} color="#6b7280" />

                  <Text style={styles.historicoNome}>{item.nome}</Text>
                </View>

                <Text
                  style={[
                    styles.historicoValor,
                    isReceita ? styles.valorReceita : styles.valorGasto,
                  ]}
                >
                  {isReceita ? "+" : "-"}R$ {formatarValor(item.valor)}
                </Text>
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.botaoAdicionar}
          onPress={onOpenAddTransaction}
        >
          <Plus size={18} color="#ffffff" />

          <Text style={styles.botaoAdicionarTexto}>
            ADICIONAR GASTO/RECEITA
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>GASTOS FIXOS</Text>

        <View style={styles.gastosFixosGrid}>
          {gastosFixos.map((gasto, index) => (
            <View key={index} style={styles.gastoFixoCard}>
              <Text style={styles.gastoFixoValor}>R$ {gasto.valor}</Text>

              <Text style={styles.gastoFixoNome}>{gasto.nome}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.botaoAdicionarFixo}
          onPress={onOpenAddFixedExpense}
        >
          <Plus size={16} color="#374151" />

          <Text style={styles.botaoAdicionarFixoTexto}>
            ADICIONAR GASTO FIXO
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

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
    paddingBottom: 18,
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  emptyIconSpace: {
    width: 26,
  },

  appName: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
  },

  saldoLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 4,
  },

  saldoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  saldoValor: {
    color: "#4ade80",
    fontSize: 32,
    fontWeight: "800",
  },

  editButton: {
    marginLeft: 8,
  },

  content: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },

  sectionTitle: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
  },

  historicoLista: {
    marginBottom: 14,
  },

  historicoItem: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  historicoInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  historicoNome: {
    marginLeft: 8,
    color: "#1f2937",
    fontSize: 13,
  },

  historicoValor: {
    fontSize: 12,
    fontWeight: "700",
  },

  valorReceita: {
    color: "#22c55e",
  },

  valorGasto: {
    color: "#ef4444",
  },

  botaoAdicionar: {
    backgroundColor: "#4ade80",
    borderRadius: 10,
    paddingVertical: 11,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  botaoAdicionarTexto: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 8,
  },

  gastosFixosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  gastoFixoCard: {
    width: "23%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 8,
  },

  gastoFixoValor: {
    color: "#22c55e",
    fontSize: 12,
    fontWeight: "800",
  },

  gastoFixoNome: {
    color: "#4b5563",
    fontSize: 9,
    textAlign: "center",
  },

  botaoAdicionarFixo: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingVertical: 9,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  botaoAdicionarFixoTexto: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 6,
  },
});
