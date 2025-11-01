import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Alert,
  Image,
  Linking,
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
  const {
    reference,
    logoFile,
    squareLogo,
    website,
    downloadIOS,
    downloadAndroid,
    appScheme,
    color,
  } = params;

  const removeApp = async () => {
    try {
      const stored = await AsyncStorage.getItem('linkedApps');
      const linkedApps = stored ? JSON.parse(stored) : [];

      const updated = linkedApps.filter((app) => app.reference !== reference);
      await AsyncStorage.setItem('linkedApps', JSON.stringify(updated));

      Alert.alert('Removed', 'This app has been removed from your active apps.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (err) {
      console.error('Error removing app:', err);
      Alert.alert('Error', 'Could not remove the app. Please try again.');
    }
  };

  const openApp = async (website, downloadIOS, downloadAndroid) => {
  if (!website) return;

  const storeLink = Platform.OS === 'ios' ? downloadIOS : downloadAndroid;

  try {
    const supported = await Linking.canOpenURL(website);
    if (supported) {
      // App installed, open it
      await Linking.openURL(website);
    } else {
      // App not installed, open store
      if (storeLink && storeLink !== '0') {
        await Linking.openURL(storeLink);
      }
    }
  } catch (err) {
    console.error('Failed to open app or store:', err);
    Alert.alert('Error', 'Failed to open the website. Please try again.');
    // fallback to store
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
      await WebBrowser.openBrowserAsync(url); // opens in Expo's in-app browser
    } catch (err) {
      console.error('Failed to open website:', err);
      Alert.alert('Error', 'Failed to open the website. Please try again.');
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
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: '#16a34a' }]}>
            <View style={styles.statusLeft}>
              <View style={styles.statusIcon}>
                <Ionicons name="notifications" size={20} color="white" />
              </View>
              <View>
                <Text style={styles.statusTitle}>Location Alerts Active</Text>
                <Text style={styles.statusSubtitle}>Get an alert when you're near a store.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
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
              <TouchableOpacity style={styles.actionCard} onPress={() => openApp(appScheme, downloadIOS, downloadAndroid)}>
                <Image source={squareLogo} style={styles.fullWidthImage} resizeMode="contain" />
                <Text style={styles.actionTitle}>Open App</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Remove App Button */}
        <View style={styles.removeSection}>
          <TouchableOpacity style={styles.removeButton} onPress={removeApp}>
            <Text style={styles.removeButtonText}>Remove App</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1f2937', marginBottom: 16 },
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
