import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SigninPage() {
  const router = useRouter();
  const navigate = (page) => router.push(page);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await fetch('https://rewardshub.online/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();
      console.log('Sign in response:', data);

      if (response.ok && data.access) {
        await AsyncStorage.setItem('accessToken', data.access);
        await AsyncStorage.setItem('refreshToken', data.refresh);
        router.replace('/(tabs)');
      } else {
        alert(data.detail || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo Square */}
        <View style={styles.logoSquare}>
          <Image
            source={require('@/assets/rewardsHubLogos/rewardshub.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Title & Subtitle */}
        <Text style={styles.title}>RewardsHub</Text>
        <Text style={styles.subtitle}>Your rewards, connected.</Text>

        {/* Inputs */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#8c8c8c"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#8c8c8c"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => navigate('signup')}
          >
            <Text style={styles.createAccountText}>
              New here? Create an account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  logoSquare: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 200,
    height: 200,
  },
  title: {
    fontFamily: 'Bahnschrift-SemiBold',
    fontSize: 36, // approx 2x subtitle
    color: '#2255EB',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Segoe UI',
    fontWeight: '300', // light
    fontSize: 18,
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
    gap: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#2255EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#4A4A4A',
    backgroundColor: '#fff',
  },
  signInButton: {
    backgroundColor: '#2255EB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  signInText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F3F4F6',
  },
  createAccountButton: {
    marginTop: 12,
  },
  createAccountText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#4A4A4A',
    textAlign: 'center',
  },
});
