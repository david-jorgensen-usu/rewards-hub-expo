import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import * as Notifications from "expo-notifications";

// Modern notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const [initialRoute, setInitialRoute] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [notifChecked, setNotifChecked] = useState(false);

  // 🔔 1️⃣ Cold start / last notification
  useEffect(() => {
    const last = Notifications.getLastNotificationResponse();
    const data = last?.notification?.request?.content?.data;

    if (data?.route) {
      setInitialRoute(data.route);
    }
    setNotifChecked(true);
  }, []);

  // 🔔 2️⃣ Live notification listener (foreground/background)
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;
        if (data?.route) {
          router.push(data.route);
        }
      }
    );
    return () => subscription.remove();
  }, []);

  // 🔐 Auth check
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        const inAuthGroup =
          segments[0] === "signin" || segments[0] === "signup";

        if (!token && !inAuthGroup) {
          setInitialRoute("/signin");
        } else if (token && inAuthGroup) {
          setInitialRoute("/(tabs)");
        }
      } catch (e) {
        console.error("Auth error:", e);
      } finally {
        setAuthReady(true);
      }
    };
    initAuth();
  }, [segments]);

  // Navigate once when both auth + notification checks done
  useEffect(() => {
    if (!authReady || !notifChecked) return;
    if (initialRoute) {
      router.replace(initialRoute);
    }
  }, [authReady, notifChecked, initialRoute]);

  // Loading screen
  if (!authReady || !notifChecked) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2255EB" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
