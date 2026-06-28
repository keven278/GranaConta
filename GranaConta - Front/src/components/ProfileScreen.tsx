import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import api from "../services/api";

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
  onOpenAdmin: () => void;
}

export default function ProfileScreen({
  onBack,
  onLogout,
  onOpenAdmin,
}: ProfileScreenProps) {

  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    carregarUsuario();
  }, []);

  async function carregarUsuario() {
  try {

    const token = await AsyncStorage.getItem("token");

    if (!token) {
      console.log("Token não encontrado.");
      return;
    }

    const response = await api.get("/usuario", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsuario(response.data);

  } catch (error) {
    console.log("Erro ao carregar usuário:", error);
  }
}

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
        <Text style={styles.avatarText}>
          {usuario?.nome?.charAt(0)?.toUpperCase() || "U"}
        </Text>
      </View>

      <Text
        style={styles.userName}
        numberOfLines={1}
      >
        {usuario?.nome || "Carregando..."}
      </Text>

      <Text
        style={styles.userEmail}
        numberOfLines={1}
      >
        {usuario?.email || ""}
      </Text>
    </View>

    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        DADOS PESSOAIS
      </Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>
          Nome
        </Text>

        <Text style={styles.value}>
          {usuario?.nome || "-"}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>
          Email
        </Text>

        <Text style={styles.value}>
          {usuario?.email || "-"}
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
          R$ {usuario?.rendaMensal || "0,00"}
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

    <TouchableOpacity
    style={styles.logoutButton}
    onPress={async () => {
    await AsyncStorage.removeItem("token");
    onLogout();
  }}
>
      <Text style={styles.logoutButtonText}>
        SAIR DA CONTA
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
  style={styles.adminButton}
  onPress={() => onOpenAdmin()}
>
  <Text style={styles.adminButtonText}>
    ADMIN PREMIUM
  </Text>
</TouchableOpacity>

  </ScrollView>
</View>
  );
}

const PRIMARY_BLUE = "#1E3A5F";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  header: {
    backgroundColor: PRIMARY_BLUE,
    paddingTop: 55,
    paddingBottom: 18,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  headerTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  content: {
    padding: 15,
  },

  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: PRIMARY_BLUE,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  avatarText: {
    color: "#FFF",
    fontSize: 40,
    fontWeight: "bold",
  },

  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
  },

  userEmail: {
    color: "#6B7280",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: PRIMARY_BLUE,
    marginBottom: 15,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },

  label: {
    color: "#6B7280",
    fontSize: 14,
  },

  value: {
    color: "#1F2937",
    fontWeight: "600",
    maxWidth: "60%",
    textAlign: "right",
  },

  logoutButton: {
    backgroundColor: "#EF4444",
    height: 55,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },

  logoutButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 15,
  },
  adminButton: {
  backgroundColor: "#1E3A5F",
  marginTop: 20,
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: "center",
},

adminButtonText: {
  color: "#fff",
  fontWeight: "700",
  fontSize: 15,
},
});