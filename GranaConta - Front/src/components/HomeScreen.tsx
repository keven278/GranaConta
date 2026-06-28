import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import EditFixedExpenseModal from "./EditFixedExpenseModal";
import ConfirmDeleteFixedExpenseModal from "./ConfirmDeleteFixedExpenseModal";
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
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import EditTransactionModal from "./EditTransactionModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

  const iconMap: Record<string, any> = {
  Alimentação: UtensilsCrossed,
  Café: Coffee,
  Combustível: Fuel,
  Compras: ShoppingCart,
  Lazer: Film,
  Trabalho: Briefcase,
  Receita: DollarSign,
};

interface HomeScreenProps {
  refresh: number;
  onOpenAddTransaction: () => void;
  onOpenAddFixedExpense: () => void;
  onOpenProfile: () => void;
}

export default function HomeScreen({
  refresh,
  onOpenAddTransaction,
  onOpenAddFixedExpense,
  onOpenProfile,
}: HomeScreenProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [historicoFinanceiro, setHistoricoFinanceiro] = useState<any[]>([]);
  const [saldo, setSaldo] = useState(0);
  const [gastosFixos, setGastosFixos] = useState<any[]>([]);
  const [showEditFixedModal, setShowEditFixedModal] = useState(false);
  const [showDeleteFixedModal, setShowDeleteFixedModal] = useState(false);
  const [selectedFixedExpense, setSelectedFixedExpense] = useState<any>(null);

  function formatarValor(valor: number) {
    return valor.toFixed(2).replace(".", ",");
  }
  async function carregarTransacoes() {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Sessão expirada", "Faça login novamente.");
      return;
    }

    const response = await api.get("/transacoes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    setHistoricoFinanceiro(response.data.transações);
    const saldoCalculado = response.data.transações.reduce(
      (total: number, transacao: any) => {
        const valor = parseFloat(transacao.valor.replace(",", "."));
        return total + valor;
      },0
    );
    setSaldo(saldoCalculado);

  } catch (error: any) {
  console.error(error);
  Alert.alert(
    "Erro",
    error.response?.data?.erro ??
      "Erro ao carregar as transações."
  );
}
}
async function carregarGastosFixos() {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await api.get("/transacoes/fixas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setGastosFixos(response.data.fixas);

  } catch (error) {
    console.log(error);
    Alert.alert(
      "Erro",
      "Não foi possível carregar os gastos fixos."
    );
  }
}
useEffect(() => {
  carregarTransacoes();
  carregarGastosFixos();
}, [refresh]);

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
          <Text style={styles.saldoValor}>{saldo < 0 ? "-R$ " : "R$ "}{formatarValor(Math.abs(saldo))}</Text>
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
            const Icon = iconMap[item.categoria] || DollarSign;
            const valor = parseFloat(item.valor.replace(",", "."));
            const isReceita = valor >= 0;
  return (
    <TouchableOpacity
      key={item.id}
      activeOpacity={0.8}
      style={styles.historicoItem}
      onPress={() => {
        setSelectedTransaction(item);
        setShowEditModal(true);
      }}
    >
      <View style={styles.historicoInfo}>
        <Icon size={22} color="#6b7280" />
        <Text style={styles.historicoNome}>{item.nome}</Text>
      </View>

      <Text
        style={[
          styles.historicoValor,
          isReceita ? styles.valorReceita : styles.valorGasto,
        ]}
      >
        {isReceita ? "+" : "-"}R$ {formatarValor(Math.abs(valor))}
      </Text>
    </TouchableOpacity>
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
          {gastosFixos.map((gasto) => (
            <TouchableOpacity
            key={gasto.id}
            style={styles.gastoFixoCard}
            activeOpacity={0.8}
            onPress={() => {
              setSelectedFixedExpense(gasto);
              setShowEditFixedModal(true);
            }}
            >
          <Text style={styles.gastoFixoValor}>R$ {gasto.valor}</Text>
         <Text style={styles.gastoFixoNome}>{gasto.nome}</Text>
  </TouchableOpacity>
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
<EditTransactionModal
  visible={showEditModal}
  transaction={selectedTransaction}
  onClose={() => setShowEditModal(false)}
  onDelete={() => setShowDeleteModal(true)}
  onSave={() => {
    carregarTransacoes();
  }}
/>
<ConfirmDeleteModal
  visible={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  onDelete={async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      await api.delete(
        `/transacoes/${selectedTransaction.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowDeleteModal(false);
      setShowEditModal(false);

      carregarTransacoes();

    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível excluir a transação.");
    }
  }}
/>
<EditFixedExpenseModal
  visible={showEditFixedModal}
  expense={selectedFixedExpense}
  onClose={() => setShowEditFixedModal(false)}
  onDelete={() => setShowDeleteFixedModal(true)}
  onSave={() => {
    carregarGastosFixos();
    setShowEditFixedModal(false);
  }}
/>

<ConfirmDeleteFixedExpenseModal
  visible={showDeleteFixedModal}
  expense={selectedFixedExpense}
  onClose={() => setShowDeleteFixedModal(false)}
  onDelete={async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      await api.delete(
        `/transacoes/fixa/${selectedFixedExpense.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowDeleteFixedModal(false);
      setShowEditFixedModal(false);

      carregarGastosFixos();

    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro",
        "Não foi possível excluir o gasto fixo."
      );
    }
  }}
/>
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
  historicoRight: {
  flexDirection: "row",
  alignItems: "center",
},

menuButton: {
  marginLeft: 10,
  padding: 2,
},
});
