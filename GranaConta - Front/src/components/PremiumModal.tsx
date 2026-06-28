import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import {
  Crown,
  X,
  Check,
  FileText,
  ChartColumn,
  Bell,
  Headphones,
} from "lucide-react-native";

interface PremiumModalProps {
  visible: boolean;
  onClose: () => void;
  onSubscribe?: () => void;
}

export default function PremiumModal({
  visible,
  onClose,
  onSubscribe,
}: PremiumModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>

        <View style={styles.container}>

          {/* CABEÇALHO */}

          <View style={styles.header}>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <X color="#FFF" size={22} />
            </TouchableOpacity>

            <View style={styles.logoCircle}>
              <Crown color="#FFD54F" size={32} />
            </View>

            <Text style={styles.title}>
              PREMIUM ⭐
            </Text>

            <Text style={styles.subtitle}>
              GranaConta Pro
            </Text>

            <Text style={styles.description}>
              Tenha controle total das suas finanças
              com recursos exclusivos.
            </Text>

          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
          >

            <Text style={styles.sectionTitle}>
              O QUE ESTÁ INCLUSO
            </Text>
                        {/* CARD 1 */}

            <View style={styles.featureCardActive}>

              <View style={styles.iconCircleGold}>
                <FileText color="#F4B400" size={22} />
              </View>

              <Text style={styles.featureTextActive}>
                Exportar relatórios em arquivo CSV
              </Text>

              <Check color="#22c55e" size={20} />

            </View>

            {/* CARD 2 */}

            <View style={styles.featureCard}>

              <View style={styles.iconCircle}>
                <ChartColumn color="#9CA3AF" size={20} />
              </View>

              <Text style={styles.featureText}>
                Gráficos e análises avançadas
              </Text>

              <Check color="#22c55e" size={20} />

            </View>

            {/* CARD 3 */}

            <View style={styles.featureCard}>

              <View style={styles.iconCircle}>
                <Bell color="#9CA3AF" size={20} />
              </View>

              <Text style={styles.featureText}>
                Sem anúncios no aplicativo
              </Text>

              <Check color="#22c55e" size={20} />

            </View>

            {/* CARD 4 */}

            <View style={styles.featureCard}>

              <View style={styles.iconCircle}>
                <Headphones color="#9CA3AF" size={20} />
              </View>

              <Text style={styles.featureText}>
                Suporte prioritário 24h
              </Text>

              <Check color="#22c55e" size={20} />

            </View>

            {/* PLANOS */}

            <View style={styles.planCard}>

              <View>

                <Text style={styles.planTitle}>
                  Plano mensal
                </Text>

                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>

                  <Text style={styles.price}>
                    R$ 9,90
                  </Text>

                  <Text style={styles.month}>
                    /mês
                  </Text>

                </View>

              </View>

              <View style={{ alignItems: "flex-end" }}>

                <Text style={styles.annualGreen}>
                  ou anual
                </Text>

                <Text style={styles.annualPrice}>
                  R$ 89,90/ano
                </Text>

                <Text style={styles.discount}>
                  Economize 24%
                </Text>

              </View>

            </View>
                        <TouchableOpacity
              style={styles.subscribeButton}
              activeOpacity={0.85}
              onPress={onSubscribe}
            >
              <Text style={styles.subscribeText}>
                ASSINAR PREMIUM
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.notNowButton}
              activeOpacity={0.7}
              onPress={onClose}
            >
              <Text style={styles.notNowText}>
                Agora não
              </Text>
            </TouchableOpacity>

          </ScrollView>

        </View>

      </View>

    </Modal>
  );
}

const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
  },

  container: {
    width: "100%",
    maxHeight: "90%",
    backgroundColor: "#FFF",
    borderRadius: 28,
    overflow: "hidden",
  },

  header: {
    backgroundColor: "#1E3A5F",
    alignItems: "center",
    paddingTop: 26,
    paddingBottom: 30,
    paddingHorizontal: 25,
  },

  closeButton: {
    position: "absolute",
    right: 18,
    top: 18,
  },

  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,.12)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    color: "#FFD54F",
    fontSize: 28,
    fontWeight: "800",
  },

  subtitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 6,
  },

  description: {
    color: "#E5E7EB",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
    fontSize: 14,
    paddingHorizontal: 10,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1E3A5F",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
    featureCardActive: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8E1",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#FFD54F",
  },

  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 18,
  },

  iconCircleGold: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFF3CD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EEF2F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  featureTextActive: {
    flex: 1,
    color: "#1E3A5F",
    fontWeight: "700",
    fontSize: 14,
  },

  featureText: {
    flex: 1,
    color: "#374151",
    fontSize: 14,
    fontWeight: "600",
  },

  planCard: {
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 25,
    backgroundColor: "#F4F8FC",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  planTitle: {
    color: "#6B7280",
    fontSize: 13,
    marginBottom: 5,
  },

  price: {
    color: "#1E3A5F",
    fontSize: 30,
    fontWeight: "800",
  },

  month: {
    color: "#6B7280",
    marginLeft: 4,
    marginBottom: 4,
  },

  annualGreen: {
    color: "#22C55E",
    fontWeight: "700",
    fontSize: 13,
  },

  annualPrice: {
    color: "#1E3A5F",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 3,
  },

  discount: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 2,
  },

  subscribeButton: {
    backgroundColor: "#FFC107",
    marginHorizontal: 20,
    paddingVertical: 17,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 5,
  },

  subscribeText: {
    color: "#1E3A5F",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.6,
  },

  notNowButton: {
    alignItems: "center",
    paddingBottom: 28,
  },

  notNowText: {
    color: "#6B7280",
    fontWeight: "700",
    fontSize: 15,
  },
});