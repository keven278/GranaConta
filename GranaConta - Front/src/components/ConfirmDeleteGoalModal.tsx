import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Trash2 } from "lucide-react-native";

interface Props{
    visible:boolean;
    goal:any;
    onCancel:()=>void;
    onDelete:()=>void;
}
export default function ConfirmDeleteGoalModal({
    visible,
    goal,
    onCancel,
    onDelete,
}:Props){
return(
<Modal visible={visible} transparent animationType="fade">
<View style={styles.overlay}>
<View style={styles.modal}>
<View style={styles.redCircle}>
<Trash2 size={42} color="white"/>
</View>
<Text style={styles.title}>EXCLUIR META</Text>
<Text style={styles.subtitle}>Tem certeza que deseja excluir esta meta?</Text>
<View style={styles.card}>
<Text style={styles.goalName}>
{goal?.nome}</Text><Text style={styles.goalValue}>R$ {goal?.valor}</Text>
</View>

<Text style={styles.warning}>Todo o progresso será perdido.</Text>
<TouchableOpacity

style={styles.deleteButton}
onPress={onDelete}
>
<Text style={styles.deleteText}>SIM, EXCLUIR META</Text>
</TouchableOpacity>
<TouchableOpacity

style={styles.cancelButton}
onPress={onCancel}
>

<Text style={styles.cancelText}>Cancelar</Text>

</TouchableOpacity>

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
    backgroundColor: "#FFF",
    width: "100%",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
  },

  redCircle: {
    width: 85,
    height: 85,
    borderRadius: 43,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#EF4444",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 16,
    marginBottom: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  goalName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  goalValue: {
    marginTop: 6,
    fontSize: 16,
    color: "#6B7280",
  },

  warning: {
    color: "#EF4444",
    marginBottom: 24,
    fontWeight: "600",
  },

  deleteButton: {
    width: "100%",
    backgroundColor: "#EF4444",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  deleteText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "800",
  },

  cancelButton: {
    width: "100%",
    marginTop: 12,
    alignItems: "center",
    paddingVertical: 12,
  },

  cancelText: {
    color: "#6B7280",
    fontSize: 16,
  },
});