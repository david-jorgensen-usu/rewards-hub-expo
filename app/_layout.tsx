import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileCircle}>
          <Text style={styles.profileInitials}>JD</Text>
        </View>
        <Text style={styles.headerTitle}>My Rewards</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={{ fontSize: 18 }}>Welcome to your rewards</Text>
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <MaterialIcons name="card-giftcard" size={24} color="#007AFF" />
          <Text style={{ color: '#007AFF' }}>My Rewards</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <FontAwesome5 name="qrcode" size={24} color="gray" />
          <Text style={{ color: 'gray' }}>Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="settings-outline" size={24} color="gray" />
          <Text style={{ color: 'gray' }}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: { color: '#fff', fontWeight: 'bold' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 12 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  tabItem: {
    flex: 1,              // take equal width (33%)
    alignItems: 'center', // center icons and text
    paddingVertical: 10,
  },
});
