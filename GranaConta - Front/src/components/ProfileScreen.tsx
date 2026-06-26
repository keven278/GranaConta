import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

interface ProfileScreenProps {
  onBack: () => void;
}

export default function ProfileScreen({
  onBack,
}: ProfileScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          PERFIL
        </Text>

        <View style={{ width: 20 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>L</Text>
          </View>

          <Text style={styles.userName}>
            Luiza Reis
          </Text>

          <Text style={styles.userEmail}>
            luiza@email.com
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            DADOS PESSOAIS
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Nome</Text>
            <Text style={styles.value}>
              Luiza Reis
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>
              luiza@email.com
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Telefone</Text>
            <Text style={styles.value}>
              (11) 99999-9999
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            FINANÇAS
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Renda Mensal
            </Text>

            <Text style={styles.value}>
              R$ 3.500,00
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Metas Ativas
            </Text>

            <Text style={styles.value}>
              4
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Gastos Fixos
            </Text>

            <Text style={styles.value}>
              6
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            CONFIGURAÇÕES
          </Text>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>
              Alterar Dados
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>
              Alterar Senha
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>
              Notificações
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>
              Ajuda
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>
            EDITAR PERFIL
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>
            SAIR DA CONTA
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

  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: PRIMARY_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  avatarText: {
    color: '#FFF',
    fontSize: 40,
    fontWeight: 'bold',
  },

  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
  },

  userEmail: {
    color: '#6B7280',
    marginTop: 5,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: PRIMARY_BLUE,
    marginBottom: 15,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },

  label: {
    color: '#6B7280',
  },

  value: {
    color: '#1F2937',
    fontWeight: '600',
  },

  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },

  optionText: {
    color: '#374151',
    fontWeight: '500',
  },

  editButton: {
    backgroundColor: PRIMARY_GREEN,
    height: 55,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  editButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },

  logoutButton: {
    backgroundColor: '#EF4444',
    height: 55,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 30,
  },

  logoutButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },
});