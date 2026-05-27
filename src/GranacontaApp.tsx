import { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import BottomNavigation from "./components/BottomNavigation";
import GoalsScreen from "./components/GoalsScreen";
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import ReportScreen from "./components/ReportScreen";
import SignupScreen from "./components/SignupScreen";

export type Screen = "login" | "signup" | "home" | "report" | "goals";

export default function GranacontaApp() {
  const [activeScreen, setActiveScreen] = useState<Screen>("login");

  const showBottomNavigation =
    activeScreen === "home" ||
    activeScreen === "report" ||
    activeScreen === "goals";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {activeScreen === "login" && (
          <LoginScreen
            onNavigateToSignup={() => setActiveScreen("signup")}
            onLoginSuccess={() => setActiveScreen("home")}
          />
        )}

        {activeScreen === "signup" && (
          <SignupScreen
            onNavigateToLogin={() => setActiveScreen("login")}
            onSignupSuccess={() => setActiveScreen("home")}
          />
        )}

        {activeScreen === "home" && <HomeScreen />}

        {activeScreen === "report" && <ReportScreen />}

        {activeScreen === "goals" && <GoalsScreen />}

        {showBottomNavigation && (
          <BottomNavigation
            activeScreen={activeScreen}
            onNavigate={setActiveScreen}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },

  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
});
