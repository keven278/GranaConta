import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

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
} from "lucide-react-native";

interface Props {
  visible: boolean;
  expense: any;
  onClose: () => void;
  onDelete: () => void;
  onSave: () => void;
}

export default function EditFixedExpenseModal({
  visible,
  expense,
  onClose,
  onDelete,
  onSave,
}: Props) {

  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [dia, setDia] = useState("");

  useEffect(() => {
    if (expense) {
      setNome(expense.nome);
      setValor(String(expense.valor));
      setDia(String(expense.data));
    }
  }, [expense]);

  async function salvarAlteracoes() {
    try {

      const token = await AsyncStorage.getItem("token");

      await api.put(
        `/transacoes/fixa/${expense.id}`,
        {
          nome,
          valor,
          categoria: "Despesa fixa",
          data: dia,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onSave();
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
    >
      <View style={styles.overlay}>

        <View style={styles.modal}>

          <View style={styles.header}>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <X size={22} color="#fff"/>
            </TouchableOpacity>

            <View style={styles.iconCircle}>
              <Pencil size={34} color="#FFD54F"/>
            </View>

            <Text style={styles.title}>
              EDITAR GASTO FIXO
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
            />

            <Text style={styles.label}>
              Valor
            </Text>

            <TextInput
              value={valor}
              onChangeText={setValor}
              keyboardType="numeric"
              style={styles.input}
            />

            <Text style={styles.label}>
              Dia de vencimento
            </Text>

            <TextInput
              value={dia}
              onChangeText={setDia}
              keyboardType="numeric"
              style={styles.input}
            />

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
              <Trash2 color="#fff" size={18}/>

              <Text style={styles.deleteButtonText}>
                EXCLUIR GASTO FIXO
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose}>
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

  overlay:{
    flex:1,
    backgroundColor:"rgba(0,0,0,0.5)",
    justifyContent:"center",
    alignItems:"center",
    padding:20,
  },

  modal:{
    width:"100%",
    backgroundColor:"#fff",
    borderRadius:22,
    overflow:"hidden",
  },

  header:{
    backgroundColor:"#1E3A5F",
    paddingVertical:24,
    alignItems:"center",
  },

  closeButton:{
    position:"absolute",
    top:16,
    right:16,
  },

  iconCircle:{
    width:70,
    height:70,
    borderRadius:35,
    backgroundColor:"rgba(255,255,255,0.1)",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:14,
  },

  title:{
    color:"#FFD54F",
    fontSize:22,
    fontWeight:"800",
  },

  subtitle:{
    color:"#fff",
    marginTop:4,
    fontSize:14,
  },

  content:{
    padding:20,
  },

  label:{
    fontSize:13,
    color:"#374151",
    fontWeight:"700",
    marginBottom:6,
    marginTop:12,
  },

  input:{
    borderWidth:1,
    borderColor:"#D1D5DB",
    borderRadius:10,
    padding:12,
    backgroundColor:"#F9FAFB",
  },

  saveButton:{
    backgroundColor:"#22C55E",
    borderRadius:10,
    paddingVertical:14,
    alignItems:"center",
    marginTop:20,
  },

  saveButtonText:{
    color:"#fff",
    fontWeight:"800",
    fontSize:15,
  },

  deleteButton:{
    backgroundColor:"#EF4444",
    borderRadius:10,
    paddingVertical:14,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    marginTop:12,
  },

  deleteButtonText:{
    color:"#fff",
    fontWeight:"800",
    marginLeft:8,
    fontSize:15,
  },

  cancelText:{
    textAlign:"center",
    marginTop:18,
    color:"#6B7280",
    fontSize:15,
  },

});