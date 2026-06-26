import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

interface AddGoalScreenProps {
  onBack: () => void;
}

export default function AddGoalScreen({
  onBack,
}: AddGoalScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    'Viagem',
    'Carro',
    'Casa',
    'Tecnologia',
    'Educação',
    'Negócio',
    'Saúde',
    'Esporte',
    'Família',
    'Férias',
    'Presente',
    'Outro',
  ];

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

          <Text style={styles.valueText}>
            R$ 0,00
          </Text>
        </View>

        <Text style={styles.label}>Nome da meta</Text>

        <TextInput
          placeholder="Ex: Viagem para Europa"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
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
              onPress={() =>
                setSelectedCategory(category)
              }
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

        <Text style={styles.label}>
          Prazo (opcional)
        </Text>

        <TextInput
          placeholder="__/__/____"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />

        <Text style={styles.label}>
          Valor inicial (opcional)
        </Text>

        <TextInput
          placeholder="R$ 0,00"
          keyboardType="numeric"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />

        <Text style={styles.label}>
          Descrição (opcional)
        </Text>

        <TextInput
          placeholder="Detalhes da meta..."
          placeholderTextColor="#9CA3AF"
          style={[
            styles.input,
            styles.descriptionInput,
          ]}
          multiline
        />

        <TouchableOpacity style={styles.saveButton}>
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

  descriptionInput: {
    height: 110,
    paddingTop: 15,
    textAlignVertical: 'top',
  },

  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  categoryCard: {
    width: '31%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
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
});