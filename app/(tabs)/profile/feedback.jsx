import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState(null);

  const sendFeedback = async () => {
  if (!feedback.trim()) {
    setStatus('Please enter some feedback first.');
    return;
  }

  try {
    // Read JWT token saved as "accessToken" after login
    const token = await AsyncStorage.getItem('accessToken');
    console.log("JWT token from AsyncStorage:", token); // debug

    if (!token) {
      setStatus('⚠️ You must be logged in to send feedback.');
      return;
    }

    const response = await fetch('https://rewardshub.online/api/feedback/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // required by SimpleJWT
      },
      body: JSON.stringify({ feedback }),
    });

    const data = await response.json();

    if (response.ok) {
      setStatus('✅ Feedback received! Thank you!');
      setFeedback('');
    } else {
      setStatus(`❌ Error: ${data.message || data.detail || 'Failed to send feedback.'}`);
    }
  } catch (error) {
    setStatus(`❌ Network error: ${error.message}`);
  }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Feedback</Text>
        <Text style={styles.subtitle}>
          Tell us what you think! We value your feedback to improve RewardsHub.
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Ionicons name="chatbubble-outline" size={22} color="#F97316" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Type your feedback here..."
            placeholderTextColor="#9CA3AF"
            value={feedback}
            onChangeText={setFeedback}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={sendFeedback}>
          <Text style={styles.buttonText}>Send Feedback</Text>
        </TouchableOpacity>

        {status && <Text style={styles.status}>{status}</Text>}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // updated background
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Bahnschrift-SemiBold', // title font
    color: '#2255EB', // primary color
  },
  subtitle: {
    fontSize: 14, // roughly half of title
    fontFamily: 'Segoe UI', // subtitle font
    fontWeight: '300', // light
    color: '#4A4A4A', // secondary color
    marginTop: 4,
  },
  form: {
    marginTop: 20,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF', // can keep white for input contrast
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  icon: {
    marginRight: 8,
    marginTop: 4,
    color: '#2255EB', // primary color for icon
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#4A4A4A', // secondary for text
    minHeight: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2255EB', // primary for button
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Bahnschrift-SemiBold',
    fontSize: 16,
  },
  status: {
    marginTop: 16,
    fontSize: 14,
    color: '#4A4A4A', // secondary
    textAlign: 'center',
  },
});
