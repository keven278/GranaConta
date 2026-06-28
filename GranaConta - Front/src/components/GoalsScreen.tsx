import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import { Alert } from "react-native";
import EditGoalModal from "./EditGoalModal";
import ConfirmDeleteGoalModal from "./ConfirmDeleteGoalModal";
import {
  Car,
  CheckSquare,
  GraduationCap,
  Home,
  Laptop,
  MoreVertical,
  Plane,
  Plus,
  Shield,
  Square,
  UserCircle2,
} from "lucide-react-native";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";

interface GoalsScreenProps {
  onOpenAddGoal?: () => void;
  onOpenProfile?: () => void;
}

export default function GoalsScreen({ 
  onOpenAddGoal,
  onOpenProfile,
}: GoalsScreenProps) {
  const [selectedGoal, setSelectedGoal] = useState<any>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showEditGoal, setShowEditGoal] = useState(false);
  const [showDeleteGoal, setShowDeleteGoal] = useState(false);
  const [metas, setMetas] = useState<any[]>([]);
  const totalMetas = metas.length;
  const metasConcluidas = metas.filter((meta) => meta.concluida).length;
  const percentualConcluido =
    totalMetas > 0 ? Math.round((metasConcluidas / totalMetas) * 100) : 0;

  function toggleMeta(index: number) {
    const novasMetas = [...metas];
    novasMetas[index].concluida = !novasMetas[index].concluida;
    setMetas(novasMetas);
  }

  function formatarValor(valor: number) {
    return valor.toLocaleString("pt-BR");
  }

 async function carregarMetas() {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await api.get("/metas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("RESPOSTA DA API:", response.data);
    console.log(response.data.metas);

    const listaMetas = response.data.metas || response.data;

    const metasFormatadas = listaMetas.map((meta: any) => ({
      ...meta,
      concluida: false,
      icon: Plane,
      color: "#3b82f6",
    }));

    setMetas(metasFormatadas);

  } catch (error: any) {
    console.log("ERRO:", error);
    console.log("STATUS:", error.response?.status);
    console.log("DADOS:", error.response?.data);

    Alert.alert(
      "Erro",
      error.response?.data?.erro || "Erro ao carregar metas."
    );
  }
}
useEffect(() => {
  carregarMetas();
}, []);

async function editarMeta(meta: any) {
  try {
    const token = await AsyncStorage.getItem("token");

    await api.put(
      `/metas/${meta.id}`,
      {
        nome: meta.nome,
        valor: String(meta.valor).replace(/\./g, "").replace(",", "."),
        adicionar: "0,00",
        subtrair: "0,00",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setShowEditGoal(false);
    setSelectedGoal(null);
    setMenuVisible(false);

    carregarMetas();

    Alert.alert("Sucesso", "Meta atualizada com sucesso!");

  } catch (error: any) {
    console.log(error);

    Alert.alert(
      "Erro",
      error.response?.data?.erro ??
      "Erro ao editar a meta."
    );
  }
}

async function excluirMeta() {
  try {
    const token = await AsyncStorage.getItem("token");

    await api.delete(
      `/metas/${selectedGoal.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setShowDeleteGoal(false);
    setSelectedGoal(null);
    setMenuVisible(false);

    carregarMetas();

    Alert.alert(
      "Sucesso",
      "Meta excluída com sucesso!"
    );

  } catch (error: any) {

    console.log(error);

    Alert.alert(
      "Erro",
      error.response?.data?.erro ??
      "Erro ao excluir meta."
    );
  }
}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.emptyIconSpace} />

        <Text style={styles.headerTitle}>METAS</Text>

        <TouchableOpacity activeOpacity={0.7}onPress={onOpenProfile}>
          <UserCircle2 size={26} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <View>
            <Text style={styles.progressLabel}>Progresso Geral</Text>
            <Text style={styles.progressText}>
              {metasConcluidas} de {totalMetas} concluídas
            </Text>
          </View>

          <Text style={styles.progressPercent}>{percentualConcluido}%</Text>
        </View>

        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${percentualConcluido}%` },
            ]}
          />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>MINHAS METAS</Text>

        <ScrollView
          style={styles.goalsList}
          contentContainerStyle={styles.goalsListContent}
          showsVerticalScrollIndicator={false}
        >
          {metas.map((meta, index) => {
            const Icon = meta.icon;

            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.75}
                style={styles.goalCard}
                onPress={() => toggleMeta(index)}
              >
                <View style={styles.checkContainer}>
                  {meta.concluida ? (
                    <CheckSquare size={22} color="#4ade80" />
                  ) : (
                    <Square size={22} color="#9ca3af" />
                  )}
                </View>

                <View
                  style={[
                    styles.goalIconContainer,
                    { backgroundColor: `${meta.color}20` },
                  ]}
                >
                  <Icon size={20} color={meta.color} />
                </View>

<View style={styles.goalInfo}>
  <Text
    style={[
      styles.goalName,
      meta.concluida && styles.goalNameCompleted,
    ]}
    numberOfLines={1}
  >
    {meta.nome}
  </Text>

  <Text style={styles.goalValue}>
   R$ {formatarValor( parseFloat(String(meta.valor).replace(",", ".")))}
  </Text>
</View>

<TouchableOpacity
  onPress={() => {
    setSelectedGoal(meta);
    setMenuVisible(true);
  }}
>
  <MoreVertical size={22} color="#6B7280" />
</TouchableOpacity>

    </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Modal
  visible={menuVisible}
  transparent
  animationType="fade"
  onRequestClose={() => setMenuVisible(false)}
>
  <TouchableOpacity
    style={{
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.25)",
      justifyContent: "center",
      alignItems: "center",
    }}
    activeOpacity={1}
    onPress={() => setMenuVisible(false)}
  >
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        width: 220,
        paddingVertical: 8,
      }}
    >
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          setMenuVisible(false);
          setShowEditGoal(true);
        }}
      >
        <Text style={styles.menuText}>
          ✏️ Editar Meta
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          setMenuVisible(false);
          setShowDeleteGoal(true);
        }}
      >
        <Text style={styles.deleteText}>
          🗑 Excluir Meta
        </Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
</Modal>
<EditGoalModal
  visible={showEditGoal}
  goal={selectedGoal}
  onClose={() => setShowEditGoal(false)}
  onSave={editarMeta}
  onDelete={() => {
    setShowEditGoal(false);
    setShowDeleteGoal(true);
  }}
/>

<ConfirmDeleteGoalModal
  visible={showDeleteGoal}
  goal={selectedGoal}
  onCancel={() => setShowDeleteGoal(false)}
  onDelete={excluirMeta}
/>
        <TouchableOpacity
        activeOpacity={0.8}
        style={styles.addGoalButton}
        onPress={onOpenAddGoal}>
          <Plus size={18} color="#22c55e" />
          <Text style={styles.addGoalText}>Adicionar Nova Meta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    paddingBottom: 64,
  },

  header: {
    backgroundColor: "#1e3a5f",
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  emptyIconSpace: {
    width: 26,
  },

  headerTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
  },

  progressSection: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  progressLabel: {
    color: "#6b7280",
    fontSize: 12,
    marginBottom: 3,
  },

  progressText: {
    color: "#1f2937",
    fontSize: 18,
    fontWeight: "800",
  },

  progressPercent: {
    color: "#4ade80",
    fontSize: 32,
    fontWeight: "800",
  },

  progressBarBackground: {
    width: "100%",
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 999,
    overflow: "hidden",
  },

  progressBarFill: {
    height: "100%",
    backgroundColor: "#4ade80",
    borderRadius: 999,
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
  },

  sectionTitle: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 10,
  },

  goalsList: {
    flex: 1,
    marginBottom: 12,
  },

  goalsListContent: {
    gap: 9,
    paddingBottom: 4,
  },

  goalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#f3f4f6",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  checkContainer: {
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  goalIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  goalInfo: {
    flex: 1,
  },

  goalName: {
    color: "#1f2937",
    fontSize: 14,
    fontWeight: "700",
  },

  goalNameCompleted: {
    color: "#9ca3af",
    textDecorationLine: "line-through",
  },

  goalValue: {
    color: "#6b7280",
    fontSize: 12,
    marginTop: 3,
  },

  addGoalButton: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },

  addGoalText: {
    color: "#22c55e",
    fontSize: 12,
    fontWeight: "800",
  },
  menuButton: {
  padding: 4,
  marginLeft: 8,
},
menu: {
  position: "absolute",
  right: 8,
  top: 50,
  backgroundColor: "#FFF",
  borderRadius: 10,
  elevation: 6,
  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowRadius: 6,
  paddingVertical: 6,
  minWidth: 150,
  zIndex: 999,
},

menuItem: {
  paddingHorizontal: 16,
  paddingVertical: 12,
},

menuText: {
  color: "#374151",
  fontWeight: "600",
},

deleteText: {
  color: "#EF4444",
  fontWeight: "600",
},
});
