import { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import BottomNavigation from "./components/BottomNavigation";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import GoalsScreen from "./components/GoalsScreen";
import HomeScreen from "./components/HomeScreen";
import ReportScreen from "./components/ReportScreen";
import AddFixedExpenseScreen from "./components/AddFixedExpenseScreen";
import AddGoalScreen from "./components/AddGoalScreen";
import AddTransactionScreen from "./components/AddTransactionScreen";
import AdminPremiumScreen from "./components/AdminPremiumScreen";

console.log(AddTransactionScreen);

import ForgotPasswordScreen from "./components/ForgotPasswordScreen";
import ProfileScreen from "./components/ProfileScreen";

export type Screen =
  | "login"
  | "signup"
  | "forgotPassword"
  | "home"
  | "report"
  | "goals"
  | "addTransaction"
  | "addFixedExpense"
  | "addGoal"
  | "profile"
  | "adminPremium";

export default function GranacontaApp() {
  const [activeScreen, setActiveScreen] = useState<Screen>("login");
  const [homeRefresh, setHomeRefresh] = useState(0);

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
            onNavigateToForgotPassword={() => setActiveScreen("forgotPassword")}
            onLoginSuccess={() => setActiveScreen("home")}
          />
        )}

        {activeScreen === "signup" && (
          <SignupScreen
            onNavigateToLogin={() => setActiveScreen("login")}
            onSignupSuccess={() => setActiveScreen("home")}
          />
        )}

        {activeScreen === "forgotPassword" && (
          <ForgotPasswordScreen onBack={() => setActiveScreen("login")} />
        )}

        {activeScreen === "home" && (
          <HomeScreen
          refresh={homeRefresh}
          onOpenAddTransaction={() => setActiveScreen("addTransaction")}
          onOpenAddFixedExpense={() => setActiveScreen("addFixedExpense")}
          onOpenProfile={() => setActiveScreen("profile")}
          />
        )}

        {activeScreen === "report" && <ReportScreen />}

        {activeScreen === "goals" && (
          <GoalsScreen
            onOpenAddGoal={() => setActiveScreen("addGoal")}
            onOpenProfile={() => setActiveScreen("profile")}
          />
        )}

        {activeScreen === "addTransaction" && (
          <AddTransactionScreen onBack={() => {setHomeRefresh((prev) => prev + 1);setActiveScreen("home");}}/>
        )}

        {activeScreen === "addFixedExpense" && (
          <AddFixedExpenseScreen onBack={() => setActiveScreen("home")} />
        )}

        {activeScreen === "addGoal" && (
          <AddGoalScreen onBack={() => setActiveScreen("goals")} />
        )}

        {activeScreen === "profile" && (
          <ProfileScreen
          onBack={() => setActiveScreen("home")}
          onLogout={() => setActiveScreen("login")}
          onOpenAdmin={() => setActiveScreen("adminPremium")}
          />
        )}

        {activeScreen === "adminPremium" && (
          <AdminPremiumScreen onBack={() => setActiveScreen("profile")}/>
        )}

        {showBottomNavigation && (
          <BottomNavigation
            activeScreen={activeScreen}
            onNavigate={(screen) => setActiveScreen(screen)}
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
