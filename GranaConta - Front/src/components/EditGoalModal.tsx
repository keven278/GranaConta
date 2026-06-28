import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Pencil, Trash2, X } from "lucide-react-native";

interface Props {
  visible: boolean;
  goal: any;
  onClose: () => void;
  onSave: (goal: any) => void;
  onDelete: () => void;
}

export default function EditGoalModal({
  visible,
  goal,
  onClose,
  onSave,
  onDelete,
}: Props) {

  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");

  useEffect(() => {
    if (goal) {
      setNome(goal.nome);
      setValor(String(goal.valor));
    }
  }, [goal]);

  return (
    <Modal visible={visible} transparent animationType="fade">

      <View style={styles.overlay}>
        <View style={styles.modal}>

          <TouchableOpacity
            style={styles.close}
            onPress={onClose}>
            <X color="white" size={28}/>
          </TouchableOpacity>

          <View style={styles.header}>

            <View style={styles.iconCircle}>
              <Pencil color="#FFC629" size={34}/>
            </View>

            <Text style={styles.title}>
              EDITAR META
            </Text>

            <Text style={styles.subtitle}>
              Atualize as informações abaixo.
            </Text>

          </View>

          <View style={styles.body}>

            <Text style={styles.label}>
              Nome da meta
            </Text>

            <TextInput
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />

            <Text style={styles.label}>
              Valor da meta (R$)
            </Text>

            <TextInput
              value={valor}
              onChangeText={setValor}
              keyboardType="numeric"
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={() =>
                onSave({
                  ...goal,
                  nome,
                  valor,
                })
              }
            >
              <Text style={styles.saveText}>
                SALVAR ALTERAÇÕES
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={onDelete}
            >
              <Trash2 color="white" size={22}/>
              <Text style={styles.deleteText}>
                EXCLUIR META
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>
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
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modal: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 24,
    overflow: "hidden",
  },

  close: {
    position: "absolute",
    top: 18,
    right: 18,
    zIndex: 10,
  },

  header: {
    backgroundColor: "#1E3A5F",
    alignItems: "center",
    paddingTop: 35,
    paddingBottom: 25,
  },

  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  title: {
    color: "#FFC629",
    fontSize: 24,
    fontWeight: "800",
  },

  subtitle: {
    color: "#FFF",
    marginTop: 6,
    fontSize: 15,
  },

  body: {
    padding: 22,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#F9FAFB",
  },

  saveButton: {
    marginTop: 24,
    backgroundColor: "#22C55E",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },

  saveText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "800",
  },

  deleteButton: {
    marginTop: 14,
    backgroundColor: "#EF4444",
    borderRadius: 12,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  deleteText: {
    color: "#FFF",
    marginLeft: 10,
    fontSize: 17,
    fontWeight: "800",
  },

  cancel: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#6B7280",
  },
});