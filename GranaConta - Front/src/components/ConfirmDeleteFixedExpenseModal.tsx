import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Trash2 } from "lucide-react-native";

interface Props {
  visible: boolean;
  expense: any;
  onClose: () => void;
  onDelete: () => void;
}

export default function ConfirmDeleteFixedExpenseModal({
  visible,
  expense,
  onClose,
  onDelete,
}: Props) {

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>

        <View style={styles.modal}>

          <View style={styles.redCircle}>
            <Trash2
              size={42}
              color="white"
            />
          </View>

          <Text style={styles.title}>
            EXCLUIR GASTO FIXO
          </Text>

          <Text style={styles.subtitle}>
            Tem certeza que deseja excluir este gasto fixo?
          </Text>

          <View style={styles.card}>

            <Text style={styles.expenseName}>
              {expense?.nome}
            </Text>

            <Text style={styles.expenseValue}>
              R$ {expense?.valor}
            </Text>

          </View>

          <Text style={styles.warning}>
            Esta ação não poderá ser desfeita.
          </Text>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={onDelete}
          >
            <Text style={styles.deleteText}>
              SIM, EXCLUIR GASTO FIXO
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}
          >
            <Text style={styles.cancelText}>
              Cancelar
            </Text>
          </TouchableOpacity>

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
    padding: 25,
    alignItems: "center",
  },

  redCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#EF4444",
    marginBottom: 8,
  },

  subtitle: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 15,
    marginBottom: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 15,
  },

  expenseName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1F2937",
  },

  expenseValue: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 6,
  },

  warning: {
    color: "#EF4444",
    fontWeight: "600",
    marginBottom: 22,
  },

  deleteButton: {
    width: "100%",
    backgroundColor: "#EF4444",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },

  deleteText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
  },

  cancelButton: {
    marginTop: 18,
  },

  cancelText: {
    color: "#6B7280",
    fontSize: 15,
  },

});