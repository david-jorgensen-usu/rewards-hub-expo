import { recentEntries } from '@/data/recentEntries';
import { rewards } from '@/data/rewardsData';
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [firstName, setFirstName] = useState("");

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
        return data.access;
      } else return null;
    } catch {
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
      const data = await response.json();

      if (!response.ok && data.code === "token_not_valid") {
        token = await refreshToken();
        if (token) return fetchUser(); 
        return;
      }

      if (response.ok && data.first_name) setFirstName(data.first_name);
    } catch {}
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hi {firstName || "there"}! 👋</Text>
        </View>

        {/* Recent Entries */}
        <View style={styles.recentSection}>
          <Text style={styles.recentTitle}>Recent Activity</Text>
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
                      imageStyle={{ borderRadius: 8 }}
                    />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontFamily: 'Bahnschrift-SemiBold',
    fontSize: 36,
    color: '#2255EB',
  },
  recentSection: {
    marginBottom: 40,
  },
  recentTitle: {
    fontFamily: 'Bahnschrift-SemiBold',
    fontSize: 24,
    color: '#2255EB',
    marginBottom: 16,
  },
  entriesList: {
    gap: 15,
  },
  entryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  entryContent: {
    flexDirection: 'row',
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
    borderRadius: 8,
    backgroundColor: '#2255EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandName: {
    fontFamily: 'Bahnschrift-SemiBold',
    fontSize: 18,
    color: '#4A4A4A',
  },
  entryDate: {
    fontFamily: 'Segoe UI',
    fontWeight: '300',
    fontSize: 14,
    color: '#4A4A4A',
    marginTop: 2,
  },
});
