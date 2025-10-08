import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AlertsPage() {
  const [alerts] = useState([
    {
      id: 1,
      type: 'milestone',
      icon: 'star',
      title: 'Milestone Achieved!',
      message: 'You reached 1,000 points! Keep going!',
      time: '2 hours ago',
      unread: true,
      color: '#F97316'
    },
    {
      id: 2,
      type: 'reward',
      icon: 'gift',
      title: 'New Reward Available',
      message: '$5 off your next purchase is now unlocked',
      time: '5 hours ago',
      unread: true,
      color: '#A855F7'
    },
    {
      id: 3,
      type: 'bonus',
      icon: 'flash',
      title: 'Double Points Weekend!',
      message: 'Earn 2x points on all purchases this weekend',
      time: '1 day ago',
      unread: false,
      color: '#EAB308'
    },
    {
      id: 4,
      type: 'achievement',
      icon: 'trophy',
      title: 'Level Up!',
      message: "You've been promoted to Gold member",
      time: '2 days ago',
      unread: false,
      color: '#D97706'
    },
    {
      id: 5,
      type: 'progress',
      icon: 'trending-up',
      title: 'Almost There!',
      message: 'Just 750 points until your next reward',
      time: '3 days ago',
      unread: false,
      color: '#10B981'
    },
    {
      id: 6,
      type: 'reward',
      icon: 'gift',
      title: 'Reward Expiring Soon',
      message: 'Your $10 reward expires in 5 days',
      time: '4 days ago',
      unread: false,
      color: '#EF4444'
    }
  ]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hi John! 👋</Text>
          <Text style={styles.subText}>
            You have {alerts.filter(a => a.unread).length} unread notifications
          </Text>
        </View>

        {/* Alerts List */}
        <View style={styles.alertsList}>
          {alerts.map((alert) => (
            <TouchableOpacity
              key={alert.id}
              style={[
                styles.alertCard,
                alert.unread && styles.alertCardUnread
              ]}
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
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED',
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 100,
  },
  greetingContainer: {
    marginBottom: 24,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subText: {
    fontSize: 15,
    color: '#6B7280',
  },
  alertsList: {
    gap: 16,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 16,
  },
  alertCardUnread: {
    borderLeftWidth: 4,
    borderLeftColor: '#F97316',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertContent: {
    flex: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F97316',
    marginTop: 4,
  },
  alertMessage: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    lineHeight: 20,
  },
  alertTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navTextActive: {
    fontSize: 12,
    color: '#F97316',
    fontWeight: '500',
  },
  navTextInactive: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});