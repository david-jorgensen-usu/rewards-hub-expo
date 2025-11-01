import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
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
import { getAccessToken } from '@/utils/auth';

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = await getAccessToken(router);
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://rewardshub.online/api/user/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) setUser(data);
      else console.warn('Server error:', data);
    } catch (err) {
      console.error('Error fetching user:', err);
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
          colors={['#2255EB', '#1B44C4']}
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
              {loading ? 'Loading...' : [user?.first_name, user?.last_name].filter(Boolean).join(' ') || 'Unknown'}
            </Text>
            <Text style={styles.email}>{!loading && user?.email}</Text>
          </View>
        </LinearGradient>

        {/* Menu Options */}
        <View style={styles.menuContainer}>
          {/* Provide Feedback */}
          <MenuCard
            icon={<MaterialCommunityIcons name="message-outline" size={20} color="#2563eb" />}
            iconBg="#F3F4F6"
            title="Provide Feedback"
            subtitle="Help us improve the app"
            onPress={() => router.push('/profile/feedback')}
          />

          {/* Privacy Policy */}
          <MenuCard
            icon={<Feather name="shield" size={20} color="#9333ea" />}
            iconBg="#F3F4F6"
            title="Privacy Policy"
            subtitle="Learn about our privacy practices"
            onPress={() => router.push('/profile/privacy')}
          />

          {/* Log Out */}
          <MenuCard
            icon={<Feather name="log-out" size={20} color="#dc2626" />}
            iconBg="#F3F4F6"
            title="Log Out"
            subtitle="Sign out of your account"
            titleColor="#DC2626"
            onPress={() => router.push('/profile/logout')}
          />

          {/* Delete Account */}
          <MenuCard
            icon={<Feather name="trash-2" size={20} color="#dc2626" />}
            iconBg="#F3F4F6"
            title="Delete Account"
            subtitle="Permanently delete your account"
            titleColor="#DC2626"
            onPress={() => router.push('/profile/delete')}
          />

          {/* Test Notifications */}
          <MenuCard
            icon={<Feather name="arrow-right-circle" size={20} color="#000000ff" />}
            iconBg="#F3F4F6"
            title="Test Notifications"
            subtitle="Send a test notification"
            onPress={() => router.push('/profile/test_notifications')}
          />

          {/* Test Location */}
          <MenuCard
            icon={<Feather name="arrow-right-circle" size={20} color="#000000ff" />}
            iconBg="#F3F4F6"
            title="Test Location"
            subtitle="Send a test location"
            onPress={() => router.push('/profile/test_location')}
          />
        </View>
      </ScrollView>
    </View>
  );
}

/** Reusable MenuCard component */
const MenuCard = ({ icon, iconBg, title, subtitle, titleColor, onPress }) => (
  <TouchableOpacity style={styles.menuCard} onPress={onPress}>
    <View style={styles.menuContent}>
      <View style={[styles.iconCircle, { backgroundColor: iconBg }]}>{icon}</View>
      <View style={styles.menuText}>
        <Text style={[styles.menuTitle, titleColor ? { color: titleColor } : null]}>{title}</Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>
    </View>
    <Feather name="chevron-right" size={20} color="#9ca3af" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  scrollView: { flex: 1 },
  headerGradient: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 32, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  profileSection: { alignItems: 'center' },
  avatarContainer: { position: 'relative', marginBottom: 16 },
  avatarBorder: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#fff', padding: 4 },
  avatar: { width: '100%', height: '100%', borderRadius: 44 },
  name: { fontSize: 28, fontFamily: 'Bahnschrift-SemiBold', fontWeight: '600', color: '#FFFFFF', marginBottom: 4 },
  email: { fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '300', color: '#FFFFFF' },
  menuContainer: { paddingHorizontal: 16, gap: 12, marginBottom: 100, marginTop: 24 },
  menuCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  menuContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  menuText: { flex: 1 },
  menuTitle: { fontSize: 16, fontFamily: 'Bahnschrift-SemiBold', color: '#2255EB', marginBottom: 2 },
  menuSubtitle: { fontSize: 14, fontFamily: 'Segoe UI', color: '#4A4A4A', fontWeight: '300' },
});
