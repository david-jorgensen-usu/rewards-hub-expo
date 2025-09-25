import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
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
          <View style={styles.card}></View>
          <View style={styles.card}></View>
          <View style={styles.card}></View>
          <View style={styles.card}></View>
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
    </SafeAreaProvider>
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
  card: {width: "45%", height: 70, backgroundColor:'#f8f8f8', borderWidth:1, borderColor:'#ddd'},
  profileInitials: { color: '#fff', fontWeight: 'bold' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 12 },
  content: { 
    padding: 10, 
    flex: 1, 
    flexDirection:"row", 
    flexWrap:"wrap", 
    justifyContent: 'center', 
    alignItems: 'flex-start',
    alignContent: 'flex-start', 
    gap: 20 },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
});
