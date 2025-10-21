import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function LogoutScreen() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        // 🧹 Clear auth tokens
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");

        // ⏩ Redirect back to sign-in page
        router.replace("/signin");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    logout();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#f9b145" />
      <Text style={{ marginTop: 12, fontSize: 16, color: "#4e2a14" }}>
        Logging you out...
      </Text>
    </View>
  );
}
