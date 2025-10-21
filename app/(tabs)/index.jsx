import { recentEntries } from '@/data/recentEntries';
import { rewards } from '@/data/rewardsData';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [points] = useState(1250);

  const nextMilestone = 2000;
  const progress = (points / nextMilestone) * 100;

  const mergedEntries = recentEntries.map(entry => {
    const reward = rewards.find(r => r.reference === entry.brand);
    return { ...entry, ...(reward || {}) };
  });

  const refreshToken = async () => {
    const refresh = await AsyncStorage.getItem("refreshToken");
    if (!refresh) return null;

    try {
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

  const fetchUser = async () => {
    try {
      let token = await AsyncStorage.getItem("accessToken");
      if (!token) return;

      const response = await fetch("https://rewardshub.online/api/user/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const text = await response.text();
      console.log("Raw response:", text);

      const data = JSON.parse(text);

      if (!response.ok && data.code === "token_not_valid") {
        console.log("🔁 Token expired, refreshing...");
        token = await refreshToken();
        if (token) return fetchUser(); // retry once
        return;
      }

      if (response.ok) {
        setUser(data);
        if (data.first_name) setFirstName(data.first_name);
      } else {
        console.warn("⚠️ Server returned error:", data);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        colors={['#FFF7ED', '#FFF7ED', '#FFF7ED']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.greeting}>Hi {firstName || "there"}! 👋</Text>
            </View>
          </View>

          {/* Recent Entries */}
          <View style={styles.recentSection}>
            <View style={styles.recentHeader}>
              <Text style={styles.recentTitle}>Recent Activity</Text>
            </View>

            {/* Entries List */}
            <View style={styles.entriesList}>
              {mergedEntries.map((entry) => (
                <TouchableOpacity
                  key={entry.id}
                  style={styles.entryCard}
                  activeOpacity={0.7}
                  onPress={() => router.push(`/rewards/${entry.reference}`)}
                >
                  <View style={styles.entryContent}>
                    <View style={styles.entryLeft}>
                      <ImageBackground
                        style={styles.logoContainer}
                        source={entry.logoFile}
                        imageStyle={{ borderRadius: 10 }}
                      >
                      </ImageBackground>
                      <View>
                        <Text style={styles.brandName}>{entry.name}</Text>
                        <Text style={styles.entryDate}>{entry.date}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED',
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#111827',
  },
  badge: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  badgeIcon: {
    fontSize: 24,
  },
  cardContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  pointsCard: {
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  pointsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  pointsLabel: {
    color: '#fde68a',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  pointsValue: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: 'bold',
  },
  starIcon: {
    fontSize: 32,
  },
  progressContainer: {
    marginTop: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  progressTarget: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBarBg: {
    backgroundColor: 'rgba(180, 83, 9, 0.3)',
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    backgroundColor: '#ffffff',
    height: '100%',
    borderRadius: 6,
  },
  progressText: {
    color: '#fde68a',
    fontSize: 12,
    marginTop: 8,
  },
  exploreButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  exploreButtonText: {
    color: '#f59e0b',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentSection: {
    paddingHorizontal: 24,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  viewAllText: {
    color: '#f59e0b',
    fontSize: 14,
    fontWeight: 'bold',
  },
  entriesList: {
    gap: 15,
  },
  entryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  entryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logoContainer: {
    width: 56,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  logoEmoji: {
    fontSize: 28,
  },
  brandName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  entryDate: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  entryRight: {
    alignItems: 'flex-end',
  },
  entryPoints: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  pointsSmallLabel: {
    fontSize: 12,
    color: '#9ca3af',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navIconActive: {
    fontSize: 24,
  },
  navIcon: {
    fontSize: 24,
    opacity: 0.5,
  },
  navLabelActive: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9ca3af',
  },
});