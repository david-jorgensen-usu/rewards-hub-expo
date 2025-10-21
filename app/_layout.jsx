import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments(); // tells us current route segment
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // ✅ check for accessToken instead of userToken
        const token = await AsyncStorage.getItem("accessToken");
        const inAuthGroup = segments[0] === "signin" || segments[0] === "signup";

        if (!token && !inAuthGroup) {
          // not logged in, not already in auth screen
          router.replace("/signin");
        } else if (token && inAuthGroup) {
          // logged in but still on signin/signup
          router.replace("/(tabs)");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#f9b145" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
