import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function CatchAll() {
  const router = useRouter();

  useEffect(() => {
    // Redirect unmatched routes to sign-in
    router.replace("/(auth)/signin");
  }, []);

  // Optional: show a small message while redirecting
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 16, textAlign: "center" }}>
        Page not found. Redirecting to sign-in...
      </Text>
    </View>
  );
}
