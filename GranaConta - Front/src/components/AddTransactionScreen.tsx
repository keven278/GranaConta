import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import { Alert } from "react-native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface AddTransactionScreenProps {
  onBack: () => void;
}

export default function AddTransactionScreen({
  onBack,
}: AddTransactionScreenProps) {
  const [type, setType] = useState<"expense" | "income">("expense");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [descricao, setDescricao] = useState("");
  const [value, setValue] = useState("0,00");

  const categories = [
    "Alimentação",
    "Transporte",
    "Moradia",
    "Café",
    "Combustível",
    "Internet",
    "Academia",
    "Streaming",
    "Saúde",
    "Educação",
    "Lazer",
    "Compras",
    "Outro",
  ];

  const paymentMethods = ["Débito", "Crédito", "Dinheiro", "PIX"];
  const handleValueChange = (text: string) => {
  const onlyNumbers = text.replace(/\D/g, "");

  console.log("Digitado:", text);
  console.log("Somente números:", onlyNumbers);

  const number = Number(onlyNumbers) / 100;

  console.log("Número:", number);

  const formatted = number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  console.log("Formatado:", formatted);

  setValue(formatted);
};
  async function salvarTransacao() {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert(
        "Sessão expirada",
        "Faça login novamente.");
        return;
    }

    const hoje = new Date().toISOString().split("T")[0];

    if (!descricao.trim()) {
  Alert.alert("Erro", "Informe a descrição.");
  return;}

    if (!selectedCategory) {
  Alert.alert("Erro", "Selecione uma categoria.");
  return;}

    if (!selectedPayment) {
  Alert.alert("Erro", "Selecione a forma de pagamento.");
  return;}

    if (value === "0,00") {
  Alert.alert("Erro", "Informe um valor válido.");
  return;}

await api.post(
  "/transacoes",
  {
    nome: descricao,
    valor:type === "expense"
    ? `-${value}`
    : value,
    categoria: selectedCategory,
    data: hoje,
  },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    Alert.alert(
      "Sucesso",
      "Transação cadastrada com sucesso!"
    );
    setDescricao("");
    setSelectedCategory("");
    setSelectedPayment("");
    setValue("0,00");
    setType("expense");

    onBack();

  } catch (error) {
    console.error(error);

    Alert.alert(
      "Erro",
      "Não foi possível salvar a transação."
    );
  }
}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>ADICIONAR LANÇAMENTO</Text>

        <View style={{ width: 20 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === "expense" && styles.activeExpense,
            ]}
            onPress={() => setType("expense")}
          >
            <Text
              style={[
                styles.typeText,
                type === "expense" && styles.activeExpenseText,
              ]}
            >
              - GASTO
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              type === "income" && styles.activeIncome,
            ]}
            onPress={() => setType("income")}
          >
            <Text
              style={[
                styles.typeText,
                type === "income" && styles.activeIncomeText,
              ]}
            >
              + RECEITA
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.valueCard}>
          <Text style={styles.valueLabel}>VALOR</Text>

          <TextInput
            value={value}
            onChangeText={handleValueChange}
            keyboardType="numeric"
            style={styles.valueInput}
            placeholderTextColor="#080606"
            maxLength={15}
          />
        </View>

        <Text style={styles.label}>Descrição</Text>

        <TextInput
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex: Almoço, Uber, Netflix..."
       style={styles.input}
       placeholderTextColor="#9CA3AF"
       />

        <Text style={styles.label}>Categoria</Text>

        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryCard,
                selectedCategory === category && styles.selectedCard,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Forma de pagamento</Text>

        <View style={styles.paymentContainer}>
          {paymentMethods.map((payment) => (
            <TouchableOpacity
              key={payment}
              style={[
                styles.paymentCard,
                selectedPayment === payment && styles.selectedCard,
              ]}
              onPress={() => setSelectedPayment(payment)}
            >
              <Text
                style={[
                  styles.paymentText,
                  selectedPayment === payment && styles.selectedText,
                ]}
              >
                {payment}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
        style={styles.saveButton}
        onPress={salvarTransacao}
        >
          <Text style={styles.saveButtonText}>SALVAR LANÇAMENTO</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const PRIMARY_BLUE = "#1E3A5F";
const PRIMARY_GREEN = "#4ADE80";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  header: {
    backgroundColor: PRIMARY_BLUE,
    paddingTop: 55,
    paddingBottom: 18,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },

  headerTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },

  content: {
    padding: 15,
  },

  typeContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 14,
    padding: 4,
    marginBottom: 15,
  },

  typeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },

  activeExpense: {
    backgroundColor: "#FDECEC",
  },

  activeIncome: {
    backgroundColor: "#EAFBF0",
  },

  typeText: {
    fontWeight: "600",
    color: "#050505",
  },

  valueInput: {
    color: "#333131",
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    minWidth: 180,
  },

  activeExpenseText: {
    color: "#EF4444",
  },

  activeIncomeText: {
    color: PRIMARY_GREEN,
  },

  valueCard: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },

  valueLabel: {
    color: "#9CA3AF",
    fontSize: 12,
    marginBottom: 10,
  },

  valueText: {
    color: "#F87171",
    fontSize: 34,
    fontWeight: "bold",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    marginTop: 10,
  },

  input: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 10,
  },

  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  categoryCard: {
    width: "31%",
    backgroundColor: "white",
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
  },

  categoryText: {
    fontSize: 12,
    textAlign: "center",
    color: "#4B5563",
  },

  paymentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  paymentCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 15,
    marginBottom: 10,
    alignItems: "center",
  },

  paymentText: {
    color: "#4B5563",
    fontWeight: "500",
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: PRIMARY_GREEN,
  },

  selectedText: {
    color: PRIMARY_GREEN,
    fontWeight: "700",
  },

  saveButton: {
    backgroundColor: PRIMARY_GREEN,
    height: 55,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },

  saveButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },

  successPopup: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#22C55E",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 5,
  },

  successText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
});
