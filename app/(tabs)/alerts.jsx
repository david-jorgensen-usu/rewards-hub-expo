import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAccessToken } from '@/utils/auth';

export default function AlertsPage() {
  const router = useRouter();
  const [alerts] = useState([
    { id: 1, type: 'milestone', icon: 'star', title: 'Milestone Achieved!', message: 'You reached 1,000 points! Keep going!', time: '2 hours ago', unread: true, color: '#F97316' },
    { id: 2, type: 'reward', icon: 'gift', title: 'New Reward Available', message: '$5 off your next purchase is now unlocked', time: '5 hours ago', unread: true, color: '#A855F7' },
    { id: 3, type: 'bonus', icon: 'flash', title: 'Double Points Weekend!', message: 'Earn 2x points on all purchases this weekend', time: '1 day ago', unread: false, color: '#EAB308' },
    { id: 4, type: 'achievement', icon: 'trophy', title: 'Level Up!', message: "You've been promoted to Gold member", time: '2 days ago', unread: false, color: '#D97706' },
    { id: 5, type: 'progress', icon: 'trending-up', title: 'Almost There!', message: 'Just 750 points until your next reward', time: '3 days ago', unread: false, color: '#10B981' },
    { id: 6, type: 'reward', icon: 'gift', title: 'Reward Expiring Soon', message: 'Your $10 reward expires in 5 days', time: '4 days ago', unread: false, color: '#EF4444' }
  ]);

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      // Load cached user immediately
      const storedUser = await AsyncStorage.getItem('userData');
      const cached = storedUser ? JSON.parse(storedUser) : {};
      if (Object.keys(cached).length > 0) setUser(cached);

      // Refresh from API
      const token = await getAccessToken(router);
      if (!token) return setLoading(false);

      const response = await fetch('https://rewardshub.online/api/user/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        const merged = { ...cached, ...data };
        setUser(merged);
        await AsyncStorage.setItem('userData', JSON.stringify(merged));
      } else {
        console.warn('Failed to fetch user:', data);
      }
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
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>
            Hi {loading ? '...' : user?.first_name || 'there'}! 👋
          </Text>
          <Text style={styles.subText}>
            You have {alerts.filter(a => a.unread).length} unread notifications
          </Text>
        </View>

        {/* Alerts List */}
        <View style={styles.alertsList}>
          {alerts.map((alert) => (
            <TouchableOpacity
              key={alert.id}
              style={[styles.alertCard, alert.unread && styles.alertCardUnread]}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: alert.color }]}>
                <Ionicons name={alert.icon} size={24} color="#FFFFFF" />
              </View>
              <View style={styles.alertContent}>
                <View style={styles.alertHeader}>
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  {alert.unread && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.alertMessage}>{alert.message}</Text>
                <Text style={styles.alertTime}>{alert.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  scrollView: { flex: 1, marginTop: 20 },
  contentContainer: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 100 },
  greetingContainer: { marginBottom: 24 },
  greetingText: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 8 },
  subText: { fontSize: 15, color: '#6B7280' },
  alertsList: { gap: 16 },
  alertCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, flexDirection: 'row', gap: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2, marginBottom: 16 },
  alertCardUnread: { borderLeftWidth: 4, borderLeftColor: '#2255EB' },
  iconContainer: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  alertContent: { flex: 1 },
  alertHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 },
  alertTitle: { fontSize: 16, fontWeight: '600', color: '#111827', flex: 1 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#F97316', marginTop: 4 },
  alertMessage: { fontSize: 14, color: '#6B7280', marginTop: 4, lineHeight: 20 },
  alertTime: { fontSize: 12, color: '#9CA3AF', marginTop: 8 },
});
