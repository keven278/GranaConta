import React, { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

interface AddGoalScreenProps {
  onBack: () => void;
}

export default function AddGoalScreen({
  onBack,
}: AddGoalScreenProps) {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [guardado] = useState("0,00");

  async function criarMeta() {
  try {
    if (!nome.trim()) {
      Alert.alert("Erro", "Informe o nome da meta.");
      return;
    }

    if (!valor.trim()) {
      Alert.alert("Erro", "Informe o valor da meta.");
      return;
    }

    const token = await AsyncStorage.getItem("token");
    const valorFormatado = valor.replace(".", ",");

    await api.post(
       "/metas",
  {
    nome,
    valor: valorFormatado,
    guardado,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    Alert.alert(
      "Sucesso",
      "Meta criada com sucesso!",
      [
        {
          text: "OK",
        onPress: () => {
        setNome("");
        setValor("");
        onBack();
      },
        },
      ]
    );
  } catch (error: any) {
    console.log(error);

    Alert.alert(
      "Erro",
      error.response?.data?.erro ??
        "Erro ao criar a meta."
    );
  }
}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          ADICIONAR META
        </Text>

        <View style={{ width: 20 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.valueCard}>
          <Text style={styles.valueLabel}>
            VALOR DA META
          </Text>

          <Text style={styles.valueText}>{valor.length > 0 ? `R$ ${valor}` : "R$ 0,00"}</Text>
          
        </View>

        <Text style={styles.label}>Nome da meta</Text>

        <TextInput
         value={nome}
         onChangeText={setNome}
          placeholder="Ex: Viagem para Europa"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          />
          <Text style={styles.label}>Valor da meta</Text>
          <TextInput
          value={valor}
           onChangeText={setValor}
            keyboardType="numeric"
            placeholder="5000,00"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            />
            
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}> Sobre as metas</Text>
          <Text style={styles.infoText}> Você poderá adicionar ou retirar valores depois para acompanhar o progresso da meta.</Text>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={criarMeta}>
          <Text style={styles.saveButtonText}>
            CRIAR META
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const PRIMARY_BLUE = '#1E3A5F';
const PRIMARY_GREEN = '#4ADE80';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  header: {
    backgroundColor: PRIMARY_BLUE,
    paddingTop: 55,
    paddingBottom: 18,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  backButton: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  headerTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },

  content: {
    padding: 15,
  },

  valueCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    marginBottom: 15,
  },

  valueLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 8,
  },

  valueText: {
    color: PRIMARY_GREEN,
    fontSize: 34,
    fontWeight: 'bold',
  },

  label: {
    marginTop: 10,
    marginBottom: 8,
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },

  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 15,
    elevation: 2,
    marginBottom: 10,
  },

  saveButton: {
    backgroundColor: PRIMARY_GREEN,
    height: 55,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
  },

  saveButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },
  infoBox:{
    backgroundColor:"#EAF7FF",
    borderRadius:14,
    padding:18,
    marginTop:15,
    marginBottom:20,
},

infoTitle:{
    fontSize:16,
    fontWeight:"700",
    color:"#1E3A5F",
    marginBottom:8,
},

infoText:{
    color:"#4B5563",
    fontSize:14,
    lineHeight:22,
},
});