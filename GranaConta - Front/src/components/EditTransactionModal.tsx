import { useEffect, useState } from "react";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  X,
  Pencil,
  Trash2,
  CircleDollarSign,
} from "lucide-react-native";

interface Transaction {
  nome: string;
  valor: number;
  tipo: string;
}

interface EditTransactionModalProps {
  visible: boolean;
  transaction: any;
  onClose: () => void;
  onDelete: () => void;
  onSave: (
    nome: string,
    valor: string,
    tipo: string
  ) => void;
}

export default function EditTransactionModal({
  visible,
  transaction,
  onClose,
  onDelete,
  onSave,
}: EditTransactionModalProps) {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("gasto");

  useEffect(() => {
    if (transaction) {
      setNome(transaction.nome);
      setValor(transaction.valor.toString());
      setTipo(transaction.categoria === "Receita"
        ? "receita"
        : "gasto"
      );
    }
  }, [transaction]);

async function salvarAlteracoes() {
  try {
    const token = await AsyncStorage.getItem("token");

    let valorFinal = Number(String(valor).replace(",", "."));
    if (tipo === "gasto") {
      valorFinal = -Math.abs(valorFinal);
    } else {
       valorFinal = Math.abs(valorFinal);
      }

    await api.put(
      `/transacoes/${transaction.id}`,
      {
        nome,
        valor: valorFinal.toString().replace(".", ","),
        categoria: tipo === "receita"
          ? "Receita"
          : "Despesa",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    onSave(nome, valor, tipo);
    onClose();

  } catch (error) {
    console.log(error);
  }
}

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
        <View style={styles.overlay}>
        <View style={styles.modal}>
        <View style={styles.header}>
  <TouchableOpacity
    style={styles.closeButton}
    onPress={onClose}
  >
    <X size={22} color="#fff" />
  </TouchableOpacity>

  <View style={styles.iconCircle}>
    <Pencil size={34} color="#FFD54F" />
  </View>

  <Text style={styles.title}>
    EDITAR TRANSAÇÃO
  </Text>

  <Text style={styles.subtitle}>
    Atualize as informações abaixo
  </Text>
</View>

<View style={styles.content}>

  <Text style={styles.label}>
    Nome
  </Text>

  <TextInput
    value={nome}
    onChangeText={setNome}
    style={styles.input}
    placeholder="Nome da transação"
  />

  <Text style={styles.label}>
    Valor
  </Text>

  <TextInput
    value={valor}
    onChangeText={setValor}
    keyboardType="numeric"
    style={styles.input}
    placeholder="0,00"
  />

  <Text style={styles.label}>
    Tipo
  </Text>

  <View style={styles.tipoContainer}>

    <TouchableOpacity
      style={[
        styles.tipoButton,
        tipo === "receita" && styles.tipoSelecionado,
      ]}
      onPress={() => setTipo("receita")}
    >
      <CircleDollarSign
        size={18}
        color={tipo === "receita" ? "#fff" : "#22C55E"}
      />

      <Text
        style={[
          styles.tipoTexto,
          tipo === "receita" && { color: "#fff" },
        ]}
      >
        Receita
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.tipoButton,
        tipo === "gasto" && styles.tipoSelecionadoVermelho,
      ]}
      onPress={() => setTipo("gasto")}
    >
      <Trash2
        size={18}
        color={tipo === "gasto" ? "#fff" : "#EF4444"}
      />

      <Text
        style={[
          styles.tipoTexto,
          tipo === "gasto" && { color: "#fff" },
        ]}
      >
        Gasto
      </Text>
    </TouchableOpacity>

  </View>
  <TouchableOpacity
  style={styles.saveButton}
  onPress={salvarAlteracoes}
>
  <Text style={styles.saveButtonText}>
    SALVAR ALTERAÇÕES
  </Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.deleteButton}
onPress={onDelete}
>
  <Trash2 size={18} color="#fff" />

  <Text style={styles.deleteButtonText}>
    EXCLUIR TRANSAÇÃO
  </Text>
</TouchableOpacity>

<TouchableOpacity
  onPress={onClose}
>
  <Text style={styles.cancelText}>
    Cancelar
  </Text>
</TouchableOpacity>

</View>

</View>

</View>

</Modal>
);
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modal: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 22,
    overflow: "hidden",
  },

  header: {
    backgroundColor: "#1E3A5F",
    paddingVertical: 24,
    alignItems: "center",
  },

  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },

  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  title: {
    color: "#FFD54F",
    fontSize: 22,
    fontWeight: "800",
  },

  subtitle: {
    color: "#fff",
    marginTop: 4,
    fontSize: 14,
  },

  content: {
    padding: 20,
  },

  label: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "700",
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    backgroundColor: "#F9FAFB",
  },

  tipoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },

  tipoButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginHorizontal: 4,
  },

  tipoSelecionado: {
    backgroundColor: "#22C55E",
    borderColor: "#22C55E",
  },

  tipoSelecionadoVermelho: {
    backgroundColor: "#EF4444",
    borderColor: "#EF4444",
  },

  tipoTexto: {
    marginLeft: 8,
    fontWeight: "700",
    color: "#374151",
  },

  saveButton: {
    backgroundColor: "#22C55E",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },

  saveButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
  },

  deleteButton: {
    backgroundColor: "#EF4444",
    borderRadius: 10,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 12,
  },

  deleteButtonText: {
    color: "#fff",
    fontWeight: "800",
    marginLeft: 8,
    fontSize: 15,
  },

  cancelText: {
    textAlign: "center",
    marginTop: 18,
    color: "#6B7280",
    fontSize: 15,
  },
});