import React, { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import { Alert } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

interface AddFixedExpenseScreenProps {
  onBack: () => void;
}

export default function AddFixedExpenseScreen({
  onBack,
}: AddFixedExpenseScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");

  const categories = [
    'Moradia',
    'Energia',
    'Água',
    'Internet',
    'Celular',
    'Academia',
    'Streaming',
    'Transporte',
    'Veículo',
    'Assinatura',
    'Saúde',
    'Educação',
    'Outro',
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  async function salvarGastoFixo() {
  try {
    if (!nome.trim()) {
      Alert.alert("Erro", "Informe o nome.");
      return;
    }

    if (!valor.trim()) {
      Alert.alert("Erro", "Informe o valor.");
      return;
    }

    if (!selectedDay) {
      Alert.alert("Erro", "Selecione o dia.");
      return;
    }

    const token = await AsyncStorage.getItem("token");

    await api.post(
      "/transacoes/fixas",
      {
        nome,
        valor,
        categoria: "Despesa fixa",
        data: selectedDay.toString(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    Alert.alert(
      "Sucesso",
      "Gasto fixo cadastrado!",
      [
        {
          text: "OK",
          onPress: onBack,
        },
      ]
    );

  } catch (error: any) {
    console.log(error.response?.data);

    Alert.alert(
      "Erro",
      error.response?.data?.erro ??
      "Erro ao cadastrar gasto fixo."
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
          ADICIONAR GASTO FIXO
        </Text>

        <View style={{ width: 20 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.label}>Nome do gasto</Text>

       <TextInput
       value={nome}
       onChangeText={setNome}
       placeholder="Ex: Aluguel, Academia, Netflix"
       style={styles.input}
       placeholderTextColor="#9CA3AF"
       />

        <Text style={styles.label}>Valor mensal</Text>

        <TextInput
        value={valor}
        onChangeText={setValor}
        placeholder="R$ 0,00"
        keyboardType="numeric"
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
                selectedCategory === category &&
                  styles.selectedCard,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category &&
                    styles.selectedText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Dia de vencimento</Text>

        <View style={styles.daysContainer}>
          {days.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                selectedDay === day &&
                  styles.selectedDayButton,
              ]}
              onPress={() => setSelectedDay(day)}
            >
              <Text
                style={[
                  styles.dayText,
                  selectedDay === day &&
                    styles.selectedDayText,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton}onPress={salvarGastoFixo}>
          <Text style={styles.saveButtonText}>
            SALVAR GASTO FIXO
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
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },

  headerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },

  content: {
    padding: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginTop: 10,
  },

  input: {
    backgroundColor: 'white',
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 15,
    elevation: 2,
    marginBottom: 10,
  },

  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  categoryCard: {
    width: '31%',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 15,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
  },

  categoryText: {
    fontSize: 12,
    color: '#4B5563',
    textAlign: 'center',
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: PRIMARY_GREEN,
  },

  selectedText: {
    color: PRIMARY_GREEN,
    fontWeight: '700',
  },

  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 5,
  },

  dayButton: {
    width: '13%',
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 2,
  },

  selectedDayButton: {
    backgroundColor: PRIMARY_GREEN,
  },

  dayText: {
    color: '#4B5563',
    fontWeight: '500',
  },

  selectedDayText: {
    color: 'white',
    fontWeight: '700',
  },

  saveButton: {
    backgroundColor: PRIMARY_GREEN,
    height: 55,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },

  saveButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
});