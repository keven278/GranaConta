import { useState } from "react";
import PremiumModal from "./PremiumModal";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
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

import {
  Crown,
  Star,
  X,
  Check,
  FileText,
  BarChart2,
} from "lucide-react-native";

import logoImg from "../imports/logo.png";

interface LoginScreenProps {
  onNavigateToSignup?: () => void;
  onNavigateToForgotPassword?: () => void;
  onLoginSuccess?: () => void;
}

export default function LoginScreen({
  onNavigateToSignup,
  onNavigateToForgotPassword,
  onLoginSuccess,
}: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPremium, setShowPremium] = useState(false);

async function handleLogin() {
  if (!email || !senha) {
    Alert.alert("Erro", "Preencha email e senha.");
    return;
  }

  try {
    const response = await api.post("/usuarios/login", {
      email,
      senha,
    });
    const token = response.data.token;
    await AsyncStorage.setItem("token", token);
const usuario = await api.get("/usuario", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
console.log(usuario.data);
await AsyncStorage.setItem(
  "usuarioId",
  usuario.data.id.toString()
);
console.log("Token salvo:", token);
Alert.alert("Sucesso", "Login realizado!");
onLoginSuccess?.();

  } catch (error: any) {
    if (error.response) {
      Alert.alert("Erro", error.response.data.erro);
    } else {
      Alert.alert(
        "Erro",
        "Não foi possível conectar ao servidor."
      );
    }
    console.log(error);
  }
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

            <TouchableOpacity
            activeOpacity={0.7}
            onPress={onNavigateToForgotPassword}
            style={{ marginTop: 12, alignItems: "center" }}>
              <Text style={{ color: "#2563eb", fontWeight: "600" }}>Esqueceu sua senha?</Text>
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
            <TouchableOpacity
            activeOpacity={0.9}
            style={styles.premiumBanner}
            onPress={() => setShowPremium(true)}>
              <View style={styles.premiumContent}>
                <View style={styles.crownContainer}>
                  <Crown color="#FFD54F" size={24} />
                  </View><View style={{ flex: 1 }}>
                    <View
                     style={{flexDirection: "row",alignItems: "center",}}
                     >
                      <Text style={styles.premiumTitle}>GRANACONTA PREMIUM</Text>
                      <Star size={12}color="#FFD54F"fill="#FFD54F"style={{ marginLeft: 5 }}/>
                      </View>
                      <Text style={styles.premiumSubtitle}>Relatórios em CSV, gráficos avançados e muito mais.</Text>
                      <Text style={styles.premiumPrice}>A partir de R$ 9,90/mês</Text>
                      </View>
                      <View style={styles.assinarButton}><Text style={styles.assinarText}>ASSINAR</Text>
                      </View>
                      </View>
                      </TouchableOpacity>
                    </View>
                  </ScrollView> 
              </KeyboardAvoidingView>
              <PremiumModal
              visible={showPremium}
              onClose={() => setShowPremium(false)}
              onSubscribe={() => {
                console.log("Usuário assinou o Premium");
                setShowPremium(false);}}/>
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
  premiumBanner: {
  marginTop: 20,
  borderRadius: 18,
  overflow: "hidden",
  backgroundColor: "#2E4F87",
  elevation: 5,
},

premiumContent: {
  flexDirection: "row",
  alignItems: "center",
  padding: 16,
},

crownContainer: {
  width: 48,
  height: 48,
  borderRadius: 24,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255,204,0,0.15)",
  borderWidth: 1,
  borderColor: "#FFD54F",
  marginRight: 12,
},

premiumTitle: {
  color: "#FFD54F",
  fontWeight: "800",
  fontSize: 14,
},

premiumSubtitle: {
  color: "#FFF",
  fontSize: 11,
  marginTop: 2,
},

premiumPrice: {
  color: "#FFD54F",
  fontSize: 11,
  marginTop: 5,
  fontWeight: "700",
},

assinarButton: {
  backgroundColor: "#FFC107",
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 12,
  marginLeft: 10,
},

assinarText: {
  color: "#1E3A5F",
  fontWeight: "800",
  fontSize: 12,
},
});

