import { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import {
  X,
  Crown,
  CheckCircle2,
  Download,
  FileDown,
} from "lucide-react-native";

interface ExportModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ExportModal({
  visible,
  onClose,
}: ExportModalProps) {
  const [step, setStep] = useState<"ready" | "loading" | "success">("ready");

  useEffect(() => {
    if (visible) {
      setStep("ready");
    }
  }, [visible]);

  function gerarCSV() {
    setStep("loading");

    setTimeout(() => {
      setStep("success");
    }, 2000);
  }

  function baixarCSV() {
    console.log("Download CSV");

    // Aqui depois será integrado com o backend.

    onClose();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>

          <View style={styles.header}>

            <TouchableOpacity
              style={styles.close}
              onPress={onClose}
            >
              <X color="#fff" size={28} />
            </TouchableOpacity>

            <View style={styles.iconCircle}>
              <FileDown color="#FFD54F" size={38} />
            </View>

            <Text style={styles.title}>
              EXPORTAR RELATÓRIO
            </Text>

            <Text style={styles.subtitle}>
              Formato CSV - Junho 2026
            </Text>

          </View>

          <View style={styles.content}>

            <Text style={styles.section}>
              CONTEÚDO DO RELATÓRIO
            </Text>

            {[
              "Resumo de receitas e despesas",
              "Gráficos por categoria e forma de pagamento",
              "Despesas essenciais vs. não essenciais",
              "Evolução dos gastos no período",
              "Análise de economia mensal",
            ].map((item, index) => (
              <View
                key={index}
                style={styles.item}
              >
                <CheckCircle2
                  size={20}
                  color="#4ADE80"
                />

                <Text style={styles.itemText}>
                  {item}
                </Text>
              </View>
            ))}

            {step === "ready" && (
              <TouchableOpacity
                style={styles.button}
                onPress={gerarCSV}
              >
                <Text style={styles.buttonText}>
                  GERAR CSV
                </Text>
              </TouchableOpacity>
            )}

            {step === "loading" && (
              <TouchableOpacity
                disabled
                style={styles.button}
              >
                <ActivityIndicator
                  color="#1E3A5F"
                />

                <Text
                  style={[
                    styles.buttonText,
                    { marginLeft: 10 },
                  ]}
                >
                  GERANDO CSV...
                </Text>
              </TouchableOpacity>
            )}

            {step === "success" && (
              <>
                <View style={styles.success}>
                  <CheckCircle2
                    color="#4ADE80"
                    size={22}
                  />

                  <Text style={styles.successText}>
                    CSV GERADO COM SUCESSO!
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={baixarCSV}
                >
                  <Download
                    color="#1E3A5F"
                    size={18}
                  />

                  <Text
                    style={[
                      styles.buttonText,
                      { marginLeft: 8 },
                    ]}
                  >
                    BAIXAR CSV
                  </Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelar}>
                Cancelar
              </Text>
            </TouchableOpacity>

          </View>

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
    padding: 20,
  },

  modal: {
    width: "100%",
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: "#fff",
  },

  header: {
    backgroundColor: "#274A7E",
    paddingVertical: 30,
    alignItems: "center",
  },

  close: {
    position: "absolute",
    right: 18,
    top: 18,
  },

  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,.08)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    color: "#FFD54F",
    fontSize: 30,
    fontWeight: "800",
  },

  subtitle: {
    color: "#fff",
    marginTop: 8,
    fontSize: 16,
  },

  content: {
    padding: 24,
  },

  section: {
    color: "#6B7280",
    fontWeight: "700",
    marginBottom: 18,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  itemText: {
    marginLeft: 10,
    color: "#4B5563",
    fontSize: 15,
  },

  button: {
    marginTop: 22,
    backgroundColor: "#FFC107",
    borderRadius: 14,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  buttonText: {
    color: "#1E3A5F",
    fontWeight: "800",
    fontSize: 18,
  },

  success: {
    marginTop: 22,
    backgroundColor: "#4ADE80",
    borderRadius: 14,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  successText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 17,
    marginLeft: 8,
  },

  cancelar: {
    textAlign: "center",
    marginTop: 22,
    color: "#6B7280",
    fontSize: 16,
  },
});