import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

interface Props {
  onBack: () => void;
}

export default function AdminPremiumScreen({
  onBack,
}: Props) {

  const [senhaAdmin, setSenhaAdmin] = useState("");

  async function alterarPremium(premium: number) {
    try {

      const token = await AsyncStorage.getItem("token");

      const userId = await AsyncStorage.getItem("usuarioId");
      await api.patch(`/admin/usuario/${userId}`,
        {
          senhaAdmin,
          premium,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert(
        "Sucesso",
        premium === 1
          ? "Usuário agora é Premium."
          : "Premium removido."
      );

    } catch (error: any) {

      console.log(error.response?.data);

      Alert.alert(
        "Erro",
        error.response?.data?.erro ??
        "Não foi possível alterar o plano."
      );
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>
          ADMIN PREMIUM
        </Text>
      </View>

      <Text style={styles.label}>
        Senha do administrador
      </Text>

      <TextInput
        value={senhaAdmin}
        onChangeText={setSenhaAdmin}
        secureTextEntry
        style={styles.input}
        placeholder="Digite a senha"
      />

      <TouchableOpacity
        style={styles.greenButton}
        onPress={() => alterarPremium(1)}
      >
        <Text style={styles.buttonText}>
          ATIVAR PREMIUM
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.redButton}
        onPress={() => alterarPremium(0)}
      >
        <Text style={styles.buttonText}>
          REMOVER PREMIUM
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onBack}
      >
        <Text style={styles.back}>
          Voltar
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#F5F7FA",
    padding:20,
    justifyContent:"center",
  },

  header:{
    marginBottom:30,
    alignItems:"center",
  },

  title:{
    fontSize:24,
    fontWeight:"800",
    color:"#1E3A5F",
  },

  label:{
    fontSize:15,
    fontWeight:"700",
    marginBottom:8,
    color:"#374151",
  },

  input:{
    backgroundColor:"#fff",
    borderRadius:12,
    paddingHorizontal:15,
    height:55,
    marginBottom:25,
    elevation:2,
  },

  greenButton:{
    backgroundColor:"#22C55E",
    height:55,
    borderRadius:12,
    justifyContent:"center",
    alignItems:"center",
    marginBottom:15,
  },

  redButton:{
    backgroundColor:"#EF4444",
    height:55,
    borderRadius:12,
    justifyContent:"center",
    alignItems:"center",
    marginBottom:20,
  },

  buttonText:{
    color:"#fff",
    fontWeight:"800",
    fontSize:15,
  },

  back:{
    textAlign:"center",
    color:"#6B7280",
    fontSize:15,
  },

});