import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function DeleteAccountPage() {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!password) {
      setStatus('Please enter your password to confirm.');
      return;
    }

    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('accessToken');
              if (!token) {
                setStatus('You must be logged in to delete your account.');
                return;
              }

              const response = await fetch(
                'https://rewardshub.online/api/delete-account/',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ password }),
                }
              );

              const data = await response.json();

              if (response.ok) {
                Alert.alert(
                  'Account Deleted',
                  'Your account has been deleted successfully.'
                );

                // Redirect to logout page instead of directly to signin
                router.replace('profile/logout');
              } else {
                setStatus(data.message || 'Failed to delete account.');
              }
            } catch (err) {
              setStatus(`Network error: ${err.message}`);
            }
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Delete Account</Text>
        <Text style={styles.subtitle}>
          Enter your password to permanently delete your account. This action
          cannot be undone.
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#9CA3AF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>

        {status && <Text style={styles.status}>{status}</Text>}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', padding: 20 },
  header: { marginTop: 40, marginBottom: 20 },
  title: { fontSize: 28, fontFamily: 'Bahnschrift-SemiBold', color: '#2255EB' },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Segoe UI',
    fontWeight: '300',
    color: '#4A4A4A',
    marginTop: 4,
  },
  form: { marginTop: 20 },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontFamily: 'Bahnschrift-SemiBold', fontSize: 16 },
  status: { marginTop: 16, fontSize: 14, color: '#4A4A4A', textAlign: 'center' },
});
