import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View, InteractionManager } from "react-native";

export default function LogoutScreen() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        // Clear all user-related storage
        await AsyncStorage.multiRemove(["accessToken", "refreshToken", "userData", "linkedApps"]);

        // Defer navigation until all interactions / renders are done
        InteractionManager.runAfterInteractions(() => {
          router.replace("/signin");
        });
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
