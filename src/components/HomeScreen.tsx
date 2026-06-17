import {
  DollarSign,
  Edit2,
  Plus,
  UserCircle2
} from "lucide-react-native";
import { useEffect, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [historicoFinanceiro, setHistoricoFinanceiro] = useState<any[]>([]);
  const [saldo, setSaldo] = useState(0);

  async function buscarTransacoes() {
    try {
      const response = await fetch(
        "http://10.0.2.2:3000/transacoes"
      );
      const data = await response.json();
      setHistoricoFinanceiro(data);
      let saldoCalculado = 0;
      data.forEach((item: any) => {
        if(item.tipo === "receita"){
          saldoCalculado += Number(item.valor);
        }else{
          saldoCalculado -= Number(item.valor);}});
          setSaldo(saldoCalculado);
        }catch (error) {
          console.log(error);}}
          useEffect(() => {
            buscarTransacoes();
          }, []);

  const gastosFixos = [
    { valor: 600.0, nome: "Aluguel" },
    { valor: 120.0, nome: "Luz" },
    { valor: 80.0, nome: "Água" },
    { valor: 90.0, nome: "Internet" },
    { valor: 60.0, nome: "Celular" },
    { valor: 50.0, nome: "Academia" },
    { valor: 40.0, nome: "Streaming" },
    { valor: 35.0, nome: "Transporte" },
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

          <TouchableOpacity activeOpacity={0.7}>
            <UserCircle2 size={26} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.saldoLabel}>Saldo Atual</Text>

        <View style={styles.saldoContainer}>
          <Text style={styles.saldoValor}>R${saldo.toLocaleString("pt-BR", {minimumFractionDigits: 2,maximumFractionDigits: 2,})}</Text>
          <TouchableOpacity activeOpacity={0.7} style={styles.editButton}>
            <Edit2 size={17} color="rgba(255, 255, 255, 0.75)" />
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
          const isReceita = item.tipo === "receita";
          return (
          <View key={index} style={styles.historicoItem}>
            <View style={styles.historicoInfo}>
              <DollarSign size={16} color="#6b7280" />
              <Text style={styles.historicoNome}>
                {item.descricao}
                </Text>
                </View>
                <Text
                style={[
                  styles.historicoValor,
                  isReceita
                  ? styles.valorReceita
                  : styles.valorGasto,
                ]}
                >{isReceita ? "+" : "-"}
                R$
                {formatarValor(Number(item.valor))}
                </Text>
                </View>
                );
          })}
        </View>
        <TouchableOpacity activeOpacity={0.8} style={styles.botaoAdicionar}>
          <Plus size={18} color="#ffffff" />
          <Text style={styles.botaoAdicionarTexto}>
            ADICIONAR GASTO/RECEITA
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>GASTOS FIXOS</Text>

        <View style={styles.gastosFixosGrid}>
          {gastosFixos.map((gasto, index) => (
            <View key={index} style={styles.gastoFixoCard}>
              <Text style={styles.gastoFixoValor}>
                R$ {gasto.valor.toFixed(0)}
              </Text>
              <Text style={styles.gastoFixoNome}>{gasto.nome}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity activeOpacity={0.8} style={styles.botaoAdicionarFixo}>
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
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 4,
  },

  saldoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  saldoValor: {
    color: "#4ade80",
    fontSize: 32,
    fontWeight: "800",
  },

  editButton: {
    padding: 4,
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
    gap: 7,
    marginBottom: 14,
  },

  historicoItem: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  historicoInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  historicoNome: {
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
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  botaoAdicionarTexto: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "800",
  },

  gastosFixosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 8,
    marginBottom: 12,
  },

  gastoFixoCard: {
    width: "23%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  gastoFixoValor: {
    color: "#22c55e",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 2,
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
    alignItems: "center",
    justifyContent: "center",
    gap: 6,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
  },

  botaoAdicionarFixoTexto: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "800",
  },
});
