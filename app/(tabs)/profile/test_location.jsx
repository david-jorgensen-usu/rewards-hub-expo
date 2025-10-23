import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';

export default function TestLocationPage() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocation = async () => {
      try {
        // Ask for permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission Denied',
            'Please enable location permissions in settings.'
          );
          setLoading(false);
          return;
        }

        // Get current position
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setLocation(currentLocation.coords);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Unable to get location.');
      } finally {
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="location" size={48} color="#F97316" style={styles.icon} />
        <Text style={styles.title}>Your Current Location</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#F97316" />
        ) : location ? (
          <>
            <Text style={styles.coordLabel}>Latitude:</Text>
            <Text style={styles.coordValue}>{location.latitude.toFixed(6)}</Text>
            <Text style={styles.coordLabel}>Longitude:</Text>
            <Text style={styles.coordValue}>{location.longitude.toFixed(6)}</Text>
          </>
        ) : (
          <Text style={styles.errorText}>Location not available</Text>
        )}
      </View>
    </View>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // updated background
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
    color: '#2255EB', // primary color
  },
  title: {
    fontSize: 22,
    fontFamily: 'Bahnschrift-SemiBold', // title font
    color: '#2255EB', // primary color
    marginBottom: 16,
  },
  coordLabel: {
    fontSize: 16,
    fontFamily: 'Segoe UI', // subtitle font
    fontWeight: '300',
    color: '#4A4A4A', // secondary
    marginTop: 8,
  },
  coordValue: {
    fontSize: 18,
    fontFamily: 'Bahnschrift-SemiBold', // emphasize value
    color: '#4A4A4A', // secondary
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Segoe UI',
    fontWeight: '300',
    color: '#dc2626', // red for errors
  },
});
