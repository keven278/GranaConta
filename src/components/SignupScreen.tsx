import { useState } from "react";

import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import logoImg from "../imports/logo.png";

interface SignupScreenProps {
  onNavigateToLogin?: () => void;
  onSignupSuccess?: () => void;
}

export default function SignupScreen({
  onNavigateToLogin,
  onSignupSuccess,
}: SignupScreenProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [rendaMensal, setRendaMensal] = useState("");
  function formatarMoeda(valor: string) {
    const numero = valor.replace(/\D/g, "");
    return (
      Number(numero) / 100).toLocaleString("pt-BR", {minimumFractionDigits: 2,maximumFractionDigits: 2,});
}

  async function handleCadastro() {
  try {

    const resposta = await fetch(
      "http://10.0.2.2:3000/usuarios",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
          rendaMensal: Number(rendaMensal.replace(/\./g, "").replace(",", ".")),
        }),
      }
    );

    const dados = await resposta.json();

    if (!resposta.ok) {
      Alert.alert("Erro", dados.erro || "Erro ao cadastrar");
      return;
    }

    Alert.alert(
  "Sucesso",
  "Usuário cadastrado com sucesso! Faça login para continuar.",
  [
    {
      text: "OK",
      onPress: () => onSignupSuccess?.()
    }
  ]
);

  } catch (erro) {

    Alert.alert(
      "Erro",
      "Não foi possível conectar ao servidor"
    );

    console.log(erro);
  }
}



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CADASTRO</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardArea}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <Image source={logoImg} style={styles.logo} resizeMode="contain" />
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome</Text>

              <TextInput
                value={nome}
                onChangeText={setNome}
                placeholder="Digite seu nome"
                placeholderTextColor="#9ca3af"
                autoCapitalize="words"
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha</Text>

              <TextInput
                value={senha}
                onChangeText={setSenha}
                placeholder="Digite sua senha"
                placeholderTextColor="#9ca3af"
                secureTextEntry
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Renda Mensal</Text>
              <TextInput value={rendaMensal}
              placeholder="R$ 0,00"
               placeholderTextColor="#9ca3af"
               keyboardType="numeric"
               style={styles.input}
               onChangeText={(texto) => {setRendaMensal(formatarMoeda(texto)); }}/>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.signupButton}
              onPress={handleCadastro}
            >
              <Text style={styles.signupButtonText}>CADASTRAR</Text>
            </TouchableOpacity>

            <View style={styles.loginArea}>
              <Text style={styles.loginText}>Já realizou o cadastro? </Text>

              <TouchableOpacity activeOpacity={0.7} onPress={onNavigateToLogin}>
                <Text style={styles.loginLink}>Faça login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },

  header: {
    backgroundColor: "#1e3a5f",
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
  },

  keyboardArea: {
    flex: 1,
  },

  content: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },

  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 22,
  },

  logo: {
    width: 125,
    height: 125,
  },

  form: {
    flex: 1,
  },

  inputGroup: {
    marginBottom: 13,
  },

  label: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
  },

  input: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    color: "#1f2937",
    fontSize: 14,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  signupButton: {
    width: "100%",
    backgroundColor: "#4ade80",
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },

  signupButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
  },

  loginArea: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  loginText: {
    color: "#4b5563",
    fontSize: 12,
  },

  loginLink: {
    color: "#22c55e",
    fontSize: 12,
    fontWeight: "700",
  },
});
