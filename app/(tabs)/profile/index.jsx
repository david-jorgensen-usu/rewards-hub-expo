import {
  Feather,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient
          colors={['#fb923c', '#f59e0b']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <TouchableOpacity style={styles.editButton}>
            <Feather name="edit-2" size={16} color="#fff" />
          </TouchableOpacity>

          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarBorder}>
                <View style={styles.avatar}>
                  <Feather name="user" size={48} color="#fff" />
                </View>
              </View>
              <View style={styles.statusDot} />
            </View>

            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.email}>randomuserjohn25@gmail.com</Text>
          </View>
        </LinearGradient>

        {/* Stats Card */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>14</Text>
              <Text style={styles.statLabel}>Programs</Text>
            </View>
            <View style={[styles.statItem, styles.statItemBorder]}>
              <Text style={[styles.statNumber, styles.statNumberOrange]}>200</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Entries</Text>
            </View>
          </View>
        </View>

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

          <TouchableOpacity style={styles.menuCard}>
            <View style={styles.menuContent}>
              <View style={[styles.iconCircle, styles.iconGreen]}>
                <Feather name="edit" size={20} color="#16a34a" />
              </View>
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>Edit Profile</Text>
                <Text style={styles.menuSubtitle}>Update your personal information</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuCard}>
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
            onPress={() => router.push('/signin')}
          >
            <View style={styles.menuContent}>
              <View style={[styles.iconCircle, styles.iconGray]}>
                <MaterialCommunityIcons name="restart" size={20} color="gray" />
              </View>
              <View style={styles.menuText}>
                <Text style={[styles.menuTitle, styles.menuTitleBlack]}>TESTING: Signin Page</Text>
                <Text style={styles.menuSubtitle}>Sign in to your account</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuCard}
            onPress={() => router.push('/signup')}
          >
            <View style={styles.menuContent}>
              <View style={[styles.iconCircle, styles.iconGray]}>
                <MaterialCommunityIcons name="restart" size={20} color="gray" />
              </View>
              <View style={styles.menuText}>
                <Text style={[styles.menuTitle, styles.menuTitleBlack]}>TESTING: Signup Page</Text>
                <Text style={styles.menuSubtitle}>Sign up for an account</Text>
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
    backgroundColor: '#fffbeb',
  },
  scrollView: {
    flex: 1,
  },
  headerGradient: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
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
    backgroundColor: '#d1d5db',
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
    backgroundColor: '#22c55e',
    borderWidth: 4,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  statsContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
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
    borderColor: '#e5e7eb',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statNumberOrange: {
    color: '#f97316',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  menuContainer: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 100,
  },
  menuCard: {
    backgroundColor: '#fff',
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
  },
  iconBlue: {
    backgroundColor: '#dbeafe',
  },
  iconPurple: {
    backgroundColor: '#f3e8ff',
  },
  iconGreen: {
    backgroundColor: '#dcfce7',
  },
  iconRed: {
    backgroundColor: '#fee2e2',
  },
  iconGray: {
    backgroundColor: '#e5e7eb',
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  menuTitleRed: {
    color: '#dc2626',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
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
    fontWeight: '500',
    color: '#9ca3af',
  },
  navLabelActive: {
    color: '#f97316',
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
});