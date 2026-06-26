import { useState } from "react";

import {
  Car,
  CheckSquare,
  GraduationCap,
  Home,
  Laptop,
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
} from "react-native";

interface GoalsScreenProps {
  onOpenAddGoal?: () => void;
  onOpenProfile?: () => void;
}

export default function GoalsScreen({
  onOpenAddGoal,
  onOpenProfile,
}: GoalsScreenProps) {
  const [metas, setMetas] = useState([
    {
      nome: "Viagem internacional",
      valor: 5000,
      concluida: false,
      icon: Plane,
      color: "#3b82f6",
    },
    {
      nome: "Comprar um carro",
      valor: 30000,
      concluida: true,
      icon: Car,
      color: "#10b981",
    },
    {
      nome: "Dar entrada na casa própria",
      valor: 50000,
      concluida: false,
      icon: Home,
      color: "#8b5cf6",
    },
    {
      nome: "Trocar de notebook",
      valor: 4000,
      concluida: true,
      icon: Laptop,
      color: "#f59e0b",
    },
    {
      nome: "Fundo para estudos",
      valor: 10000,
      concluida: false,
      icon: GraduationCap,
      color: "#3b82f6",
    },
    {
      nome: "Reserva de emergência",
      valor: 15000,
      concluida: false,
      icon: Shield,
      color: "#ef4444",
    },
  ]);

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.emptyIconSpace} />

        <Text style={styles.headerTitle}>METAS</Text>

        <TouchableOpacity activeOpacity={0.7}>
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
                    R$ {formatarValor(meta.valor)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        
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
});
