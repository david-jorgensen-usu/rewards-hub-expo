import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// ✅ Ensure notifications display even while app is open
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function TestNotificationsPage() {
  useEffect(() => {
    // Request notification permission when page loads
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission required',
          'Please enable notifications to test this feature.'
        );
      }
    };

    requestPermissions();
  }, []);

  // 🚀 Trigger a local test notification
  const triggerNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🐱 Rhemi says hi!',
          body: 'This is your test notification from RewardsHub 🎉',
          sound: true,
        },
        trigger: null, // null = fire immediately
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      Alert.alert('Error', 'Could not send notification.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="notifications" size={48} color="#F97316" style={styles.icon} />
        <Text style={styles.title}>Test Notifications</Text>
        <Text style={styles.subtitle}>
          Tap the button below to send yourself a local test notification.
        </Text>

        <TouchableOpacity style={styles.button} onPress={triggerNotification}>
          <Text style={styles.buttonText}>Send Test Notification</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
    maxWidth: 360,
  },
  icon: {
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#F97316',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
