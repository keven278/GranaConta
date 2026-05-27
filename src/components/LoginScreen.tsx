import { useState } from "react";

import {
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

interface LoginScreenProps {
  onNavigateToSignup?: () => void;
  onLoginSuccess?: () => void;
}

export default function LoginScreen({
  onNavigateToSignup,
  onLoginSuccess,
}: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin() {
    console.log("Email:", email);
    console.log("Senha:", senha);

    onLoginSuccess?.();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>LOGIN</Text>
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

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>ENTRAR</Text>
            </TouchableOpacity>

            <View style={styles.signupArea}>
              <Text style={styles.signupText}>Não tem conta? </Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onNavigateToSignup}
              >
                <Text style={styles.signupLink}>Cadastre-se</Text>
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
    marginTop: 28,
    marginBottom: 28,
  },

  logo: {
    width: 140,
    height: 140,
  },

  form: {
    flex: 1,
  },

  inputGroup: {
    marginBottom: 16,
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

  loginButton: {
    width: "100%",
    backgroundColor: "#4ade80",
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },

  loginButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
  },

  signupArea: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  signupText: {
    color: "#4b5563",
    fontSize: 12,
  },

  signupLink: {
    color: "#22c55e",
    fontSize: 12,
    fontWeight: "700",
  },
});
