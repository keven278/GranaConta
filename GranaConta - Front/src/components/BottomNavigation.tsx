import { BarChart3, Home, Target } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type NavigationScreen = "home" | "report" | "goals";

interface BottomNavigationProps {
  activeScreen: NavigationScreen;
  onNavigate: (screen: NavigationScreen) => void;
}

export default function BottomNavigation({
  activeScreen,
  onNavigate,
}: BottomNavigationProps) {
  const navItems = [
    {
      id: "home" as const,
      icon: Home,
      label: "Início",
    },
    {
      id: "report" as const,
      icon: BarChart3,
      label: "Relatório",
    },
    {
      id: "goals" as const,
      icon: Target,
      label: "Metas",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navContent}>
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive = activeScreen === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.75}
              onPress={() => onNavigate(item.id)}
              style={[
                styles.navButton,
                isActive ? styles.navButtonActive : styles.navButtonInactive,
              ]}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 2}
                color={isActive ? "#4ade80" : "rgba(255,255,255,0.65)"}
              />

              <Text
                style={[
                  styles.navLabel,
                  isActive ? styles.navLabelActive : styles.navLabelInactive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1e3a5f",
    paddingHorizontal: 8,
    paddingTop: 10,
    paddingBottom: 10,
  },

  navContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  navButton: {
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingHorizontal: 24,
    paddingVertical: 7,
    borderRadius: 10,
  },

  navButtonActive: {
    backgroundColor: "rgba(255,255,255,0.10)",
  },

  navButtonInactive: {
    backgroundColor: "transparent",
  },

  navLabel: {
    fontSize: 10,
    fontWeight: "600",
  },

  navLabelActive: {
    color: "#4ade80",
  },

  navLabelInactive: {
    color: "rgba(255,255,255,0.65)",
  },
});
