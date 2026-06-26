import React, { useState } from 'react';
import {
  View,
 Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

interface ForgotPasswordScreenProps {
  onBack: () => void;
}

export default function ForgotPasswordScreen({
  onBack,
}: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          RECUPERAR SENHA
        </Text>

        <View style={{ width: 20 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🔒</Text>
        </View>

        <Text style={styles.title}>
          Esqueceu sua senha?
        </Text>

        <Text style={styles.description}>
          Informe seu e-mail cadastrado para receber
          as instruções de redefinição de senha.
        </Text>

        <Text style={styles.label}>
          E-mail
        </Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>
            ENVIAR INSTRUÇÕES
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onBack}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>
            Voltar para o login
          </Text>
        </TouchableOpacity>
      </View>
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
    flex: 1,
    padding: 25,
    justifyContent: 'center',
  },

  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  icon: {
    fontSize: 60,
  },

  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10,
  },

  description: {
    textAlign: 'center',
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#FFF',
    height: 55,
    borderRadius: 12,
    paddingHorizontal: 15,
    elevation: 2,
    marginBottom: 25,
  },

  sendButton: {
    backgroundColor: PRIMARY_GREEN,
    height: 55,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sendButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },

  loginButton: {
    alignItems: 'center',
    marginTop: 20,
  },

  loginButtonText: {
    color: PRIMARY_BLUE,
    fontWeight: '600',
  },
});