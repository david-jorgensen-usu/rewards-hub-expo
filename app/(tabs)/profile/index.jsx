import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Refresh token logic (your working version)
  const refreshToken = async () => {
    try {
      const refresh = await AsyncStorage.getItem("refresh");
      if (!refresh) {
        console.warn("⚠️ No refresh token found");
        return null;
      }

      const response = await fetch("https://rewardshub.online/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });

      const data = await response.json();
      if (response.ok && data.access) {
        await AsyncStorage.setItem("accessToken", data.access);
        console.log("✅ Access token refreshed");
        return data.access;
      } else {
        console.warn("⚠️ Failed to refresh token:", data);
        return null;
      }
    } catch (err) {
      console.error("Error refreshing token:", err);
      return null;
    }
  };

  // 👤 Fetch user profile
  const fetchUser = async () => {
    try {
      let token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        console.warn("⚠️ No access token found");
        setLoading(false);
        return;
      }

      const response = await fetch("https://rewardshub.online/api/user/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Response is not JSON");
        setLoading(false);
        return;
      }

      // Token expired — retry with new token
      if (!response.ok && data.code === "token_not_valid") {
        console.log("🔁 Token expired, refreshing...");
        token = await refreshToken();
        if (token) return fetchUser(); // retry once
        setLoading(false);
        return;
      }

      if (response.ok) {
        console.log("✅ User data loaded:", data);
        setUser(data);
      } else {
        console.warn("⚠️ Server returned error:", data);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient
          colors={['#2255EB', '#1B44C4']} // primary to slightly darker shade
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarBorder}>
                <Image
                  source={require('@/assets/rewardsHubLogos/rewardshub.png')}
                  style={styles.avatar}
                />
              </View>
            </View>

            <Text style={styles.name}>
              {loading
                ? "Loading..."
                : [user?.first_name, user?.last_name].filter(Boolean).join(" ") || "Unknown"}
            </Text>
            <Text style={styles.email}>{!loading && user?.email}</Text>
          </View>
        </LinearGradient>


        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => router.push('/profile/feedback')}
          >
            <View style={styles.menuContent}>
              <View style={[styles.iconCircle, styles.iconBlue]}>
                <MaterialCommunityIcons name="message-outline" size={20} color="#2563eb" />
              </View>
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>Provide Feedback</Text>
                <Text style={styles.menuSubtitle}>Help us improve the app</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => router.push('/profile/privacy')}
          >
            <View style={styles.menuContent}>
              <View style={[styles.iconCircle, styles.iconPurple]}>
                <Feather name="shield" size={20} color="#9333ea" />
              </View>
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>Privacy Policy</Text>
                <Text style={styles.menuSubtitle}>Learn about our privacy practices</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => router.push('/profile/logout')}
          >
            <View style={styles.menuContent}>
              <View style={[styles.iconCircle, styles.iconRed]}>
                <Feather name="log-out" size={20} color="#dc2626" />
              </View>
              <View style={styles.menuText}>
                <Text style={[styles.menuTitle, styles.menuTitleRed]}>Log Out</Text>
                <Text style={styles.menuSubtitle}>Sign out of your account</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => router.push('/profile/delete')}
          >
            <View style={styles.menuContent}>
              <View style={[styles.iconCircle, styles.iconRed]}>
                <Feather name="trash-2" size={20} color="#dc2626" />
              </View>
              <View style={styles.menuText}>
                <Text style={[styles.menuTitle, styles.menuTitleRed]}>Delete Account</Text>
                <Text style={styles.menuSubtitle}>Permanently delete your account</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => router.push('/profile/test_notifications')}
          >
            <View style={styles.menuContent}>
              <View style={[styles.iconCircle, styles.iconGray]}>
                <Feather name="arrow-right-circle" size={20} color="#000000ff" />
              </View>
              <View style={styles.menuText}>
                <Text style={[styles.menuTitle, styles.menuTitle]}>Test Notifications</Text>
                <Text style={styles.menuSubtitle}>Send a test notification</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => router.push('/profile/test_location')}
          >
            <View style={styles.menuContent}>
              <View style={[styles.iconCircle, styles.iconGray]}>
                <Feather name="arrow-right-circle" size={20} color="#000000ff" />
              </View>
              <View style={styles.menuText}>
                <Text style={[styles.menuTitle, styles.menuTitle]}>Test Location</Text>
                <Text style={styles.menuSubtitle}>Send a test location</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // light background
  },
  scrollView: {
    flex: 1,
  },
  headerGradient: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: '#2255EB', // primary color
  },
  editButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 20,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarBorder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#fff',
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 44,
    backgroundColor: '#F3F4F6', // secondary color
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusDot: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#22C55E', // keeping green for status
    borderWidth: 4,
    borderColor: '#fff',
  },
  name: {
    fontSize: 28, // ~2x subtitle
    fontFamily: 'Bahnschrift-SemiBold',
    fontWeight: '600',
    color: '#FFFFFF', // header contrast
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    fontFamily: 'Segoe UI',
    fontWeight: '300',
    color: '#FFFFFF', // header contrast
  },
  statsContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statItemBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E5E7EB',
  },
  statNumber: {
    fontSize: 28, // matches title size
    fontFamily: 'Bahnschrift-SemiBold',
    color: '#2255EB', // primary color
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14, // subtitle size
    fontFamily: 'Segoe UI',
    color: '#4A4A4A', // secondary color
    fontWeight: '300',
  },
  menuContainer: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 100,
    marginTop: 24,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#F3F4F6', // light background for circles
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16, // ~2x subtitle
    fontFamily: 'Bahnschrift-SemiBold',
    color: '#2255EB', // primary color
    marginBottom: 2,
  },
  menuTitleRed: {
    color: '#DC2626',
  },
  menuSubtitle: {
    fontSize: 14,
    fontFamily: 'Segoe UI',
    color: '#4A4A4A', // secondary color
    fontWeight: '300',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navLabel: {
    fontSize: 12,
    fontFamily: 'Segoe UI',
    fontWeight: '300',
    color: '#4A4A4A', // secondary
  },
  navLabelActive: {
    color: '#2255EB', // primary
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
});


