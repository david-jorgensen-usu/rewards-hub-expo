import rewards from '@/data/companyData';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CompanyApp() {
  const params = useLocalSearchParams();
  const router = useRouter();
  // try to find company data by reference
  const company =
    rewards.find(item => item.reference === params.company) || {};

  // use params first, fallback to company data
  const reference = params.reference || company.reference;
  const logoFile = params.logoFile || company.logoFile;
  const squareLogo = params.squareLogo || company.squareLogo;
  const website = params.website || company.website;
  const downloadIOS = params.downloadIOS || company.downloadIOS;
  const downloadAndroid = params.downloadAndroid || company.downloadAndroid;
  const appScheme = params.appScheme || company.appScheme;
  const color = params.color || company.color;
  const name = params.name || company.name || reference;

  console.log("CompanyApp company:", company);
  console.log("Company reference:", reference);

  const [showPrompt, setShowPrompt] = useState(false); // 👈 added for modal visibility
  const [isActive, setIsActive] = useState(false);
  const [programAdded, setProgramAdded] = useState(false);

  const removeApp = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken"); // raw string

      if (!token) {
        console.warn("No token found, user not signed in");
        return;
      }

      // Remove from server
      const response = await fetch("https://rewardshub.online/api/unlink-app/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ app_id: reference }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        console.warn("Server did not return valid JSON.");
      }

      console.log("Remove app response:", data);

      if (response.ok) {
        // Update local state
        setIsActive(false);
        setProgramAdded(false);

        // Remove app from AsyncStorage linkedApps
        const stored = await AsyncStorage.getItem("linkedApps");
        const linkedApps = stored ? JSON.parse(stored) : [];
        const updatedApps = linkedApps.filter((app) => app.reference !== reference);
        await AsyncStorage.setItem("linkedApps", JSON.stringify(updatedApps));

        // Redirect to main (tabs) page
        router.replace("/(tabs)");
      } else {
        console.warn("Error removing app:", data.error);
      }
    } catch (err) {
      console.error("Error removing app:", err);
    }
  };


  useEffect(() => {
    const checkLinkedStatus = async () => {
      try {
        const stored = await AsyncStorage.getItem('linkedApps');
        const linkedApps = stored ? JSON.parse(stored) : [];
        const linked = linkedApps.some(app => app.reference === reference);
        setProgramAdded(linked);
        setIsActive(linked); // optional, keeps badge synced
      } catch (err) {
        console.error('Error checking linked app status:', err);
      }
    };

    checkLinkedStatus();
  }, [reference]);

  // ✅ NEW: Handle “Yes” (link app)
  const handleLinkApp = async () => {
    try {
      // 1️⃣ Get the access token directly (stored as a string)
      let token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        Alert.alert("Not signed in", "Please sign in first.");
        return;
      }

      const body = { app_id: reference, notify: true };

      const makeRequest = async (bearerToken) => {
        return fetch("https://rewardshub.online/api/link-app/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
      };

      // 2️⃣ Send initial link request
      let response = await makeRequest(token);

      // 3️⃣ Handle expired token
      if (response.status === 401) {
        const refresh = await AsyncStorage.getItem("refreshToken");
        if (refresh) {
          const refreshResponse = await fetch(
            "https://rewardshub.online/api/token/refresh/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refresh }),
            }
          );

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            token = refreshData.access;
            await AsyncStorage.setItem("accessToken", token);
            response = await makeRequest(token);
          } else {
            Alert.alert(
              "Session expired",
              "Please sign in again to link this app."
            );
            await AsyncStorage.clear();
            router.replace("/profile/logout");
            return;
          }
        } else {
          Alert.alert(
            "Session expired",
            "Please sign in again to link this app."
          );
          await AsyncStorage.clear();
          router.replace("/profile/logout");
          return;
        }
      }

      // 4️⃣ Parse response safely
      let data = {};
      try {
        data = await response.json();
      } catch {
        console.warn("Server did not return valid JSON.");
      }

      console.log("Link app response:", response.status, data);

      // 5️⃣ Handle outcomes
      if (response.ok) {
        setIsActive(true);
        setProgramAdded(true);

        // Update AsyncStorage linkedApps
        const stored = await AsyncStorage.getItem("linkedApps");
        const linkedApps = stored ? JSON.parse(stored) : [];
        if (!linkedApps.some((app) => app.reference === reference)) {
          linkedApps.push({ reference, isActive: true, notify: true });
          await AsyncStorage.setItem("linkedApps", JSON.stringify(linkedApps));
        }

        console.log("Updated linkedApps:", linkedApps);
      } else if (response.status === 404) {
        Alert.alert("Error", data.error || "App not found.");
      } else {
        Alert.alert("Error", data.error || "Could not link app.");
      }
    } catch (err) {
      console.error("Link app error:", err);
      Alert.alert("Network Error", "Please try again later.");
    } finally {
      setShowPrompt(false);
    }
  };



  const openApp = async (website, downloadIOS, downloadAndroid) => {
    if (!website) return;

    const storeLink = Platform.OS === 'ios' ? downloadIOS : downloadAndroid;

    try {
      const supported = await Linking.canOpenURL(website);
      if (supported) {
        await Linking.openURL(website);
      } else if (storeLink && storeLink !== '0') {
        await Linking.openURL(storeLink);
      }
    } catch (err) {
      console.error('Failed to open app or store:', err);
      Alert.alert('Error', 'Failed to open the website. Please try again.');
      if (storeLink && storeLink !== '0') {
        await Linking.openURL(storeLink);
      }
    }
  };

  const openWebsite = async (url) => {
    if (!url) {
      Alert.alert('Link not available', 'No website URL is provided for this app.');
      return;
    }
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch (err) {
      console.error('Failed to open website:', err);
      Alert.alert('Error', 'Failed to open the website. Please try again.');
    }
  };


  const toggleNotify = async () => {
    console.log("🟢 toggleNotify called");

    try {
      let token = await AsyncStorage.getItem("accessToken");
      console.log("🔑 Token:", token ? "✅ found" : "❌ missing");

      if (!token) {
        console.warn("⚠️ No token found, aborting.");
        return;
      }

      const newStatus = !isActive;
      const url = "https://rewardshub.online/api/link-app/";
      const body = { app_id: reference, notify: newStatus };

      console.log("🔁 New notify status (client-side):", newStatus);
      console.log("📡 Sending request to:", url);
      console.log("📦 Request body:", body);

      // Define fetch options
      const makeRequest = async (bearer) => {
        return fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${bearer}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
      };

      let response = await makeRequest(token);

      // If token expired, try refreshing it
      if (response.status === 401) {
        console.warn("⚠️ Token expired, attempting refresh...");

        const refresh = await AsyncStorage.getItem("refreshToken");
        if (refresh) {
          const refreshResponse = await fetch(
            "https://rewardshub.online/api/token/refresh/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refresh }),
            }
          );

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            token = refreshData.access;
            await AsyncStorage.setItem("accessToken", token);
            console.log("🔄 Token refreshed successfully.");

            // Retry the original request
            response = await makeRequest(token);
          } else {
            console.error("❌ Failed to refresh token, user may need to log in again.");
            return;
          }
        } else {
          console.error("❌ No refresh token available.");
          return;
        }
      }

      const text = await response.text();
      console.log("📥 Response status:", response.status);
      console.log("🧾 Raw response text:", text);

      let data = {};
      try {
        data = JSON.parse(text);
      } catch {
        console.warn("⚠️ Failed to parse JSON response");
      }

      console.log("✅ Parsed response data:", data);

      if (!response.ok) {
        console.warn("⚠️ Server returned non-OK status:", response.status);
      }

      if (data.notify !== undefined) {
        console.log(`🔔 Backend notify status: ${data.notify}`);
      } else {
        console.log("ℹ️ Backend didn't return a notify field.");
      }

      setIsActive(newStatus);
      console.log("🎉 Local state updated to:", newStatus);
    } catch (err) {
      console.error("💥 Error toggling notifications:", err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          {logoFile && <Image source={logoFile} style={styles.headerBackground} resizeMode="cover" />}
        </View>

        {/* Status Badge */}
        {programAdded && (
          <TouchableOpacity
            style={styles.statusContainer}
            onPress={toggleNotify} // toggles based on isActive
            activeOpacity={0.8}
          >
            <View style={[styles.statusBadge, { backgroundColor: isActive ? '#16a34a' : '#9ca3af' }]}>
              <View style={styles.statusLeft}>
                <View style={styles.statusIcon}>
                  <Ionicons name="notifications" size={20} color="white" />
                </View>
                <View>
                  <Text style={styles.statusTitle}>
                    {isActive ? 'Location Alerts Active' : 'Location Alerts Inactive'}
                  </Text>
                  <Text style={styles.statusSubtitle}>
                    {isActive ? 'Alerts are on near stores.' : 'Tap to get alerts near stores.'}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}



        {/* Quick Actions */}
        {programAdded && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {/* Visit Website */}
            <TouchableOpacity style={styles.actionCard} onPress={() => openWebsite(website)}>
              <View style={[styles.fullWidthIcon, { backgroundColor: color || '#2563eb' }]}>
                <MaterialCommunityIcons name="web" size={64} color="white" />
              </View>
              <Text style={styles.actionTitle}>Visit Website</Text>
            </TouchableOpacity>

            {/* Open App */}
            {squareLogo && (
              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => openApp(appScheme, downloadIOS, downloadAndroid)}
              >
                <Image source={squareLogo} style={styles.fullWidthImage} resizeMode="contain" />
                <Text style={styles.actionTitle}>Open App</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>)}

        {/* ✅ New "Add to My Programs/ Remove App" button */}
        <TouchableOpacity
          style={{
            backgroundColor: programAdded ? '#dc2626' : '#2255EB',
            borderRadius: 12,
            paddingVertical: 14,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 24,
            marginBottom: 24,
          }}
          onPress={() => {
            if (programAdded) {
              // ✅ Show confirmation alert
              Alert.alert(
                "Remove App",
                `Are you sure you want to remove ${name || reference}?`,
                [
                  {
                    text: "Cancel",
                    style: "cancel"
                  },
                  {
                    text: "Remove",
                    style: "destructive",
                    onPress: removeApp
                  }
                ]
              );
            } else {
              setShowPrompt(true);
            }
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
            {programAdded ? 'Remove App' : 'Add to My Programs'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ✅ Popup Modal */}
      <Modal visible={showPrompt} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 12,
              padding: 20,
              width: '80%',
              alignItems: 'center',
            }}
          >
            {/* Images side by side */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 15,
                gap: 10,
              }}
            >
              {/* RewardsHub Logo */}
              {squareLogo && (
                <Image
                  source={require('@/assets/rewardsHubLogos/rewardshub.png')}
                  style={{ width: 50, height: 50, resizeMode: 'contain' }}
                />
              )}
              {/* Square Company Logo */}
              <Image
                source={squareLogo} // Replace with your Square Company logo path
                style={{ width: 50, height: 50, resizeMode: 'contain', borderRadius: 8 }}
              />
            </View>
            
            {/* Text */}
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                marginBottom: 20,
              }}
            >
              Do you already have an account with {name || reference}?
            </Text>

            {/* Buttons side by side */}
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: '#2255EB',
                  paddingVertical: 12,
                  borderRadius: 8,
                  marginRight: 5,
                  alignItems: 'center',
                }}
                onPress={handleLinkApp}
              >
                <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: '#ccc',
                  paddingVertical: 12,
                  borderRadius: 8,
                  marginLeft: 5,
                  alignItems: 'center',
                }}
                onPress={() => setShowPrompt(false)}
              >
                <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  scrollView: { flex: 1 },
  header: {
    height: 200,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerBackground: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  statusContainer: { paddingHorizontal: 24, marginTop: 16, marginBottom: 24 },
  statusBadge: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  statusLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  statusIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusTitle: { color: 'white', fontSize: 14, fontWeight: '600' },
  statusSubtitle: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 12, marginTop: 2 },
  section: { paddingHorizontal: 24, marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1f2937', marginBottom: 16, marginTop: 20},
  quickActionsGrid: { flexDirection: 'row', gap: 16 },
  actionCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#dbeafe',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  fullWidthIcon: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  fullWidthImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  actionTitle: { fontSize: 14, fontWeight: '600', color: '#1f2937', textAlign: 'center' },
  removeSection: { paddingHorizontal: 24, marginBottom: 24, marginTop: 100 },
  removeButton: {
    backgroundColor: '#dc2626',
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
